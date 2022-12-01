import { Box } from "@mui/material";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { useControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";

const AddLocation = () => {
  const viewport = {
    latitude: 37.774929,
    longitude: -122.419418,
    zoom: 10,
  };

  const [lat, setLat] = useState(37.779);
  const [lng, setLng] = useState(-122.419906);
  const mapRef = useRef();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [yelpSelectedPlace, setYelpSelectedPlace] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [yelpPopup, setYelpPopUp] = useState(false);

  const [yelpData, setYelpData] = useState([]);
  const [backendData, setBackendData] = useState([]);
  const [location, setLocation] = useState({});
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchYelpData = async () => {
      //get all the yelp bars added to database
      const url = "http://localhost:8001/bars/";
      const response = await fetch(url);
      const data = await response.json();
      setBackendData(data);
    };

    fetchYelpData();
  }, []);

  const API_KEY =
    "VXewi8fN8R31u-aMs8JHgs3D6_KkTTnVXEaz1RXj4UoKrNDt82YLvgaDlC5VCxaF-OkdYJ4FQGWo4qwzez_MW23qTXbXnvxbsx2zJTcQCqB_HiVnIAR0r54D-Kt5Y3Yx";

  useEffect(() => {
    const search = async () => {
      const corsProxy = "https://proxy-ibmasyzzya-uc.a.run.app/";
      const yelpApi = "https://api.yelp.com/v3/businesses/search";
      const searchParams = `?term=bar&latitude=${lat}&longitude=${lng}`;
      const fetchOptions = { headers: { Authorization: `Bearer ${API_KEY}` } };
      const response = await fetch(
        corsProxy + yelpApi + searchParams,
        fetchOptions
      );
      const jsonResponse = await response.json();
      if (jsonResponse) {
        setYelpData(jsonResponse.businesses);
      }
    };
    search();
  }, [lat, lng]);

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
  useEffect(() => {
    console.log(locations);
  }, [locations]);

  const handleAddLocation = async () => {
    selectedPlace ? setLocation(selectedPlace) : setLocation(yelpSelectedPlace);
    if (!location["bar_id"]) {
      const corsProxy = "https://proxy-ibmasyzzya-uc.a.run.app/";
      const yelpApi = "https://api.yelp.com/v3/businesses/";
      const searchParams = `${location.id}`;
      const fetchOptions = { headers: { Authorization: `Bearer ${API_KEY}` } };
      const result = await fetch(
        corsProxy + yelpApi + searchParams,
        fetchOptions
      );
      const YelpResponse = await result.json();
      let yelp_id = YelpResponse["id"];
      let bar_name = YelpResponse["name"];
      let url = YelpResponse["url"];
      let lat = YelpResponse.coordinates.latitude;
      let long = YelpResponse.coordinates.longitude;

      const data = {
        yelp_id: yelp_id,
        bar_name: bar_name,
        url: url,
        lat: lat,
        long: long,
      };
      const barUrl = "http://localhost:8001/bars/new";
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(barUrl, fetchConfig);
      if (response.ok) {
        const newBar = await response.json();
        locations.push(newBar.bar_id);
        return true;
      }
    }
    location.bar_id && locations.push(location.bar_id);
  };

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
        {backendData?.map((places) => (
          <>
            <Marker
              key={places.id}
              latitude={places.lat}
              longitude={places.long}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  // e.preventDefault();
                  setSelectedPlace(places);
                  //have to set Popup is true
                  setShowPopup(true);
                  setYelpPopUp(false);
                }}
              >
                <img
                  src="https://img.icons8.com/color/344/where.png"
                  alt="hello"
                />
              </button>
            </Marker>
          </>
        ))}
        {yelpData?.map((places) => (
          <>
            <Marker
              key={places.id}
              latitude={places.coordinates.latitude}
              longitude={places.coordinates.longitude}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  // e.preventDefault();
                  setYelpSelectedPlace(places);
                  setSelectedPlace(null);
                  //have to set Popup is true
                  setYelpPopUp(true);
                  setShowPopup(false);
                }}
              >
                <img
                  src="https://o.remove.bg/downloads/48b67d1d-2ed9-42e7-86f5-6f6b798f40d9/671-6710560_blue-map-marker-png-transparent-png-removebg-preview.png"
                  alt="hello"
                />
              </button>
            </Marker>
          </>
        ))}

        {showPopup && (
          <Popup
            key={selectedPlace.id}
            latitude={selectedPlace.lat}
            longitude={selectedPlace.long}
            closeOnClick={false}
            maxWidth="300px"
            onClose={() => setShowPopup(false)}
          >
            <h2>{selectedPlace.bar_name}</h2>
            <h3>Price</h3>
            <button onClick={handleAddLocation}>+</button>
            <p>{selectedPlace.price}</p>
          </Popup>
        )}
        {yelpPopup && (
          <Popup
            key={yelpSelectedPlace.id}
            latitude={yelpSelectedPlace.coordinates.latitude}
            longitude={yelpSelectedPlace.coordinates.longitude}
            closeOnClick={false}
            maxWidth="300px"
            onClose={() => setYelpPopUp(false)}
          >
            <h2>{yelpSelectedPlace.name}</h2>
            <h3>Price</h3>
            <p>{yelpSelectedPlace.price}</p>
            <button onClick={handleAddLocation}>+</button>
          </Popup>
        )}

        <Geocoder />
      </ReactMapGL>
      <div>
        <button onClick={(e) => setLocations([])}>clear locations</button>
      </div>
    </Box>
  );
};

export default AddLocation;

// const search = async () => {
//   const url = `https://api.yelp.com/v3/businesses/search?term=bar&latitude=${lat}&longitude=${lng}`;
//   const response = await fetch(url, {
//     method: "GET",
//     withCredentials: true,
//     credentials: "include",
//     headers: {
//       "Access-Control-Request-Headers": "*",
//       /* prettier-ignore */ "Authorization": `${bearer}`,
//       "Content-Type": "application/json",
//     },
