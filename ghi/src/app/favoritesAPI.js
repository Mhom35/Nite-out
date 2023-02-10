import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "./authApiSlice";

export const wishListApi = createApi({
  reducerPath: "wishlist",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TRIPS_API_HOST,
    credentials: `include`,
    prepareHeaders: (headers, { getState }) => {
      const selector = authApiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["WishList"],

  endpoints: (builder) => ({
    createWishList: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        body: data,
        credentials: "include",
        method: "POST",
      }),
    }),

    getWishList: builder.query({
      query: (args) => "/wishlist", 
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
            url: "/wltrip",
            body: data,
            method: "post",
        }),
        invalidatesTags: ["WishList"],
    }),
    }),
  })

export const {
  useCreateWishListMutation,
  useAddTripToWishListMutation,
  useDeleteTripFromWishListMutation,
  useGetWishListQuery
} = wishListApi;
