import React from "react";
import result from "./result.png";
import graph from "./graph.png";

function Result() {
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
            <img style={{ height: "90%" }} src={result} alt="result" />
            <div className="card" style={{ width: "20rem", margin: "10px" }}>
              <img
                style={{ border: "1px solid black", height: "200px" }}
                src={graph}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  SLI Probabilty: <b>15.3%</b>
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
