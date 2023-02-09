import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "./authApiSlice";

export const wishListApi = createApi({
  reducerPath: "wishlist",
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
    createWishList: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        body: data,
        credentials: "include",
        method: "post",
      }),
    }),

    getWishList: builder.query({
      query: () => `/wishlist`,
      credentials: "include",
      providesTags: ["WishList"],
    }),

    deleteTripFromWishList: builder.mutation({
      query: (trip_id) => ({
        method: "delete",
        url: `/wltrip/{trip_id}/delete-trip-connection}`,
      }),
      invalidatesTags: ["WishList"],
    }),
    addTripToWishList: builder.mutation({
        query: (data) => ({
            url: "/wishlist",
            body: data,
            credentials: "include",
            method: "post",
        }),
        invalidatesTags: ["WishList"],
    }),
    }),
  })

export const {
  useCreateWishListMutation,
  useAddTripToWishListTripMutation,
  useDeleteTripFromWishListMutation,
  useGetWishListQuery
} = wishListApi;
