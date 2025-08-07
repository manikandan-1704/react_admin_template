import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
