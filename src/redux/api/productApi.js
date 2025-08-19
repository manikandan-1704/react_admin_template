import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLoading } from '../slices/uiSlice';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
      providesTags: ['Products'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
} = productApi;
