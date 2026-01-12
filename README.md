# KEPLER / SIDEREAL - Planetary Habitation & Age Analysis System

**KEPLER / SIDEREAL** is a state-of-the-art interactive web application designed to simulate and analyze our Solar System with a focus on planetary habitability and relativistic age calculations. 

Combining high-fidelity 3D visualizations with machine learning-driven analytics, this system offers users an immersive experience to explore planets, moons, and the potential for human life beyond Earth.

## 🚀 Features

### 🌌 Interactive 3D Solar System
- **Real-time Visualization**: Built with **React Three Fiber** and **Three.js**, offering a stunning, interactive view of the solar system.
- **Planetary Exploration**: Seamlessly check out planets and their moons with realistic textures, lighting, and orbits.
- **Cinematic Experience**: Implements post-processing effects (Bloom, Depth of Field) for a mission-grade visual aesthetic.

### 🧠 AI-Powered Habitability Analysis
- **Machine Learning Core**: Integrated Python-based ML module (using Scikit-learn) to predict planetary habitability.
- **Data-Driven Insights**: Analyzes key metrics like atmospheric composition, planet type, and environmental data to generate "Habitability Scores".
- **Telemetry & Simulation**: Mock mission data and telemetry dashboards for an authentic command-center feel.

### ⏳ Age Relativity Calculator
- **Time Dilation Engine**: Calculate your age on different celestial bodies based on their orbital periods.
- **Comparative Analysis**: instantly compare how time passes on Earth versus Mars, Jupiter, or customized relativistic scenarios.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **3D Engine**: @react-three/fiber, @react-three/drei
- **Styling**: Tailwind CSS, Framer Motion
- **Language**: JavaScript (ESModules)

### Backend / ML Integration
- **Runtime**: Python 3.x
- **Libraries**: Scikit-learn, Pandas, NumPy, Flask (for API serving)
- **Model**: Custom Random Forest/Ensemble models trained on exoplanet datasets.

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/RitwikRatan/Kepler.git
   cd Kepler
   ```

2. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```

3. **ML Module Setup**
   Navigate to the `ml` directory and install dependencies:
   ```bash
   cd ml
   pip install -r requirements.txt
   python app.py
   ```

## 🔭 Usage
- Navigate through the solar system using mouse controls (Orbit, Zoom, Pan).
- Click on any planet to view detailed statistics and moons.
- Use the **Analytic Dashboard** on the left to run habitability predictions.
- Access the **Age Calculator** to see your relativistic age across the cosmos.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements.

---
*Developed by Ritwik Ratan*
