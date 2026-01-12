import React, { useState, useEffect } from 'react';

const HabitabilityPanel = ({ planetData }) => {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!planetData) return;

        const fetchPrediction = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(planetData),
                });

                if (!response.ok) throw new Error('Prediction failed');

                const data = await response.json();
                console.log('ML Prediction:', data);
                setPrediction(data.habitability);
            } catch (err) {
                console.error(err);
                setError("ML Offline");
            } finally {
                setLoading(false);
            }
        };

        fetchPrediction();
    }, [planetData]);

    const getStatusColor = (status) => {
        if (status === 'Habitable') return '#00ff00';
        if (status === 'Conditionally Habitable') return '#ffaa00';
        return '#ff0000';
    };

    return (
        <div className="panel habitability-panel">
            <h3>Habitability Analysis</h3>
            {loading && <div>Analyzing...</div>}
            {error && <div style={{ color: 'red' }}>{error} - Ensure ML Server is running</div>}
            {prediction && (
                <div className="prediction-result" style={{
                    borderLeft: `4px solid ${getStatusColor(prediction)}`,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
                    padding: '10px 15px',
                    marginBottom: '15px'
                }}>
                    <div className="status-header" style={{
                        color: getStatusColor(prediction),
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                        textShadow: `0 0 10px ${getStatusColor(prediction)}`,
                        fontSize: '1.1em',
                        marginBottom: '4px'
                    }}>
                        {prediction.toUpperCase()}
                    </div>
                    <p style={{ opacity: 0.7, fontSize: '0.85em', margin: 0 }}>
                        Analysis based on Mass, Radius, Temp, and Atmosphere data.
                    </p>
                </div>
            )}

            <div className="data-grid">
                <div className="data-item">
                    <label>Temp</label>
                    <span>{planetData.Surface_Temp_K} K</span>
                </div>
                <div className="data-item">
                    <label>Gravity</label>
                    <span>{planetData.Gravity_g} g</span>
                </div>
                <div className="data-item">
                    <label>Atmosphere</label>
                    <span>{planetData.Atmosphere_Type}</span>
                </div>
            </div>
        </div>
    );
};

export default HabitabilityPanel;
