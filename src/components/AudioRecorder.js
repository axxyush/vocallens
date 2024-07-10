import React, { useState, useRef } from "react";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [start, setStart] = useState("Start");
  const [recordingProgress, setRecordingProgress] = useState("hidden");
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
      setStart("Start");
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

  const handleSubmit = () => {
    if (!audioUrl) {
      alert("Record audio first");
    }
  };

  return (
    <>
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
        <div style={{ visibility: recordingProgress }} className="recording">
          Recording
          <div className="loader">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
        <button className="submit startstop" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default AudioRecorder;
