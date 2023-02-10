import * as React from "react";
import { useEffect } from "react";
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
import { useAuthContext, getToken } from "./frontendAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function WishList() {

    const { data: wishlistdata, isLoading } = useGetWishListQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (isLoading) {
    return (
      // prettier-ignore
      <CircularProgress />
    );
  }

    console.log("wishlist",wishlistdata)

    // useEffect(() => {
    // if (!token) {
    //   navigate("/login");
    // }
    // }, [token, navigate]);
    

    return (
        <>
        {wishlistdata?.map((trip) => 
            <>
            <h3 key={trip.id}>{trip.trip_name}</h3>
            <div class="container">
                <div class="offset"></div>
                    <div class="main-wrapper">
                        {trip.locations.map((location) => 
                            <div class="item">
                            <img key={location.bar_id} src={location.image_url} alt="" />
                            <Typography gutterBottom variant="t5" component="h2">
                                {location.bar_name}
                            </Typography>
                            <a
                                href={location.url}
                                underline="hover"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                More Information
                            </a>
                                </div>
                                
                        )}
            </div>
            </div>
            </>
            
        )}
            
        
        </>
        )

    }