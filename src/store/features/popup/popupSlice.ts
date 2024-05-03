import type {RootState} from '../../store';
import type {PayloadAction} from '@reduxjs/toolkit';

import {createSlice} from '@reduxjs/toolkit';

// Defines popup config interface containing accepted attributes
export interface PopupConfig {
  // Boolean for popup visibility
  isVisible: boolean;
  // Title of the popup
  title: string;
  // Description of the popup
  message?: string;
  // Confirm button text
  confirmText?: string;
  // Boolean to tell if the popup is global
  isGlobal?: boolean;
  // Side logic called when pressing popup button
  confirmCallback?: () => void;
}

interface PopupConfigState {
  popupConfig: PopupConfig;
}
// Define the initial state using that type
const initialState: PopupConfigState = {
  popupConfig: {title: '', isVisible: false, isGlobal: true},
};

/**
 * Creates a slice for handling popup state
 */
export const popupSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    setPopupConfig: (
      state: PopupConfigState,
      action: PayloadAction<PopupConfig>,
    ) => {
      state.popupConfig = action.payload;
    },
    closePopup: (state: PopupConfigState) => {
      state.popupConfig.isVisible = false;
      state.popupConfig.isGlobal = true;
      state.popupConfig.confirmCallback = undefined;
    },
  },
});

// Export popup actions
export const {setPopupConfig, closePopup} = popupSlice.actions;

// Export popup state selector
export const SelectPopupConfig = (state: RootState): PopupConfig =>
  state.popup.popupConfig;

export default popupSlice;
