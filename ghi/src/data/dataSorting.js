import la from "./laBarData.js";
import newYork from "./newYorkData.js";
import sfData from "./sfBarData";

const dataObj = {
  SF: sfData,
  NYC: newYork,
  LA: la,
};

const switchData = (data) => {
  switch (data) {
    case "SF":
      return dataObj.SF;
    case "LA":
      return dataObj.LA;
    case "NYC":
      return dataObj.LA;
  }
};

export default switchData;
