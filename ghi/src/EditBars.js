import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Button from "@mui/material/Button";
import "./App.css";
import editLocation from "./app/editLocation";

function EditBars() {
  const [editedBars, setEditedBars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBarsInTrip = async () => {
      //get all the yelp bars added to database
      const url = "http://localhost:8001/bars";
      // const url = `http://localhost:8001/trips/${trip_id}/getbars`;
      const response = await fetch(url);
      const data = await response.json();
      setEditedBars(data);
    };

    fetchBarsInTrip();
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(editedBars);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEditedBars(items);
    console.log(editedBars);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Bars</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {editedBars.map(({ bar_id, bar_name, image_url }, index) => {
                  return (
                    <Draggable
                      draggableId={bar_id.toString()}
                      index={index}
                      key={bar_id}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="characters-thumb">
                            <img src={image_url} alt={`${bar_name} Thumb`} />
                          </div>
                          <p>{bar_name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <Button
        type="button"
        fullWidth
        variant="outlined"
        onClick={() => {
          dispatch(editLocation(editedBars));
        }}
        sx={{ mt: 3, mb: 2 }}
      >
        {" "}
        Finish Editing Locations{" "}
      </Button>
    </div>
  );
}

export default EditBars;
