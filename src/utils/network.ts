import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { store } from '_store/store';

import { showPopup } from '_utils/helpers';
import { httpStatusCodes } from '_utils/httpRequestCodes';

import { strings } from '_i18n';

// Message used in case of server error
const serverErrorMessage = strings('errors.server');

// Message used in case of an unknown error
const unknownErrorMessage = strings('errors.unknown_error');

// Message used in case of an network error
const networkErrorMessage = strings('errors.network');

// Popup error title
const errorTitle = strings('validation.error');

export type ErrorType = FetchBaseQueryError | Error | unknown | any;

/**
 * check if error is form rtk query
 * @param error - Error to check
 * @returns {true} - Returns is rtk query error type
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Handle all kind of ws errors (network)
 * @param error - Error to handle it can be an error (throwed by WS) or error throwed in handle logic
 * @param isGlobal - Boolean to specify if the popup error is global
 * @returns {string} - Returns the error message
 */
export const handleError = (
  error: Error | unknown,
  isGlobal: boolean = true
): string => {
  if (isFetchBaseQueryError(error)) {
    if (error?.status) {
      switch (error.status) {
        case httpStatusCodes.UNAUTHORIZED:
          handleErrorPopUp(error, isGlobal);
          return strings('session.description');
        case httpStatusCodes.SERVER_ERROR:
          handleErrorPopUp(error, isGlobal);
          return serverErrorMessage;
        default:
          return serverErrorMessage;
      }
    } else if (isNetworkError(error)) {
      return networkErrorMessage;
    }
    return unknownErrorMessage;
  }
  return unknownErrorMessage;
};

/**
 * Shows an error popup
 * @param confirmCallback - Callback to execute when pressing popup button (It can be a side logic to error)
 */
const isNetworkError = (error: any): boolean => {
  return (
    'error' in error &&
    error?.error?.toString() === 'TypeError: Network request failed'
  );
};

/**
 * Shows an error popup
 * @param error - Error to handle it can be an error (throwed by WS) or error throwed in handle logic
 * @param isGlobal - Boolean to specify if the popup error is global
 * @param confirmCallback - Callback to execute when pressing popup button (It can be a side logic to error)
 * @param cancelCallback - Callback to execute when pressing popup cancel button (It can be a side logic to error)
 * @param confirmText -  String representing confirm button text
 * @param cancelText - String representing cancel button text
 */
export const handleErrorPopUp = (
  error: Error | unknown,
  isGlobal: boolean = true,
  confirmCallback?: (() => void) | (() => Promise<void>),
  cancelCallback?: () => void,
  confirmText: string = strings('actions.ok'),
  cancelText: string = strings('actions.cancel')
): void => {
  if (isFetchBaseQueryError(error)) {
    if (error?.status) {
      switch (error.status) {
        case httpStatusCodes.UNAUTHORIZED:
          showPopup(store.dispatch, {
            title: strings('session.title'),
            message: strings('session.description'),
            isGlobal,
            confirmCallback: () => {
              // store.dispatch(closePopup);
            }
          });
          break;
        case httpStatusCodes.SERVER_ERROR:
          showPopup(store.dispatch, {
            title: errorTitle,
            message: serverErrorMessage,
            isGlobal,
            confirmCallback,
            cancelCallback,
            confirmText,
            cancelText
          });
          break;
        default:
          showPopup(store.dispatch, {
            title: errorTitle,
            message: strings('errors.server'),
            isGlobal,
            confirmCallback,
            cancelCallback,
            confirmText,
            cancelText
          });
          break;
      }
    } else if (isNetworkError(error)) {
      showPopup(store.dispatch, {
        title: errorTitle,
        message: strings('errors.network'),
        isGlobal,
        confirmCallback,
        cancelCallback,
        confirmText,
        cancelText
      });
    } else {
      showPopup(store.dispatch, {
        title: errorTitle,
        message: unknownErrorMessage,
        isGlobal,
        confirmCallback,
        cancelCallback,
        confirmText,
        cancelText
      });
    }
  } else {
    showPopup(store.dispatch, {
      title: errorTitle,
      message: unknownErrorMessage,
      isGlobal,
      confirmCallback,
      cancelCallback,
      confirmText,
      cancelText
    });
  }
};
