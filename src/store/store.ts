import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {combineReducers, configureStore} from '@reduxjs/toolkit';

import gameSlice from './features/gameSlice/gameSlice';
import globalSlice from './features/globalSlice/globalSlice';
import loaderSlice from './features/loader/loaderSlice';
import {modalSlice} from './features/modalSlice/modalSlice';
import popupSlice from './features/popup/popupSlice';

/**
 * Creates a store to use in App.tsx redux provider
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['game', 'modal', 'global'],
};

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  game: gameSlice.reducer,
  global: globalSlice.reducer,
  popup: popupSlice.reducer,
  loader: loaderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
