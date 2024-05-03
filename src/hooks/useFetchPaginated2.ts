import type {Dispatch, SetStateAction} from 'react';

import {useState} from 'react';

import {handleError} from '_utils/network';
import {type PaginatedApplication} from '_utils/types';

/**
 * useFetch hook return type - Generic type T represents the type of items
 */
export interface UseFetchPaginated2ReturnType<T> {
  // Boolean for representing a ws call is in progress (used to show loading spinner)
  isLoading: boolean;
  // Boolean for representing a refresh is in progress (used to show refreshControl)
  isRefreshing: boolean;
  // Ws error
  failedError: any;
  // Fetched data items have passed generic type
  data: T[];
  // Holds total number of items
  resultsCount: number | null;
  // Holds last fetched page
  currentPage: number;
  // Boolean for representing a pagination is in progress (used to show bottom loader)
  isLoadingMore: boolean;
  // Load more ws error
  loadingMoreError: any;
  // Refresh call fail error
  refreshError: any;
  // Get first page of items
  getDataOnMount: () => Promise<void>;
  // Called when reaching bottom of the list to load more items
  getMoreData: () => Promise<void>;
  // Called to refresh data for first page
  getRefreshedData: () => Promise<void>;
  // Data setter used to set data from outside this hooks
  setData: Dispatch<SetStateAction<T[]>>;
  // Results count setter used to set resultsCount from outside this hook
  setResultsCount: Dispatch<SetStateAction<number | null>>;
}

/**
 * Hook for handling pagination logic
 * @param fetchDataCallback - fetch data callback return Promise<PaginatedApplication<T>>
 * @returns {UseFetchPaginated2ReturnType} - Returns UseFetchPaginated2ReturnType containing states (data, loaders, errors ...) and api call functions
 */
const useFetchPaginated2 = <T>(
  fetchDataCallback: (page: number) => Promise<PaginatedApplication<T>>,
): UseFetchPaginated2ReturnType<T> => {
  const DEFAULT_PAGE_NUMBER = 1;

  // Data, errors and loaders states
  const [data, setData] = useState<T[]>([]);
  const [resultsCount, setResultsCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [failedError, setFailedError] = useState<string | undefined>(undefined);
  const [loadingMoreError, setLoadingMoreError] = useState<string | undefined>(
    undefined,
  );
  const [refreshError, setRefreshError] = useState<string | undefined>();

  /**
   * Function called on mount to get first page items
   */
  const getDataOnMount = async (): Promise<void> => {
    try {
      setIsLoading(true);
      if (failedError !== undefined) {
        setFailedError(undefined);
      }
      // Fetch first page data
      const res = await fetchDataCallback(DEFAULT_PAGE_NUMBER);
      setData(res.data);
      setCurrentPage(DEFAULT_PAGE_NUMBER);
      setResultsCount(res.total);
    } catch (err: any) {
      setFailedError(handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Function called when the user scrolls to the bottom of the list to get next data
   */
  const getMoreData = async (): Promise<void> => {
    try {
      setIsLoadingMore(true);
      if (loadingMoreError !== undefined) {
        setLoadingMoreError(undefined);
      }
      // Fetch next page
      const res = await fetchDataCallback(currentPage + 1);
      setCurrentPage(currentPage + 1);
      // Concat new fetched data to data state
      setData([...data, ...res.data]);
    } catch (err: any) {
      setLoadingMoreError(handleError(err));
    } finally {
      setIsLoadingMore(false);
    }
  };

  /**
   * Function called to refresh data this will reset current page to 1
   */
  const getRefreshedData = async (): Promise<void> => {
    try {
      setIsRefreshing(true);
      if (refreshError !== undefined) {
        setRefreshError(undefined);
      }
      // Fetch page 1
      const res = await fetchDataCallback(DEFAULT_PAGE_NUMBER);
      setCurrentPage(DEFAULT_PAGE_NUMBER);
      setData(res.data);
      setResultsCount(res.total);
    } catch (err: any) {
      setRefreshError(handleError(err));
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    isLoading,
    isRefreshing,
    failedError,
    data,
    resultsCount,
    currentPage,
    isLoadingMore,
    loadingMoreError,
    refreshError,
    getDataOnMount,
    getMoreData,
    getRefreshedData,
    setData,
    setResultsCount,
  };
};

export default useFetchPaginated2;
