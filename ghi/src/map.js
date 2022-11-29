import React, { useState, useEffect, useMemo } from "react";
import MapGL, { Marker, Popup, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function YelpMap() {
  const [viewport, setViewPort] = useState({
    latitude: 37.774929,
    longitude: -122.419418,
    zoom: 14,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [yelpData, setYelpData] = useState([]);

  useEffect(() => {
    const fetchYelpData = async () => {
      //get all the yelp bars added to database
      const url = "http://localhost:8001/bars/";
      const response = await fetch(url);
      const data = await response.json();
      setYelpData(data);
    };

    fetchYelpData();
  }, []);
  console.log(yelpData);

  return (
    <div>
      <MapGL
        initialViewState={viewport}
        style={{ width: "100vw", height: "90vh" }}
        mapStyle="mapbox://styles/mitchhh35/cl9yq5lbl000115o6la7ih9qr"
        mapboxAccessToken="pk.eyJ1IjoiZHJyY2t3YW4iLCJhIjoiY2xhYTlsMnR2MDV3MzNybnQzbGo1dWloaSJ9.GAh-bzyBqqjNEYeIDfT94g"
      >
        {yelpData?.map((places) => (
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
            <button>+</button>
            <p>{selectedPlace.price}</p>
          </Popup>
        )}
      </MapGL>
    </div>
  );
}
export default YelpMap;
