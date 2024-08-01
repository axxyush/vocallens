import Plot from "react-plotly.js";

function MuscleChart({ data }) {
  const activations = [
    { label: "Tongue", x: 175, y: 220, z: .8 },
    { label: "Genioglossus", x: 150, y: 175, z: .6 },
    { label: "Hyoglossus", x: 215, y: 180, z: .5 },
    { label: "Palatoglossus", x: 225, y: 225, z: .2 },
    { label: "Styloglossus", x: 250, y: 240, z: .3 },
  ];

  const DATA = [
    {
      x: activations.map(point => point.x),
      y: activations.map(point => point.y),
      text: activations.map(point => point.label + ": " + point.z),
      hoverinfo: "text",
      mode: "markers",
      marker: {
        size: activations.map(point => 15 + point.z * 15),
        color: activations.map(point => point.z),
        colorscale: "Rainbow",
        cmin: 0,
        cmax: 1,
      },
      type: "scatter",
    },
  ];

  const LAYOUT = {
    autosize: true,
    zoom: false,
    margin: {
      t: 0,
      b: 0,
      l: 0,
      r: 0,
    },
    yaxis: {
      range: [0, 400],
      fixedrange: true,
      showgrid: false,
      zeroline: false,
    },
    xaxis: {
      range: [0, 400],
      fixedrange: true,
      showgrid: false,
      zeroline: false,
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
  };

  const CONFIG = {
    displayModeBar: false,
    responsive: true,
  };

  return (
    <div style={{ height: 250, width: 250 }}>
      <img src="mouth.jpg" height={250} width={250} style={{ position: "absolute" }} alt="Muscle histogram" />
      <Plot data={DATA} layout={LAYOUT} config={CONFIG} style={{ height: 250, width: 250, position: "absolute" }} />
    </div>
  );
}

export default MuscleChart;

