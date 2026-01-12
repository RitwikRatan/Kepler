import React, { useState, useEffect } from 'react';
import AgeCalculator from './AgeCalculator';
import HabitabilityPanel from './HabitabilityPanel';
import MoonPanel from './MoonPanel';

const HUD = ({ selectedPlanet, onBack }) => {
  const [dob, setDob] = useState('');
  const [earthAgeDays, setEarthAgeDays] = useState(0);

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const now = new Date();
      const diffTime = Math.abs(now - birthDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setEarthAgeDays(diffDays);
    }
  }, [dob]);

  if (!selectedPlanet) {
    return (
      <div className="hud-overlay">
        <div className="header">
          <h1>KEPLER / SIDEREAL</h1>
          <p>Planetary Habitation & Age Analysis System</p>
        </div>
        <div className="instruction">
          <p>Select a planet to begin analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hud-overlay detail-view">
      <button className="back-btn" onClick={onBack}>← Back to Solar System</button>

      <div className="left-panel">
        <h1>{selectedPlanet.name}</h1>
        <p className="description">{selectedPlanet.detailedDescription || selectedPlanet.description}</p>

        <div className="travel-time-box">
          <strong>Travel Time from Earth:</strong>
          <span> {selectedPlanet.travelTime || 'Unknown'}</span>
        </div>

        <div className="input-group">
          <label>Enter Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{ padding: '8px', background: '#333', color: 'white', border: '1px solid #555' }}
          />
        </div>

        {dob && (
          <AgeCalculator
            earthAgeDays={earthAgeDays}
            planetYearLength={selectedPlanet.yearLength}
          />
        )}
      </div>

      <div className="right-panel">
        <HabitabilityPanel planetData={selectedPlanet.mlData} />
        <MoonPanel planetName={selectedPlanet.name} />
      </div>

      <style>{`
        .hud-overlay {
          position: absolute;
          top: 0; 
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          padding: 2rem;
          box-sizing: border-box;
          color: white;
          display: flex;
          flex-direction: column;
        }
        .hud-overlay * { pointer-events: auto; }
        .header { margin-bottom: 2rem; }
        .instruction { 
          position: absolute; 
          bottom: 10%; 
          width: 100%; 
          text-align: center; 
          animation: pulse 2s infinite; 
        }
        
        .detail-view {
          display: grid;
          grid-template-columns: 400px 1fr 400px;
          grid-template-rows: auto minmax(0, 1fr); /* minmax(0, 1fr) is crucial for nested scrolling */
          gap: 20px;
          padding-bottom: 40px; /* Extra padding at bottom to avoid navbar overlap */
        }
        .back-btn {
          grid-column: 1 / -1;
          justify-self: start;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 10px 20px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .left-panel, .right-panel {
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(12px);
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          overflow-y: auto;
          max-height: 100%;
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: rgba(255,255,255,0.3) transparent;
        }
        
        /* Custom Scrollbar for Webkit */
        .left-panel::-webkit-scrollbar, .right-panel::-webkit-scrollbar {
            width: 6px;
        }
        .left-panel::-webkit-scrollbar-track, .right-panel::-webkit-scrollbar-track {
            background: transparent;
        }
        .left-panel::-webkit-scrollbar-thumb, .right-panel::-webkit-scrollbar-thumb {
            background-color: rgba(255,255,255,0.3);
            border-radius: 20px;
        }
        .right-panel {
          grid-column: 3;
        }
        .left-panel {
          grid-column: 1;
        }
        
        .panel {
          border-top: 2px solid rgba(255,255,255,0.3);
          padding-top: 10px;
        }
        .status-badge {
          padding: 10px;
          text-align: center;
          font-weight: bold;
          border-radius: 4px;
          color: black;
          margin-bottom: 10px;
        }
        .data-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .data-item {
          display: flex;
          flex-direction: column;
        }
        .data-item label { opacity: 0.6; font-size: 0.8em; }
        
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default HUD;
