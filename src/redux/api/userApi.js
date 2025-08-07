import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLoading } from '../slices/uiSlice';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
        } catch (err) {
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
