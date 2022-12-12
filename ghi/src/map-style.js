// const MAX_ZOOM_LEVEL = 9;

export const heatmapLayer = {
  id: "bar-heat",
  type: "heatmap",
  maxzoom: 15,
  paint: {
    // Increase the heatmap weight based on popularity and property hour of day
    "heatmap-weight": [
      "interpolate",
      ["linear"],
      ["get", "hour"],
      1,
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
    ],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 9, 12, 14, 8],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(33,102,172,0)",
      0.1,
      "rgb(127, 103, 207)",
      0.4,
      "rgb(245, 183, 49)",
      0.5,
      "rgb(252, 138, 88)",
      0.6,
      "rgb(242, 81, 56)",
      1,
      "rgb(250, 69, 32)",
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 10, 12, 13, 14],
    // Transition from heatmap to circle layer by zoom level
    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 10, 3, 12, 1],
  },
};

export const circleLayer = {
  id: "popular-point",
  type: "circle",
  paint: {
    // Size circle radius by bar popularity and zoom level
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      10,
      ["interpolate", ["linear"], ["get", "hour"], 1, 2, 3, 4, 5, 7],
      13,
      ["interpolate", ["linear"], ["get", "hour"], 2, 5, 7, 8, 10, 20],
    ],
    // Color circle by bar popularity
    "circle-color": [
      "interpolate",
      ["linear"],
      ["get", "hour"],
      1,
      "rgb(0,0,0)",
      10,
      "rgb(253,255,0)",
      20,
      "rgb(214,216,25)",
      30,
      "rgb(223,200,34)",
      40,
      "rgb(223,200,34)",
      50,
      "rgb(255,180,0)",
      60,
      "rgb(253,166,0)",
      70,
      "rgb(253,133,0)",
      80,
      "rgb(255,80,0)",
      90,
      "rgb(255,0,0)",
    ],
    "circle-stroke-color": "white",
    "circle-stroke-width": 1,
    // Transition from heatmap to circle layer by zoom level
    "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
  },
};
