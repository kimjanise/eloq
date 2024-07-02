import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import RecordingSession from './pages/RecordingSession';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gettingstarted" element={<GettingStarted />} />
          <Route path="/recordingsession" element={<RecordingSession />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
