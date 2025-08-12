import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';
import uiReducer from './slices/uiSlice';
import { todoApi } from './api/todoApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware)
    .concat(todoApi.middleware),
  
});
