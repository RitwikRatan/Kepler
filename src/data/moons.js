export const moonData = {
    Earth: {
        moons: [
            { name: "The Moon", size: 0.27, distance: 3.5, speed: 0.5, color: "#aaaaaa" }
        ],
        missions: [
            {
                name: "The Moon",
                mission: "Apollo 11",
                agency: "NASA",
                type: "Manned Landing",
                year: 1969,
                findings: "First human landing. Confirmed lunar regolith composition and lack of atmosphere.",
                url: "https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html"
            },
            {
                name: "The Moon",
                mission: "Chandrayaan-3",
                agency: "ISRO",
                type: "Rover/Lander",
                year: 2023,
                findings: "Successful soft landing near South Pole. Detected sulphur and plasma environment.",
                url: "https://www.isro.gov.in/Chandrayaan3.html"
            }
        ]
    },
    Mars: {
        moons: [
            { name: "Phobos", size: 0.15, distance: 2.2, speed: 1.2, color: "#887766" },
            { name: "Deimos", size: 0.1, distance: 3.5, speed: 0.8, color: "#998877" }
        ],
        missions: [
            {
                name: "Phobos",
                mission: "Mars Express",
                agency: "ESA",
                type: "Orbiter",
                year: 2003,
                findings: "Detailed mapping suggests Phobos is a captured asteroid or debris from impact.",
                url: "https://www.esa.int/Science_Exploration/Space_Science/Mars_Express"
            },
            {
                name: "Deimos",
                mission: "Viking 1",
                agency: "NASA",
                type: "Orbiter",
                year: 1976,
                findings: "Provided first high-res images of Deimos, showing smooth dust-covered surface.",
                url: "https://nssdc.gsfc.nasa.gov/planetary/viking.html"
            }
        ]
    },
    Jupiter: {
        moons: [
            { name: "Europa", size: 0.24, distance: 4.5, speed: 0.6, color: "#dbe3e8" },
            { name: "Ganymede", size: 0.41, distance: 6.0, speed: 0.4, color: "#958872" },
            { name: "Io", size: 0.28, distance: 3.2, speed: 0.8, color: "#e3dccb" }
        ],
        missions: [
            {
                name: "Europa",
                mission: "Galileo",
                agency: "NASA",
                type: "Orbiter",
                year: 1995,
                findings: "Strong evidence of subsurface saltwater ocean. Potential habitability.",
                url: "https://solarsystem.nasa.gov/missions/galileo/overview/"
            },
            {
                name: "Ganymede",
                mission: "Juno",
                agency: "NASA",
                type: "Orbiter",
                year: 2011,
                findings: "First close flybys of Ganymede's north pole. Mapping magnetic fields.",
                url: "https://www.nasa.gov/mission_pages/juno/main/index.html"
            }
        ]
    },
    Saturn: {
        moons: [
            { name: "Titan", size: 0.4, distance: 5.5, speed: 0.3, color: "#e3bb76" },
            { name: "Enceladus", size: 0.15, distance: 3.0, speed: 0.7, color: "#ffffff" }
        ],
        missions: [
            {
                name: "Titan",
                mission: "Cassini-Huygens",
                agency: "NASA/ESA",
                type: "Lander (Huygens)",
                year: 2005,
                findings: "Landed on Titan. Revealed methane lakes, thick atmosphere, and prebiotic chemistry.",
                url: "https://solarsystem.nasa.gov/missions/cassini/overview/"
            },
            {
                name: "Enceladus",
                mission: "Cassini",
                agency: "NASA",
                type: "Orbiter",
                year: 2004,
                findings: "Discovered water geysers erupting from south pole. Ocean confirmed beneath ice.",
                url: "https://solarsystem.nasa.gov/missions/cassini/overview/"
            }
        ]
    },
    Mercury: { moons: [], missions: [] },
    Venus: { moons: [], missions: [] },
    Uranus: {
        moons: [
            { name: "Miranda", size: 0.18, distance: 3.0, speed: 0.6, color: "#cccccc" }
        ],
        missions: [
            {
                name: "Miranda",
                mission: "Voyager 2",
                agency: "NASA",
                type: "Flyby",
                year: 1986,
                findings: "Discovered chaotic terrain, suggesting past geologic activity or impact.",
                url: "https://voyager.jpl.nasa.gov/"
            }
        ]
    },
    Neptune: {
        moons: [
            { name: "Triton", size: 0.27, distance: 4.0, speed: 0.4, color: "#ddccff" }
        ],
        missions: [
            {
                name: "Triton",
                mission: "Voyager 2",
                agency: "NASA",
                type: "Flyby",
                year: 1989,
                findings: "Retrograde orbit. Active nitrogen geysers. Likely a captured Kuiper Belt Object.",
                url: "https://voyager.jpl.nasa.gov/"
            }
        ]
    }
};
