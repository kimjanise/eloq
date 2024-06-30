import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [liveWPM, setLiveWPM] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            transcriptRef.current += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        const words = (transcriptRef.current.trim() + ' ' + interimTranscript.trim()).split(/\s+/).length;
        const durationInMinutes = (Date.now() - startTime) / 1000 / 60;
        setLiveWPM(Math.round(words / durationInMinutes));
      };
    } else {
      alert('Your browser does not support the Web Speech API.');
    }
  }, [startTime]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const durationInMinutes = (Date.now() - startTime) / 1000 / 60;
      const words = transcriptRef.current.trim().split(/\s+/).length;
      const avgWPM = Math.round(words / durationInMinutes);
      setRecordings((prevRecordings) => [
        ...prevRecordings,
        { url: audioUrl, date: new Date().toLocaleString(), avgWPM },
      ]);
      audioChunksRef.current = [];
      transcriptRef.current = '';
      setLiveWPM(0);
    };

    mediaRecorderRef.current.start();
    recognitionRef.current.start();
    setStartTime(Date.now());
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    recognitionRef.current.stop();
    setIsRecording(false);
  };

  const clearRecordings = () => {
    setRecordings([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>eloq.</h1>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {isRecording && <p>Live WPM: {liveWPM}</p>}
        <div>
          <h3>history</h3>
          <ul>
            {recordings.map((recording, index) => (
              <li key={index}>
                <audio controls src={recording.url}></audio>
                <p>{recording.date} - Average WPM: {recording.avgWPM}</p>
              </li>
            ))}
          </ul>
          <button onClick={clearRecordings}>clear</button>
        </div>
      </header>
    </div>
  );
}

export default App;
