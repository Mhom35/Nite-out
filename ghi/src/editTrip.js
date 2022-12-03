import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useRef } from "react";
import AddLocation from "./Geomap";
import EditBars from "./EditBars.js";
import { useSelector } from "react-redux";

const theme = createTheme();

export default function EditTrip() {
  const editLocation = useSelector((state) => state.editLocations.value);
  const [notFinishEdit, setNotFinishedEdit] = useState(true);

  const editLocationMapRef = useRef();
  const locationsMapRef = useRef();

  const [tripName, setTripName] = useState("");
  // const [location, setLocation] = useState([]);
  const [description, setDescription] = useState("");
  const [editName, setEditName] = useState(false);
  // const [editDescription, setEditDescription] = useState(false);
  const [editBarsforTrip, setEditBarsforTrip] = useState(false);
  const [addLocation, setAddLocation] = useState(false);

  // when editLocation is mounted (i.e we finished editing it we will close the editBars component)
  useEffect(
    (e) => {
      setNotFinishedEdit(false);
    },
    [editLocation]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!editName && (
            <Typography component="h1" variant="h5">
              {" "}
              {tripName}{" "}
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAACWlpYwMDB7e3t4eHixsbHz8/Pl5eUODg7c3NxFRUX7+/uvr68zMzP29vbt7e3GxsYbGxs4ODgXFxdAQEDMzMzExMRWVlabm5shISFISEhnZ2eOjo7i4uK4uLilpaVRUVGBgYGeQtyWAAADiElEQVR4nO3dcVObQBAF8LsYqqYaq2mitjWx/f4fsiGAcCEX7oDj7i3v92edzNwbdtlF7EQpIiIiIiIiIiIiIiIiuur17WbzHvsQIS117teP2OcIpgio9YvUiJnWsiPWAYVGbAYUGXGpTT+lRcz0OWF31HZAYYV6XqLiIl66gqJ60Qj4JrAXjYBLtRN3FZdmQKWehfWicQWz0z/JinghoDILFTziWQ9W5EQ0ejBr/MAoVODbzcUSLRgRYYeGpUQLEoZGa0yY8O+oV0q0gN6LnQHRe/FqD1aQe9E6Jky4vehQogXUiE4lWsDcbjrGhAkxomMPVvCGhnMPVsyhcRv8gEN59GDFKNTfgc83mFcPVoyruAt6vsG8S7TQvIppv17sGVAdUBL26MGTx+bnVuHON1ivHjz61vzcn3DnG6xviRoBN0/hDjhU3xI1Aq4fwh1wqFFK9HvCV9BzVftiBNwmvNCM0oPrhK/gKGNiK74HpZeo/B5MuERHmYPbhG8yo4wJ8T0ocVUzxsQm4R4Uv6pxTFhwVUsFx4TFzHoQpUS5qtXm1YPix4T8VU16icofE9J7kGMionGe6KUHFL+qpfxEzx60mNmYQOlBlmhtZqtawiXKly8W8+pBiS9fzIAJ96D4VY1jwoKrWio4Jixm1oMoJcpVrTavHpS4qvHlSyo4Jiy4qqWCY8KCL19SIf6Jnj1oMa8xwVUtIq5qFjBjgi9fLObVgzCrGl++1GBWNY4Ji3mtanyij4g9aAGzqn307EGYMXEnvQeN26HEly9KLXqVKMwTvWomlPhEn6sTun8GZkycfCW8d/4IzKpW8E8Is6qVvBNC9WDONyFWD+Y8E8KsajW/hDCrWoNXQrgezPkkBBsTJY+ESKtag3tCyBJVHgnxxkTJNSFmD+YcE8L8J+U2t4SoPZhzSgjz8uUSl4SAq1qDQ0LEVa2hOyHsmCh1JsQdE6WuhGhP9G11wv2qbW8EBBsTpYV2BtiDOfeEcGOi5JwQa1VrcE2I2YM5x4Rpv3y56tCdTiM90bfd3ruUKO4VVE4XEbcHC7t1R8B/sU843NPdFQhfoEVERETdVo+LoD5jf5th1rG0jeBv1M19goDH3T1iwP0UAbU+xEv4OU3CiM8n79Mk9PjT1bHtuk83hohfLPqwmSRhzKfMSW41rxEDHp/wPzY3Qa0z/p6AiIiIiIiIiIiIiIiE+w/qvDIZVZVhBwAAAABJRU5ErkJggg=="
                alt="edit"
                className="edit"
                onClick={(e) => setEditName(true)}
              />
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {editName && (
              <>
                <TextField
                  onChange={(event) => setTripName(event.target.value)}
                  value={tripName}
                  margin="normal"
                  fullWidth
                  id=""
                  label="Trip Name"
                  name=""
                />
                <button onClick={(e) => setEditName(false)}>
                  Confirm edit trip name
                </button>
              </>
            )}
            <Link to="#yelpMap">
              <Button
                type="button"
                fullWidth
                variant="outlined"
                onClick={(event) => setEditBarsforTrip(true)}
                sx={{ mt: 3, mb: 2 }}
              >
                {" "}
                Edit Locations{" "}
              </Button>
            </Link>
            <TextField
              margin="normal"
              fullWidth
              id="outlined-multiline-static"
              multiline
              label="Description"
              name=""
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            {!addLocation && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {" "}
                Confirm Edit{" "}
              </Button>
            )}
          </Box>
          {addLocation && (
            <>
              <Box ref={locationsMapRef} sx={{ p: 2 }}>
                <AddLocation />
              </Box>
              <br></br>
              <Button
                type="submit"
                color="error"
                variant="contained"
                sx={{ mt: 6, mb: 2, pl: 16, pr: 16 }}
                onClick={(e) => {
                  setAddLocation(false);
                  setEditBarsforTrip(true);
                }}
              >
                {" "}
                Back to edit{" "}
              </Button>
            </>
          )}

          {
            /* prettier-ignore */ (editBarsforTrip && notFinishEdit) && (
            <>
              <div ref={editLocationMapRef}>
                <EditBars />
              </div>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  setAddLocation(true);
                  setEditBarsforTrip(false);
                }}
              >
                {" "}
                Add more bars to trip+{" "}
              </Button>
            </>
          )
          }
        </Box>
      </Container>
    </ThemeProvider>
  );
}
