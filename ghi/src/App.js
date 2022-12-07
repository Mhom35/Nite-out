import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./frontendAuth";
import "./App.css";
import Signup from "./signup.js";
import SignIn from "./signin.js";
import TopTrips from "./toptrips.js";
import Trip from "./createatrip.js";
import YelpMap from "./yelpmap";
import AddLocation from "./Geomap";
import TripDetail from "./tripDetail";
import EditBars from "./EditBars.js";
import EditTrip from "./editTrip";
import SignOut from "./signout.js";
import NavBar from "./NavBar";
import Home from "./Home";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null
}

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <div className="navColor">{/* <Nav token={token} /> */}</div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/login/new" element={<Signup />} />
          <Route path="trips">
            <Route index element={<TopTrips />} />
            <Route path="new" element={<Trip />} />
            <Route path="details/:id" element={<TripDetail />}></Route>
          </Route>
          <Route path="/yelpmap" element={<YelpMap />} />
          <Route path="/location/add" element={<AddLocation />} />
          <Route path="/edit/trips" element={<EditTrip />} />
          <Route path="/edit/bars" element={<EditBars />} />

          <Route path="/logout" element={<SignOut />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
