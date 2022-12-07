import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "./authApiSlice";

export const tripsApi = createApi({
  reducerPath: "trips",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TRIPS_API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const selector = authApiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["TripsList"],

  endpoints: (builder) => ({
    addTrip: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((acc, [key, value]) => {
          acc[key] = Number.parseInt(value) || value;
          return acc;
        }, {});
        return {
          method: "post",
          url: "/api/books",
          credentials: "include",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),
    createTrip: builder.mutation({
      query: (data) => ({
        url: "/trips",
        body: data,
        method: "post",
      }),
    }),

    // addBar: builder.mutation({
    //   query: (form) => {
    //     const formData = new FormData(form);
    //     const entries = Array.from(formData.entries());
    //     const data = entries.reduce((acc, [key, value]) => {
    //       acc[key] = Number.parseInt(value) || value;
    //       return acc;
    //     }, {});
    //     return {
    //       method: "post",
    //       url: "/api/books",
    //       credentials: "include",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: [{ type: "Books", id: "LIST" }],
    // }),

    getAllTrips: builder.query({
      query: () => `/trips`,
      providesTags: ["TripsList"],
      //   providesTags: (data) => {
      //     const tags = [{ type: "Books", id: "LIST" }];
      //     if (!data || !data.books) return tags;

      //     const { books } = data;
      //     if (books) {
      //       tags.concat(...books.map(({ id }) => ({ type: "Books", id })));
      //     }
      //     return tags;
      //   },
    }),

    deleteTrip: builder.mutation({
      query: (trip_id) => ({
        method: "delete",
        url: `/trips/${trip_id}`,
      }),
      invalidatesTags: ["TripsList"],
    }),
    updateLocations: builder.mutation({
      query: (data) => ({
        method: "put",
        body: data,
        url: `trips/${data.id}/update-bar`,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TripsList", id: arg.id },
      ],
    }),
    updateTrip: builder.mutation({
      query: (data) => ({
        method: "put",
        body: data,
        url: `trips/${data.id}`,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TripsList", id: arg.id },
      ],
    }),
  }),
});

export const {
  useAddBookMutation,
  useCreateTripMutation,
  useBorrowBookMutation,
  useDeleteTripMutation,
  useUpdateLocationsMutation,
  useUpdateTripMutation,
  useGetAllTripsQuery,
  useReturnBookMutation,
} = tripsApi;
