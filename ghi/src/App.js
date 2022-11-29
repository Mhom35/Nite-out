import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "./signup.js";
import Logout from "./signout.js";
import SignIn from "./signin.js";
import Top from "./toptrips.js";
import Trip from "./createatrip.js";
import Draggable from "./drag";

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
        <Route path="/drag" element={<Draggable />} />

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
