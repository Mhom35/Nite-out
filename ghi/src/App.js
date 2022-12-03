import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "./signup.js";
import Logout from "./signout.js";
import SignIn from "./signin.js";
import Top from "./toptrips.js";
import Trip from "./createatrip.js";
import YelpMap from "./yelpmap";
import AddLocation from "./Geomap";
<<<<<<< HEAD
import EditBars from "./EditBars.js";
=======
// import EditBars from "./EditBars.js";
>>>>>>> main
import EditTrip from "./editTrip";

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
        <Route path="/trip" element={<Trip />} />
        <Route path="/yelpmap" element={<YelpMap />} />
        <Route path="/location/add" element={<AddLocation />} />
<<<<<<< HEAD
        <Route path="/edit/trips" element={<EditTrip />} />
        <Route path="/edit/bars" element={<EditBars />} />
=======
        <Route path="/edit/bars" element={<EditTrip />} />
>>>>>>> main

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
