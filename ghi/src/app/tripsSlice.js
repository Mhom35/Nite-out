import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authApiSlice } from './authApiSlice';

export const tripsSlice = createApi({
    reducerPath: 'trips',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRIPS_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            const selector = authApiSlice.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Account', 'Trips', 'Token'],

    endpoints: builder => ({

        addTrip: builder.mutation({
            query: form => {
                const formData = new FormData(form);
                const entries = Array.from(formData.entries());
                const data = entries.reduce((acc, [key, value]) => { acc[key] = Number.parseInt(value) || value; return acc; }, {});
                return {
                    method: 'post',
                    url: '/api/books',
                    credentials: 'include',
                    body: data,
                }
            },
            invalidatesTags: [{ type: 'Books', id: 'LIST' }],
        }),

        addBar: builder.mutation({
            query: form => {
                const formData = new FormData(form);
                const entries = Array.from(formData.entries());
                const data = entries.reduce((acc, [key, value]) => { acc[key] = Number.parseInt(value) || value; return acc; }, {});
                return {
                    method: 'post',
                    url: '/api/books',
                    credentials: 'include',
                    body: data,
                }
            },
            invalidatesTags: [{ type: 'Books', id: 'LIST' }],
        }),

        getBooks: builder.query({
            query: () => `/api/books`,
            providesTags: data => {
                const tags = [{ type: 'Books', id: 'LIST' }];
                if (!data || !data.books) return tags;

                const { books } = data;
                if (books) {
                    tags.concat(...books.map(({ id }) => ({ type: 'Books', id })));
                }
                return tags;
            }
        }),

        borrowBook: builder.mutation({
            query: bookId => ({
                method: 'post',
                url: `/api/books/${bookId}/loans`,
            }),
            invalidatesTags: [{ type: 'Books', id: 'LIST' }],
        }),

        returnBook: builder.mutation({
            query: bookId => ({
                method: 'delete',
                url: `/api/books/${bookId}/loans`,
            }),
            invalidatesTags: [{ type: 'Books', id: 'LIST' }],
        }),
    }),
});

export const {
    useAddBookMutation,
    useBorrowBookMutation,
    useGetBooksQuery,
    useReturnBookMutation,
} = tripsSlice;
