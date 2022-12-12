import React, { useState, useRef, useMemo } from "react";
import ReactMapGL, { Marker, Popup, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import sfData from "./data/sfBarData";
import ReactSlider from "react-slider";
import { circleLayer, heatmapLayer } from "./map-style";

function createObjData(filteredPopData, coordinatesData, barID) {
  let featuresObj = {};
  let propertiesObj = {};
  let geometryObj = {};
  propertiesObj["hour"] = filteredPopData[0];
  propertiesObj["id"] = barID;
  geometryObj["coordinates"] = coordinatesData;
  geometryObj["type"] = "Point";
  featuresObj["properties"] = propertiesObj;
  featuresObj["geometry"] = geometryObj;
  featuresObj["type"] = "Feature";

  return featuresObj;
}

function popularityByHour(data, hour, day) {
  let features = [];
  const popularityData = data.map((place) =>
    place.populartimes.map((time) => time.name === day && time.data[hour])
  );
  let filteredPopData = popularityData.map((arr) =>
    arr.filter((e) => e !== false)
  );

  const coordinatesData = data.map((place) => [
    place.coordinates.lng,
    place.coordinates.lat,
  ]);
  const barID = data.map((placeID) => placeID.id);

  let i = 0;
  while (i < popularityData.length) {
    features.push(
      createObjData(filteredPopData[i], coordinatesData[i], barID[i])
    );
    i += 1;
  }

  return { type: "FeatureCollection", features };
}

function HeatMap({ setCurrentValue }) {
  const [viewport, setViewPort] = useState({
    latitude: 37.774929,
    longitude: -122.419418,
    zoom: 14,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDataSet, setSelectedDataSet] = useState("");
  const mapRef = useRef();

  const data = useMemo(() => {
    return popularityByHour(sfData, selectedHour, selectedDay);
  }, [selectedHour, selectedDay]);

  //   const layerStyle = {
  //     id: "point",
  //     type: "circle",
  //     paint: {
  //       "circle-radius": 10,
  //       "circle-color": [
  //         "interpolate",
  //         ["linear"],
  //         ["get", "hour"],
  //         1,
  //         "rgba(33,102,172,0)",
  //         40,
  //         "rgb(103,169,207)",
  //         50,
  //         "rgb(209,229,240)",
  //         60,
  //         "rgb(253,219,199)",
  //         70,
  //         "rgb(239,138,98)",
  //         90,
  //         "rgb(178,24,43)",
  //       ],
  //     },
  //   };
  //   const geojson = {
  //     type: "FeatureCollection",
  //     features: [
  //       {
  //         type: "Feature",
  //         geometry: { type: "Point", coordinates: [-122.4, 37.8] },
  //       },
  //     ],
  //   };
  const mapboxAccessToken = `${process.env.REACT_APP_MAP_TOKEN}`;

  return (
    <div>
      <ReactMapGL
        initialViewState={viewport}
        ref={mapRef}
        style={{ width: "100vw", height: "80vh" }}
        mapStyle="mapbox://styles/mitchhh35/cl9yq5lbl000115o6la7ih9qr"
        mapboxAccessToken={mapboxAccessToken}
      >
        {sfData?.map((places) => (
          <>
            <Marker
              key={places.id}
              latitude={places.coordinates.lat}
              longitude={places.coordinates.lng}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  setSelectedPlace(places);
                  //have to set Popup is true
                  setShowPopup(true);
                }}
              >
                {/* <img src="https://img.icons8.com/color/344/where.png" alt="hello" /> */}
              </button>
            </Marker>
          </>
        ))}

        {showPopup && (
          <Popup
            key={selectedPlace.id}
            latitude={selectedPlace.coordinates.lat}
            longitude={selectedPlace.coordinates.lng}
            closeOnClick={false}
            maxWidth="300px"
            onClose={() => setShowPopup(false)}
          >
            <h2>{selectedPlace.name}</h2>
            <h3>Type:</h3>
            {selectedPlace.populartimes.map((time) =>
              time.name === selectedDay ? (
                <>
                  <div>{time.data[selectedHour]}</div>
                </>
              ) : (
                ""
              )
            )}
          </Popup>
        )}
        <Source id="my-data" type="geojson" data={data}>
          <Layer {...circleLayer} />
          <Layer {...heatmapLayer} />
        </Source>
      </ReactMapGL>
      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        marks={1}
        min={0}
        max={23}
        defaultValue={0}
        value={selectedHour}
        onChange={(value) => setSelectedHour(value)}
        renderMark={(props) => {
          if (props.key < selectedHour) {
            props.className = "customSlider-mark customSlider-mark-before";
          } else if (props.key === selectedHour) {
            props.className = "customSlider-mark customSlider-mark-active";
          }
          return <span {...props} />;
        }}
      />

      <select
        value={selectedDay}
        onChange={(event) => setSelectedDay(event.target.value)}
      >
        <option>Select a Day</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      <select
        value={selectedDataSet}
        onChange={(event) => setSelectedDataSet(event.target.value)}
      >
        <option>Select a City</option>
        <option value="SF">San Francisco</option>
        <option value="LA">Los Angeles</option>
        <option value="NYC">New York</option>
      </select>
    </div>
  );
}
export default HeatMap;
