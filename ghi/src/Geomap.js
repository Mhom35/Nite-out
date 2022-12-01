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
  const [showPopup, setShowPopup] = useState(false);

  const [yelpData, setYelpData] = useState([]);
  const [backendData, setBackendData] = useState([]);
  const locationSearched = "New York";

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

  var bearer = "Bearer " + API_KEY;

  useEffect(() => {
    const search = async () => {
      const data = await axios
        .get(
          `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
            params: {
              categories: "bar",
              latitude: lat,
              longitude: lng,
            },
          }
        )
        .then((res) => {
          setYelpData(res.data.businesses);
        })
        .catch((err) => {
          console.log("error");
        });
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
    console.log(lat);
    console.log(yelpData);
  }, [lat]);

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
                  setSelectedPlace(places);
                  //have to set Popup is true
                  setShowPopup(true);
                }}
              >
                <img
                  src="https://www.pngfind.com/pngs/m/671-6710560_blue-map-marker-png-transparent-png.png"
                  alt="hello"
                />
              </button>
            </Marker>
          </>
        ))}

        {showPopup && (
          <Popup
            key={selectedPlace.bar_id}
            latitude={selectedPlace.lat}
            longitude={selectedPlace.long}
            closeOnClick={false}
            maxWidth="300px"
            onClose={() => setShowPopup(false)}
          >
            <h2>{selectedPlace.bar_name}</h2>
            <h3>Price</h3>
            <button>+</button>
            <p>{selectedPlace.price}</p>
          </Popup>
        )}
        <Geocoder />
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;
