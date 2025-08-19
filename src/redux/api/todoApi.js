import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLoading } from '../slices/uiSlice';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Todos', 'Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
      providesTags: ['Todos'],
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
    
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Todos'],
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
    updateTodo: builder.mutation({
      query: ({ id, ...updatedTodo }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: updatedTodo,
      }),
      invalidatesTags: ['Todos', 'Todo'],
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
        deleteTodo: builder.mutation({
          query: (id) => ({
            url: `todos/${id}`,
            method: 'DELETE',
          }),
          invalidatesTags: ['Todos', 'Todo'],
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
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi;
