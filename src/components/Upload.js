import React from "react";
import AudioRecorder from "./AudioRecorder";

function Upload() {
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
                <strong>Upload/Record</strong>: Click "Upload" or "Record" to
                the right. Ensure the clip is 3-5 minutes (max 15 minutes).
              </li>
              <li>
                <strong>Check Quality</strong>: Play back the recording to
                confirm good audio quality.
              </li>
              <li>
                <strong>Speakers</strong> (Optional): Specify the number of
                different speakers.
              </li>
              <li>
                <strong>Submit</strong>: Click "Submit" to finalize.
              </li>
            </ul>
          </div>
        </div>

        {/* ********************************************************* */}

        <div className="upload">
          <div className="upload-content">
            <h2>Submit Audio</h2>
            <p>
              <i>
                Upload from computer, start a new recording or upload existing
                files
              </i>
            </p>
            <div style={{ marginTop: "20px" }} className="diff-options">
              <form className="file-upload-form">
                <label htmlFor="file" className="file-upload-label">
                  <div className="file-upload-design">
                    <svg viewBox="0 0 640 512" height="1em">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                    </svg>
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button">Browse file</span>
                  </div>
                  <input id="file" type="file" />
                </label>
              </form>

              <AudioRecorder />

              <div style={{ margin: "20px" }} className="d-flex flex-column">
                <div style={{ margin: "10px" }} className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Upload Existing Audio
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/">
                        Audio 1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Audio 2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Audio 3
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "20px" }} className="d-flex">
              <div className="InputContainer">
                <input
                  placeholder="Speakers"
                  id="input"
                  className="input"
                  name="text"
                  type="text"
                />
              </div>
              <button className="submit startstop">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;
