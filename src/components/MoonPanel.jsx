import React from 'react';
import { moonData } from '../data/moons';

const MoonPanel = ({ planetName }) => {
    const missions = moonData[planetName]?.missions || [];

    return (
        <div className="panel moon-panel">
            <h3>Moons & Mission Intel</h3>
            {missions.length === 0 ? (
                <p style={{ opacity: 0.6 }}>No major moon missions or satellites recorded for analysis in this database.</p>
            ) : (
                <div className="mission-list">
                    {missions.map((mission, idx) => (
                        <a
                            key={idx}
                            href={mission.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mission-card-link"
                            title="Click to view mission details"
                        >
                            <div className="mission-card">
                                <div className="mission-header">
                                    <span className="moon-name">{mission.name}</span>
                                    <span className="agency-tag">{mission.agency}</span>
                                </div>
                                <div className="mission-details">
                                    <strong>{mission.mission}</strong> ({mission.year})
                                    <p>{mission.findings}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}

            <style>{`
        .mission-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-height: 300px;
          overflow-y: auto;
        }
        .mission-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: transform 0.2s;
        }
        .mission-card-link:hover {
          transform: translateX(5px);
        }
        .mission-card {
          background: rgba(255,255,255,0.05);
          border-left: 3px solid #00aaff;
          padding: 10px;
          border-radius: 0 4px 4px 0;
          transition: background 0.2s;
        }
        .mission-card-link:hover .mission-card {
            background: rgba(0, 170, 255, 0.15);
            border-left-color: #ffffff;
        }
        .mission-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        .moon-name { font-weight: bold; color: #00aaff; }
        .agency-tag { background: #333; padding: 2px 6px; border-radius: 4px; font-size: 0.7em; }
        .mission-details p { margin: 5px 0 0; font-size: 0.85em; opacity: 0.8; }
      `}</style>
        </div>
    );
};

export default MoonPanel;
