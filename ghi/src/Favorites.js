import React, { useEffect } from "react";
import EditBars from "./EditBars.js";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  useCreateWishListMutation,
  useAddTripToWishListTripMutation,
  useDeleteTripFromWishListMutation,
  useGetWishListQuery
} from "./app/favoritesAPI";
import { useDispatch } from "react-redux";




export default function WishList() {

    const { data: wishlistdata, isLoading } = useGetWishListQuery();
    const dispatch = useDispatch();

    console.log(wishlistdata)
    

    return(
        <p>
            hi

        </p>

    )




}