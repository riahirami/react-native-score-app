import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';

import { type FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { Mutex } from 'async-mutex';

import { type RefreshTokenData } from '_models/User/User';

import { BEARER_KEY, REFRESH_KEY } from '_utils/constants';
import { endpoints } from '_utils/endpoints';
import { httpStatusCodes } from '_utils/httpRequestCodes';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken
} from '_utils/storage';

const AUTHORIZATION_KEY = 'Authorization';
const API_KEY = 'apikey';

export const INJECT_TOKEN = { Authorization: BEARER_KEY };
export const INJECT_REFRESH = { Authorization: REFRESH_KEY };

// create a new mutex
const mutex = new Mutex();

export const baseQueryConfig: FetchBaseQueryArgs = {
  prepareHeaders: async (headers: Headers) => {
    headers.set(API_KEY, 'env.API_KEY');
    if (headers.has(AUTHORIZATION_KEY)) {
      if (headers.get(AUTHORIZATION_KEY)?.includes(BEARER_KEY)) {
        const toekn = await getAccessTokenBaseQuery();
        headers.set(AUTHORIZATION_KEY, `${BEARER_KEY} ${toekn}`);
      } else if (headers.get(AUTHORIZATION_KEY)?.includes(REFRESH_KEY)) {
        const refreshtoken = await getRefreshTokenBaseQuery();
        headers.set(AUTHORIZATION_KEY, `${BEARER_KEY} ${refreshtoken}`);
      }
    }
    return headers;
  }
};

/**
 * Get stored access token if null return an empty string
 * @returns {Promise<string>} - Returns access token stored in secure storage
 */
const getAccessTokenBaseQuery = async (): Promise<string> => {
  const accessToken = await getAccessToken();
  return accessToken ?? '';
};

/**
 * Get stored refresh token if null return an empty string
 * @returns {Promise<string>} - Returns refresh token stored in secure storage
 */
const getRefreshTokenBaseQuery = async (): Promise<string> => {
  const refreshToken = await getRefreshToken();
  return refreshToken ?? '';
};

const baseQuery = fetchBaseQuery(baseQueryConfig);

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === httpStatusCodes.UNAUTHORIZED) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: endpoints.REFRESH_TOKEN, headers: { ...INJECT_REFRESH } },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          const dataResult = refreshResult.data as unknown as RefreshTokenData;
          await setAccessToken(dataResult.data.access_token);
          await setRefreshToken(dataResult.data.refresh_token);
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          return refreshResult;
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
