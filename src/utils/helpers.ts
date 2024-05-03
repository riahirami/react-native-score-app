import type {StorageValuesType} from './storageKeys';
import type {PopupParams} from './types';
import type {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import type {RootState} from '_store/store';

import {Platform} from 'react-native';
import RNSInfo from 'react-native-sensitive-info';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {setPopupConfig} from '_store/features/popup/popupSlice';

import {strings} from '_i18n';

import {KEYCHAIN_SERVICE_NAME, SHARED_PREFERANCES_NAME} from './constants';

/**
 * Tests if the current device os is Android
 * @returns boolean to tell if the current device is android
 */
export const isAndroidDevice = (): boolean => {
  return Platform.OS === 'android';
};

/**
 * Tests if the current device os is IOS
 * @returns boolean to tell if the current device is ios
 */
export const isIosDevice = (): boolean => {
  return Platform.OS === 'ios';
};

/**
 * Set an item to async storage
 * @param key - Storage key (From storageKeys util)
 * @param value - The stringified value to store
 */
export const setAsyncStoreItem = async <T extends string | object>(
  key: string,
  value: T,
): Promise<void> => {
  try {
    const storedValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, storedValue);
  } catch (e) {
    console.log('error', e);
  }
};

/**
 * Remove specified item from async storage
 * @param key - Storage key (From storageKeys util)
 */
export const removeAsyncStoreItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('error', e);
  }
};

/**
 * Get stored value from async storage using key
 * @returns {Promise<T | null>} - Returns the stored value (parsed as JSON)
 */
export const getAsyncStoreItem = async <T extends string | object>(
  key: StorageValuesType,
): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
};

/**
 * Set item to secure store (keychain ios or shared pref android)
 * @param key - Storage key (From storageKeys util)
 * @param value - The stringified value to store
 */
export const setSensitiveInfoStorageItem = async <T extends string | object>(
  key: string,
  value: T,
): Promise<void> => {
  try {
    const storedValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    await RNSInfo.setItem(key, storedValue, {
      sharedPreferencesName: SHARED_PREFERANCES_NAME,
      keychainService: KEYCHAIN_SERVICE_NAME,
    });
  } catch (e) {
    console.log('error', e);
  }
};

/**
 * Get value from secure storage (keychain ios or shared pref android)
 * @param key - Storage key (From storageKeys util)
 * @returns {Promise<T extends string | object>} - Returns the stored value (parsed as JSON)
 */
export const getSensitiveInfoStorageItem = async <T extends string | object>(
  key: StorageValuesType,
): Promise<T | null> => {
  try {
    const value = await RNSInfo.getItem(key, {
      sharedPreferencesName: SHARED_PREFERANCES_NAME,
      keychainService: KEYCHAIN_SERVICE_NAME,
    });
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
};

/**
 * Remove value from secure storage (keychain ios or shared pref android)
 * @param key - Storage key (From storageKeys util)
 */
export const removeSensitiveInfoStorageItem = async (
  key: string,
): Promise<void> => {
  await RNSInfo.deleteItem(key, {
    sharedPreferencesName: SHARED_PREFERANCES_NAME,
    keychainService: KEYCHAIN_SERVICE_NAME,
  });
};

/**
 *
 * @param dispatch - The dispatch method as modified by React-Thunk; overloaded so that you can dispatch standard and thunk actions
 * @param params - Popup config to set in redux state
 */
export const showPopup = (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  params: PopupParams,
): void => {
  dispatch(
    setPopupConfig({
      isVisible: true,
      title: params.title ?? '',
      message: params.message,
      confirmText: params.confirmText ?? strings('popup.confirm_text'),
      isGlobal: params.isGlobal ?? true,
      confirmCallback: params.confirmCallback,
    }),
  );
};
