import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice';
import CartSlice from './CartSlice';
import authSlice from './authSlice';
import { apiSlice } from './ApiSlice';

export const Store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    ProductSlice: ProductSlice, 
    CartSlice: CartSlice,       
    authSlice: authSlice,       
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

