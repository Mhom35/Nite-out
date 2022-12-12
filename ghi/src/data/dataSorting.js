import la from "./laBarData.js";
import newYork from "./newYorkData.js";
import sfData from "./sfBarData";

const dataObj = {
  SF: {
    dataSet: sfData,
    viewPort: { latitude: 37.774929, longitude: -122.419418, zoom: 14 },
  },
  NYC: {
    dataSet: newYork,
    viewPort: {
      latitude: 40.73061,
      longitude: -73.935242,
      zoom: 14,
    },
  },
  LA: {
    dataSet: la,
    viewPort: {
      latitude: 34.052235,
      longitude: -118.243683,
      zoom: 14,
    },
  },
};

const switchData = (data) => {
  switch (data) {
    case "SF":
      return dataObj.SF;
    case "LA":
      return dataObj.LA;
    case "NYC":
      return dataObj.NYC;
    default:
      return dataObj.SF;
  }
};

export default switchData;
