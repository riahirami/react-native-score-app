/**
 * Define Async Storage keys
 */
export const storageKeys = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
};

export type StorageKeysType = keyof typeof storageKeys;

export type StorageValuesType = (typeof storageKeys)[StorageKeysType];
