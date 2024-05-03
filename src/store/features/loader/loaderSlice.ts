import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '_store/store';

import {createSlice} from '@reduxjs/toolkit';

interface LoaderState {
  isGlobal: boolean;
  isVisible: boolean;
}

const initialState: LoaderState = {
  isGlobal: true,
  isVisible: false,
};

/**
 * Creates a slice for handling global loader state
 */
export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoaderVisible: (
      state: LoaderState,
      action?: PayloadAction<Partial<LoaderState>>,
    ) => {
      state.isGlobal = action?.payload.isGlobal ?? true;
      state.isVisible = true;
    },
    setLoaderInvisible: (state: LoaderState) => {
      state.isVisible = false;
    },
  },
});

// Export loader actions
export const {setLoaderVisible, setLoaderInvisible} = loaderSlice.actions;

// Export loader state selector
export const SelectLoader = (state: RootState): LoaderState => state.loader;

export default loaderSlice;
