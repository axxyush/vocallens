import Plot from "react-plotly.js";

function LineChart({ data, xtitle, ytitle }) {
  data.forEach((d) => {
    d.line = { color: "#005BBB" };
  });

  const layout = {
    xaxis: {
      title: {
        text: xtitle,
        font: { family: "Arial" },
      },
    },
    yaxis: {
      title: {
        text: ytitle,
        font: { family: "Arial" },
      },
      range: [0, null],
    },
    autosize: true,
    showlegend: false,
    margin: {
      t: 50,
      b: 50,
      l: 50,
      r: 10,
    },
    annotations: data.map((d) => ({
      x: d.y.length,
      y: d.y[d.y.length - 1],
      xanchor: "middle",
      yanchor: "middle",
      text: d.name,
      font: { family: "Arial" },
      showarrow: false,
    })),
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default LineChart;

