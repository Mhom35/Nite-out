import { Box } from "@mui/material";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import Geocoder from "./Geocoder";

const AddLocation = () => {
  const viewport = {
    latitude: 37.774929,
    longitude: -122.419418,
    zoom: 10,
  };
  const [lat, setLat] = useState(37.779);
  const [lng, setLng] = useState(-122.419906);
  const mapRef = useRef();

  // useEffect(() => {
  //     const storedLocation = JSON.parse(
  //     localStorage.getItem(currentUser.id)
  //     )?.location;
  //     if (!lng && !lat && !storedLocation?.lng && !storedLocation?.lat) {
  //     fetch("https://ipapi.co/json")
  //         .then((response) => {
  //         return response.json();
  //         })
  //         .then((data) => {
  //         dispatch({
  //             type: "UPDATE_LOCATION",
  //             payload: { lng: data.longitude, lat: data.latitude },
  //         });
  //         });
  //     }
  // }, []);

  useEffect(() => {
    if ((lng || lat) && mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
      });
    }
  }, [lng, lat]);
  const Geocoder = () => {
    const accessToken =
      "pk.eyJ1IjoiZHJyY2t3YW4iLCJhIjoiY2xhYTlsMnR2MDV3MzNybnQzbGo1dWloaSJ9.GAh-bzyBqqjNEYeIDfT94g";
    const ctrl = new MapBoxGeocoder({
      accessToken: accessToken,
      marker: false,
      collapsed: false,
    });
    useControl(() => ctrl);
    ctrl.on("result", (e) => {
      const coords = e.result.geometry.coordinates;
      setLng(coords[0]);
      setLat(coords[1]);
    });

    return null;
  };
  function setLatLong(e) {
    setLng(e.lngLat.lng);
    setLat(e.lngLat.lat);
  }
  function getLocation(e) {
    setLng(e.coords.longitude);
    setLat(e.coords.latitude);
  }

  return (
    <Box
      sx={{
        height: 700,
        gap: 2,
        position: "relative",
      }}
    >
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoiZHJyY2t3YW4iLCJhIjoiY2xhYTlsMnR2MDV3MzNybnQzbGo1dWloaSJ9.GAh-bzyBqqjNEYeIDfT94g"
        initialViewState={viewport}
        mapStyle="mapbox://styles/mitchhh35/cl9yq5lbl000115o6la7ih9qr"
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={setLatLong}
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={getLocation}
        />
        <Geocoder />
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;
