import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import ReactMapGL, { Marker, Popup, Layer, Source, useMap, MapProvider } from "react-map-gl";
import "./toggle.css";
import "mapbox-gl/dist/mapbox-gl.css";
import sfData from "./data/sfBarData";
import dataObj from "./data/dataSorting";
import ReactSlider from "react-slider";
import { circleLayer, heatmapLayer } from "./map-style";
import Form from 'react-bootstrap/Form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';


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

const legend = require("./assets/heatmap-legend.png");

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
  /* eslint-disable */
  const [viewport, setViewPort] = useState({
    latitude: 37.774929,
    longitude: -122.419418,
    zoom: 14,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [popularityData, setPopularityData] = useState(sfData);
  const [lat, setLat] = useState(37.783977);
  const [lng, setLng] = useState(-122.358809);
  const mapRef = useRef();
  const [toggled, setToggled] = useState(false);
  const [pm, setPm] = useState(false);
  const handleClick = () => {
      setToggled((s) => !s);
      setPm(!toggled)
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //useMemo to get the popularity by selectedHour, day and city

  // useEffect(() => {
  //   //selectedDataSet ( from drop down menu)
  //   const cityData = switchData(selectedCity);
  //   setViewPort(cityData.viewPort);
  //   setLng(viewport.longitude);
  //   setLat(viewport.latitude);
  //   setPopularityData(cityData.dataSet);

  // }, [selectedCity]);


  

const data = useMemo(() => {
    return popularityByHour(popularityData, selectedHour, selectedDay);
}, [selectedHour, selectedDay, popularityData]);

  const onSelectCity = useCallback((city) => {
    setPopularityData(city.dataSet)
    mapRef.current?.flyTo({center: [city.viewPort.longitude, city.viewPort.latitude], duration: 5000});
  }, []);


  
  useEffect(() => {
    setSelectedHour(pm ? selectedHour + 12: selectedHour - 12)
  },[pm])

  const mapboxAccessToken = `${process.env.REACT_APP_MAP_TOKEN}`;


  return (
    <>
      <div>
        <MapProvider>
        <ReactMapGL
          ref={mapRef}
          initialViewState={viewport}
          style={{ width: "100vw", height: "80vh" }}
          mapStyle="mapbox://styles/mapbox/navigation-night-v1"
          mapboxAccessToken={mapboxAccessToken}
        >
          {popularityData?.map((places) => (
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
        </MapProvider>
        <ReactSlider
          className="customSlider"
          thumbClassName="customSlider-thumb"
          trackClassName="customSlider-track"
          markClassName="customSlider-mark"
          marks={1}
          min={0}
          max={11}
          defaultValue={0}
          value={selectedHour - (pm ? 12: 0)}
          onChange={(value) => setSelectedHour(value + (pm ? 12:0))}
          renderMark={(props) => {
            if (props.key < (selectedHour - (pm ? 12:0))) {
              props.className = "customSlider-mark customSlider-mark-before";
            } else if (props.key === (selectedHour - (pm ? 12:0))) {
              props.className = "customSlider-mark customSlider-mark-active";
            }
            return <span {...props} />;
          }}
        />

        
            <div className="control-panel">
              {dataObj.map((city, index) => (
                <div key={`btn-${index}`} className="input">
                  <input
                    type="radio"
                    name="city"
                    id={`city-${index}`}
                    defaultChecked={city.city === 'San Francisco'}
                    onClick={() => onSelectCity(city)}
                  />
                  <label htmlFor={`city-${index}`}>{city.city}</label>
                </div>
              ))}
            </div>

      </div>
      {/* <div>
        <img className="heatmap" src={legend} alt="heatmap" />
      </div> */}




      <div className="semantics">
        <div className="sliderContainer">
          <div className="dropdown">
                <FormControl sx={{ minWidth: 120, pb: 5, }}>
                  <InputLabel id="demo-controlled-open-select-label">Day</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={selectedDay}
                    label="Day"
                    onChange={(event) => setSelectedDay(event.target.value)}
                  >
                    <MenuItem value="Monday">Monday</MenuItem>
                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                    <MenuItem value="Thursday">Thursday</MenuItem>
                    <MenuItem value="Friday">Friday</MenuItem>
                    <MenuItem value="Saturday">Saturday</MenuItem>
                    <MenuItem value="Sunday">Sunday</MenuItem>
                  </Select>
                </FormControl>

          </div>
          <div class={`digital-clock${pm ? " night": ""}`}>
              {selectedHour > 0 ? pm ? selectedHour - 12 + 1: selectedHour + 1 : 1}:00
            
          </div>
          <div onClick={handleClick} className={`toggle${toggled ? " night" : ""}`}>
            <div className="notch">
                <div className="crater" />
                <div className="crater" />
                <div className="crater" />
            </div>
            <div>
                <div className="shape sm" />
                <div className="shape sm" />
                <div className="shape md" />
                <div className="shape lg" />
            </div>


          </div>
          <div className={`tod${pm ? " night": ""}`} >
            {pm ? <p>PM</p>: <p>AM</p>}
          </div>

          
        </div>
    </div>
    </>
  );
}
export default HeatMap;
