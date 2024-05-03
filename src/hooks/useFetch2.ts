import {useState, type Dispatch, type SetStateAction} from 'react';

import {handleError} from '_utils/network';

/**
 * Type for refreshing, loading, fail callbacks
 * D generic type representing success response
 * T represents data type
 */
type OptionsType<T> = {
  // Callback fired on ws success
  onSuccess?: (result: T) => void;
  // Callback fired on refresh success
  onRefreshSuccess?: (result: T) => void;
  // Callback fired on fail
  onFailedError?: (error: any) => void;
  // Callback fired on refresh fail
  onRefreshError?: (error: any) => void;
  // Callback fired when the call is done
  onSettled?: () => void;
  // Initial data before ws call
  initialData?: T;
  // Callback fired when the refresh call is done
  onRefreshSettled?: () => void;
};

/**
 * useFetch hook return type
 */
export interface UseFetchReturnType<T> {
  // Fetched data (initially populated with initialData option)
  data?: T;
  // Fetched data setter (used to set data from outside this hook)
  setData: Dispatch<SetStateAction<T | undefined>>;
  // Ws error
  failedError?: string;
  // Boolean for representing a ws call is in progress (used to show loading spinner)
  isLoading: boolean;
  // Refresh call fail error
  refreshError?: string;
  // Boolean for representing a refresh is in progress (used to show refreshControl)
  isRefreshing: boolean;
  // Fetch call executor
  apiCall: () => Promise<void>;
  // Refresh call executor
  refreshApiCall: () => Promise<void>;
}
/**
 *
 * @param promise - data promise to be called when needed by the hook
 * @returns {UseFetchReturnType} - Returns UseFetchReturnType containing WS states (data, loaders ...) and api calls function
 */
export const useFetch2 = <T>(
  promiseFetch: () => Promise<T>,
  options?: OptionsType<T>,
): UseFetchReturnType<T> => {
  const {
    onSuccess,
    onFailedError,
    onSettled,
    initialData,
    onRefreshError,
    onRefreshSuccess,
    onRefreshSettled,
  } = options ?? {};

  // Data state initially populated with initialData option
  const [data, setData] = useState<T | undefined>(initialData);

  const [failedError, setFailedError] = useState<string | undefined>(undefined);
  const [refreshError, setRefreshError] = useState<string | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Execute api call with hook param and handle abort
   */
  const apiCall = async (): Promise<void> => {
    setIsLoading(true);
    if (failedError) setFailedError(undefined);
    try {
      // if the ws response has an additional data key
      const result = await promiseFetch();
      onSuccess?.(result);
      setData(result);
    } catch (err: any) {
      setFailedError(handleError(err));
      onFailedError?.(err);
    } finally {
      setIsLoading(false);
      onSettled?.();
    }
  };

  /**
   * Execute data refresh call using hook
   */
  const refreshApiCall = async (): Promise<void> => {
    setIsRefreshing(true);
    if (refreshError) setRefreshError(undefined);
    try {
      const result = await promiseFetch();
      onRefreshSuccess?.(result);
      setData(result);
    } catch (err: any) {
      setRefreshError(handleError(err));
      onRefreshError?.(err);
    } finally {
      setIsRefreshing(false);
      onRefreshSettled?.();
    }
  };

  return {
    data,
    setData,
    failedError,
    isLoading,
    apiCall,
    refreshError,
    isRefreshing,
    refreshApiCall,
  };
};
