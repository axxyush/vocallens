import React from "react";
import { useLocation } from "react-router-dom";
import { smooth, transpose } from "../util";
import LineChart from "./LineChart";
import BiomarkerChart from "./BiomarkerChart";
import MuscleChart from "./MuscleChart";

function Result() {
  const { state: { results } } = useLocation();

  const TABLE_DATA = [
    ["Duration", results.duration.toFixed(1) + "s"],
    ["Correct Phones", (results.ce.match(/C/g)?.length ?? 0) + "p"],
    ["Incorrect Phones", (results.ce.match(/E/g)?.length ?? 0) + "p"],
    ["Speech Rate", (results.ce.length / results.duration).toFixed(1) + "p/s"],
    ["Block Period", "?s/b"],
    ["Repetition Period", "?s/r"],
  ];

  const features = transpose(results.features);
  const formant = features.slice(0, 3).map((y, i) => ({ y: smooth(y), name: "F" + (i + 1) }));
  const bandwidth = [{ y: smooth(features[23]), name: "Bandwidth" }];
  const gop = [{ y: smooth(features[24]), name: "GOP" }];

  return (
    <>
      <div className="upload-contain">
        <div className="instructions">
          <div className="instruct-content">
            <h2>
              <u>Instructions</u>
            </h2>

            <ul>
              <li>
                Your report details are available to the right. Review them
                carefully.
              </li>
              <li>Press the "Exit" button when you are finished reviewing.</li>
              <li>
                You can revisit this report later through the "Report" tab on
                the menu bar.
              </li>
            </ul>

            <h3>
              <u>Biomakers</u>
            </h3>

            <ul style={{ marginBottom: "50px" }}>
              <li>
                <strong>MPD</strong> - Mispronunciation Density: Indicates rate
                of mispronunciation.
              </li>
              <li>
                <strong>NTC</strong> - Norm. Transition Count: Indicates rate of
                pronunciation change.
              </li>
              <li>
                <strong>LCE</strong> - Longest Common Error: Indicates length of
                longest incorrect phone sequence.
              </li>
              <li>
                <strong>LCC</strong> - Longest Common Correct: Indicates length
                of longest correct phone sequence.
              </li>
              <li>
                <strong>ACE</strong> - Average Common Error: Indicates average
                length of incorrect phone sequence.
              </li>
              <li>
                <strong>ACC</strong> - Average Common Correct: Indicates average
                length of correct phone sequence.
              </li>
            </ul>
          </div>
        </div>

        {/* ********************************************************* */}

        <div className="upload">
          <div className="upload-content-result">
            <div style={{ flex: 1, paddingRight: "3rem" }}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <table style={{ border: "1px solid black" }}>
                  <tbody>
                    {TABLE_DATA.map(([key, value], i) =>
                      <tr style={{ background: (i % 2) ? "lightgrey" : "white" }} key={i}>
                        <td style={{ paddingLeft: 10, paddingRight: 50 }}>{key}</td>
                        <td style={{ paddingRight: 10, textAlign: "right" }}>{value}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <MuscleChart />
              </div>
              <div style={{ display: "flex", gap: "3rem", height: 350 }}>
                <LineChart data={formant} xtitle="Phoneme" ytitle="Formant (Hz)" />
                <LineChart data={bandwidth} xtitle="Phoneme" ytitle="Spectral Bandwidth (Hz)" />
                <LineChart data={gop} xtitle="Phoneme" ytitle="Goodness of Pronunciation (GOP)" />
              </div>
            </div>
            <div className="card" style={{ width: "20rem", margin: "10px" }}>
              <BiomarkerChart data={results.biomarkers} />
              <div className="card-body">
                <h5 className="card-title">
                  SLI Probabilty: <b>{(results.sli_proba * 100).toFixed(2)}%</b>
                </h5>
                <p className="card-text">
                  The first positive sample demonstrated elevated MPD and ACE,
                  significantly differing from the TD group's averages. This
                  sample also showed lower scores in LCC and ACC, pointing to
                  more frequent and pronounced errors in speech production.
                </p>
                <a href="/upload" className="btn btn-primary">
                  Save & Exit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
