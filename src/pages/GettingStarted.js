import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function GettingStarted() {
  const navigate = useNavigate();

  const goToRecordingSession = () => {
    navigate('/recordingsession');
  };

  return (
    <div className="App">
    <nav>
        <ul>
        <li><Link to="/">home</Link></li>
        </ul>
    </nav>
      <header className="App-header">
        <h1>getting started</h1>
        <button onClick={goToRecordingSession}>start recording</button>
      </header>
    </div>
  );
}

export default GettingStarted;
