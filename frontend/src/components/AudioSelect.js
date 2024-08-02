import React, { useMemo } from "react";
import { useLocation, useNavigate, useHref } from "react-router-dom";

function AudioSelect() {
  const navigate = useNavigate();
  const analyzePath = useHref("/api/analyze");
  const { state: { audios } } = useLocation();
  const checked = useMemo(() => audios ? new Array(audios.length).fill(false) : [], [audios]);

  const submit = async (data) => {
    const response = await fetch(analyzePath, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      alert("Something went wrong. Please try again later.")
      return;
    }

    const results = await response.json();
    navigate("/result", { state: { results } });
  }

  const handleClear = () => {
    navigate("/upload");
  };

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
                <strong>Select Relevant Chunks:</strong> We have divided the
                uploaded recording into smaller segments. Please select the
                segments that contain your patient's speech to ensure the
                analysis focuses solely on their speech.
              </li>
              <li>
                <strong>Submit for Analysis:</strong> After selecting the
                relevant chunks, scroll and press the "Submit" button.
              </li>
              <li>
                <strong>Generate Report:</strong> Your full report will be
                generated once you complete this step.
              </li>
            </ul>
          </div>
        </div>

        {/* ********************************************************* */}

        <div className="upload">
          <div className="upload-content">
            <h2 style={{ marginBottom: "20px" }}>Assign Audio to Speaker </h2>

            {audios.map((data, i) =>
              <label key={i} className="cyberpunk-checkbox-label">
                <input type="checkbox" className="cyberpunk-checkbox" onClick={() => checked[i] = !checked[i]} />
                <div>
                  <div className="voice-chat-card">
                    <div className="voice-chat-card-body">
                      <div className="audio-container">
                        <span>
                          Section {i + 1}:
                          <audio style={{ width: "250px" }} controls>
                            <source src={data} type="audio/mp3" />
                            Your browser does not support the audio element.
                          </audio>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            )}

            <div className="d-flex">
              <button onClick={handleClear} className="submit startstop">
                Clear
              </button>
              <button onClick={() => submit(audios.filter((_, i) => checked[i]))} className="submit startstop">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AudioSelect;
