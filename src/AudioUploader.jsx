import React, { useState } from "react";
import axios from "axios";

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an audio file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscription(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to transcribe the audio file. Please try again.");
    }
  };

  //AudioUploader component renders a file input and a button to upload the audio file
  //It also displays the transcription result after the file is processed
  return (
    <div className="container">
      <h1>Audio to Text Transcriber</h1>
      <div>
        <input
          className="file-input"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <button onClick={handleUpload} className="upload-button">
          Upload and Transcribe
        </button>
      </div>
      <div className="transcription-result">
        <h2>Transcription Result</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default AudioUploader;
