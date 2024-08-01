import Plot from "react-plotly.js";

function BiomarkerChart({ data }) {
  const biomarkers = ["MPD", "NTC", "LCC", "ACC", "LCE", "ACE", "MPD"];

  const mean_positive = {
    "MPD": 0.545,
    "NTC": 0.563,
    "LCC": 0.306,
    "ACC": 0.321,
    "LCE": 0.151,
    "ACE": 0.357,
  };
  const mean_negative = {
    "MPD": 0.400,
    "NTC": 0.593,
    "LCC": 0.404,
    "ACC": 0.451,
    "LCE": 0.116,
    "ACE": 0.232,
  };

  const DATA = [
    {
      type: "scatterpolar",
      r: biomarkers.map(b => mean_positive[b]),
      theta: biomarkers,
      hovertemplate: "%{theta}: %{r}",
      fill: "toself",
      name: "Mean SLI",
      marker: {
        color: "coral",
      },
    },
    {
      type: "scatterpolar",
      r: biomarkers.map(b => mean_negative[b]),
      theta: biomarkers,
      hovertemplate: "%{theta}: %{r}",
      fill: "toself",
      name: "Mean TD",
      marker: {
        color: "skyblue",
      },
    },
    {
      type: "scatterpolar",
      r: biomarkers.map(b => data[b]),
      theta: biomarkers,
      hovertemplate: "%{theta}: %{r}",
      name: "Sample",
      marker: {
        color: "green",
      },
    },
  ];

  const layout = {
    polar: {
      radialaxis: {
        range: [0, 1],
      },
    },
    autosize: true,
    margin: {
      t: 50,
      b: 50,
      l: 50,
      r: 50,
    },
    legend: {
      xanchor: "right",
    },
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  return (
    <Plot
      data={DATA}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default BiomarkerChart;

