import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLoading } from '../slices/uiSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Users', 'User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['Users'],
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

    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
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

    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['Users', 'User'],
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

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
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
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;
