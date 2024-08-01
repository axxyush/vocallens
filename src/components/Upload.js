import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [isRecording, setIsRecording] = useState(false);
  const [start, setStart] = useState("Record");
  const [recordingProgress, setRecordingProgress] = useState("hidden");
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioInputRef = useRef(null);
  const navigate = useNavigate();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStart("Recording...");
      setRecordingProgress("visible");
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    setStart("Re-Record");
    setRecordingProgress("hidden");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudioUrl(audioUrl);
      // Reset file input value to allow the same file to be selected again
      audioInputRef.current.value = null;
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudioUrl(audioUrl);
    }
  };

  const handleSubmit = () => {
    navigate("/audioselect");
  };

  return (
    <div className="upload-contain">
      <div className="instructions">
        <div className="instruct-content">
          <h2>
            <u>Instructions</u>
          </h2>
          <ul>
            <li>
              <strong>Upload/Record</strong>: Click "Upload" or "Record" to the
              right. Ensure the clip is 3-5 minutes (max 15 minutes).
            </li>
            <li>
              <strong>Check Quality</strong>: Play back the recording to confirm
              good audio quality.
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

      <div className="upload">
        <div className="upload-content">
          <h2>Submit Audio</h2>
          <p>
            <i>Upload from computer or start a new recording</i>
          </p>
          <div style={{ marginTop: "20px" }} className="diff-options">
            <form className="file-upload-form">
              <label
                htmlFor="file"
                className="file-upload-label"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="file-upload-design">
                  <svg viewBox="0 0 640 512" height="1em">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                  </svg>
                  <p>Drag and Drop</p>
                  <p>or</p>
                  <span className="browse-button">Browse file</span>
                </div>
                <input
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                  ref={audioInputRef}
                  onChange={handleFileChange}
                />
              </label>
            </form>

            <h4 style={{ marginLeft: "50px" }}>OR</h4>

            <div
              style={{
                textAlign: "center",
                margin: "10px",
                marginLeft: "35px",
              }}
            >
              <h5>Record Audio</h5>

              <button
                className="start startstop"
                onClick={startRecording}
                disabled={isRecording}
              >
                {start}
              </button>
              <button
                className="stop startstop"
                onClick={stopRecording}
                disabled={!isRecording}
              >
                Stop
              </button>

              {audioUrl && (
                <audio
                  src={audioUrl}
                  controls
                  style={{ display: "block", marginTop: "10px" }}
                />
              )}
              <div
                style={{ visibility: recordingProgress }}
                className="recording"
              >
                Recording
                <div className="loader">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "20px" }} className="d-flex flex-wrap gap-3">
            <div className="InputContainer">
              <input
                placeholder="Speakers"
                id="input"
                className="input"
                name="text"
                type="text"
              />
            </div>
            <button onClick={handleSubmit} className="submit startstop">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
