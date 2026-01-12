import React, { useState, useEffect } from 'react';

const AgeCalculator = ({ earthAgeDays, planetYearLength }) => {
    const [age, setAge] = useState(0);

    useEffect(() => {
        if (earthAgeDays && planetYearLength) {
            const planetAge = earthAgeDays / planetYearLength;
            setAge(planetAge);
        } else {
            setAge(0);
        }
    }, [earthAgeDays, planetYearLength]);

    return (
        <div className="age-calculator">
            <h3>Relative Age</h3>
            <div className="age-display">
                <span className="age-value">{age.toFixed(2)}</span>
                <span className="age-unit"> Years</span>
            </div>
            <div className="timeline-bar">
                {/* Visual bar could go here */}
            </div>
        </div>
    );
};

export default AgeCalculator;
