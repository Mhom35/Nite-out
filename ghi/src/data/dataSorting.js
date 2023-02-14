import la from "./laBarData.js";
import newYork from "./newYorkData.js";
import sfData from "./sfBarData";
import * as React from 'react';

const citiesDataObj = [
  {city: "San Francisco",
  dataSet: sfData,
  viewPort: { latitude: 37.774929, longitude: -122.419418, zoom: 14 },
  },
  {city:"New York",
    dataSet: newYork,
    viewPort: {
      latitude: 40.673086,
      longitude: -73.969427,
      zoom: 14,
    },
  },
  {
    city: "Los Angeles",
    dataSet: la,
    viewPort: {
      latitude: 34.052235,
      longitude: -118.243683,
      zoom: 14,
    },
  },
];

export default citiesDataObj;
// const switchData = (data) => {
//   switch (data) {
//     case "SF":
//       return dataObj.SF;
//     case "LA":
//       return dataObj.LA;
//     case "NYC":
//       return dataObj.NYC;
//     default:
//       return dataObj.SF;
//   }
// };

// function ControlPanel(props) {
//   return (
//     <div className="control-panel">

//       {dataObj.map((city, index) => (
//         <div key={`btn-${index}`} className="input">
//           <input
//             type="radio"
//             name="city"
//             id={`city-${index}`}
//             defaultChecked={city.city === 'San Francisco'}
//             onClick={() => props.onSelectCity(city)}
//           />
//           <label htmlFor={`city-${index}`}>{city.city}</label>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default React.memo(ControlPanel);




