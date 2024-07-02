import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToGettingStarted = () => {
    navigate('/gettingstarted');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>eloq.</h1>
        <p>an ai-powered app for speech practice.</p>
        <button onClick={goToGettingStarted}>getting started</button>
      </header>
    </div>
  );
}

export default Home;
