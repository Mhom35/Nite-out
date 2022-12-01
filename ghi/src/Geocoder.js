// import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import { useControl } from "react-map-gl";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// const Geocoder = () => {
//     const accessToken =
//         "pk.eyJ1IjoiZHJyY2t3YW4iLCJhIjoiY2xhYTlsMnR2MDV3MzNybnQzbGo1dWloaSJ9.GAh-bzyBqqjNEYeIDfT94g";
//     const ctrl = new MapBoxGeocoder({
//         accessToken: accessToken,
//         marker: false,
//         collapsed: true,
//     });
//     useControl(() => ctrl);
//     ctrl.on("result", (e) => {
//         const coords = e.result.geometry.coordinates;
//         dispatch({
//             type: "UPDATE_LOCATION",
//             payload: { lng: coords[0], lat: coords[1] },
//         });
//     });
//     return null;
// };
// export default Geocoder;
