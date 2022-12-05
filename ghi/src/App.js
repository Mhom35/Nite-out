import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "./signup.js";
import Logout from "./signout.js";
import SignIn from "./signin.js";
import Top from "./toptrips.js";
import Trip from "./createatrip.js";
import YelpMap from "./yelpmap";
import AddLocation from "./Geomap";
import TripDetail from "./tripDetail";
// import EditBars from "./EditBars.js";
import EditTrip from "./editTrip";
import TripList from "./tripList";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <div className="navColor">{/* <Nav token={token} /> */}</div>

      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/login/new" element={<Signup />} />
        <Route path="/top" element={<Top />} />
        <Route path="trips">
          <Route index element={<TripList />} />
          <Route path="new" element={<Trip />} />
          <Route path="details/:id" element={<TripDetail />} >
          </Route>
        </Route>
        <Route path="/yelpmap" element={<YelpMap />} />
        <Route path="/location/add" element={<AddLocation />} />
        <Route path="/edit/bars" element={<EditTrip />} />

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
