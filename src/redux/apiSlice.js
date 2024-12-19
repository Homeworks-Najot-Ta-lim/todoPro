import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todo/users/4',
            transformErrorResponse: async (response) => {
                return response.data;
            },
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation({
            query: (newTodo) => ({
                url: '/todo', 
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todo/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos'],
        }),
        editCompleted: builder.mutation({
            query: (todo) => ({
              url: `/todo/${todo.id}`,
              method: 'PUT',
              body: todo,
            }),
            invalidatesTags: ['Todos'],
          }),
          
    }),
});

export const {
    useGetTodosQuery,
    useDeleteTodoMutation,
    useAddTodoMutation,
    useEditCompletedMutation,
} = apiSlice;
