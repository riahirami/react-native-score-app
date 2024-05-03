import type User from '_models/User/User';

import {
  setSensitiveInfoStorageItem,
  getSensitiveInfoStorageItem,
  removeSensitiveInfoStorageItem,
  isIosDevice,
  setAsyncStoreItem,
  getAsyncStoreItem,
  removeAsyncStoreItem,
} from '_utils/helpers';
import {storageKeys} from '_utils/storageKeys';

/**
 * Set access token value (saved in secure storage)
 * @param token - Access token to store in sensitive info
 */
export const setAccessToken = async (token: string): Promise<void> => {
  await setSensitiveInfoStorageItem(storageKeys.ACCESS_TOKEN, token);
};

/**
 * Set refresh token value (saved in secure storage)
 * @param token - Refresh token to store in sensitive info
 */
export const setRefreshToken = async (token: string): Promise<void> => {
  await setSensitiveInfoStorageItem(storageKeys.REFRESH_TOKEN, token);
};

/**
 * Remove access and refresh token if there is no persisted user data and returns access token
 * This function is called on app mount to check if the session present in sensitive info is valid
 * After app uninstall keychain keeps access and refresh tokens => The session keeps alive even after uninstall
 * @returns Returns stored access token in sensitive info
 */
export const getAndCheckAccessToken = async (): Promise<string | null> => {
  // Only needed for ios keychain for android no need for this check
  if (isIosDevice()) {
    const result = await getPersistedUserData();
    // If there is no stored user data remove tokens in keychain IOS
    if (!result) {
      await removeAccessToken();
      await removeRefreshToken();
    }
  }
  return await getAccessToken();
};

/**
 * Get access token from secure storage
 * @returns {Promise<string | null>} - Access token returned from sensitive info
 */
export const getAccessToken = async (): Promise<string | null> => {
  return await getSensitiveInfoStorageItem<string>(storageKeys.ACCESS_TOKEN);
};

/**
 * Get refresh token from secure storage
 * @returns {Promise<string | null>} - Refresh token returned from sensitive info
 */
export const getRefreshToken = async (): Promise<string | null> => {
  return await getSensitiveInfoStorageItem<string>(storageKeys.REFRESH_TOKEN);
};

/**
 * Remove access token from secure storage
 */
export const removeAccessToken = async (): Promise<void> => {
  await removeSensitiveInfoStorageItem(storageKeys.ACCESS_TOKEN);
};

/**
 * Remove refresh token from secure storage
 */
export const removeRefreshToken = async (): Promise<void> => {
  await removeSensitiveInfoStorageItem(storageKeys.REFRESH_TOKEN);
};

/**
 * Stores user profile in async storage
 * @param userData - User profile to store
 */
export const persistUserData = async (userData: User): Promise<void> => {
  await setAsyncStoreItem(storageKeys.USER, userData);
};

/**
 *  Retrieve user data from async storage
 * @returns - Returns persisted user data in async storage
 */
export const getPersistedUserData = async (): Promise<User | null> => {
  return await getAsyncStoreItem<User>(storageKeys.USER);
};

/**
 * Remove user data from async storage
 */
export const removePersistedUserData = async (): Promise<void> => {
  await removeAsyncStoreItem(storageKeys.USER);
};
