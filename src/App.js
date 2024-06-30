import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordings((prevRecordings) => [
        ...prevRecordings,
        { url: audioUrl, date: new Date().toLocaleString() },
      ]);
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const clearRecordings = () => {
    setRecordings([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Voice Memo Website</h1>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <div>
          <h2>Recordings</h2>
          <ul>
            {recordings.map((recording, index) => (
              <li key={index}>
                <audio controls src={recording.url}></audio>
                <p>{recording.date}</p>
              </li>
            ))}
          </ul>
          <button onClick={clearRecordings}>Clear Recordings</button>
        </div>
      </header>
    </div>
  );
}

export default App;
