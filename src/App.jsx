import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Loader } from '@react-three/drei';
import Scene from './components/Scene';
import HUD from './components/HUD';
import './index.css';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <>
      <Canvas
        camera={{ position: [0, 20, 40], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, toneMappingExposure: 1.5 }}
      >
        <color attach="background" args={['#050505']} />
        <Suspense fallback={null}>
          <Scene selectedPlanet={selectedPlanet} onSelectPlanet={setSelectedPlanet} />
        </Suspense>
        <OrbitControls
          makeDefault
          enabled={!selectedPlanet} // Disable regular controls when focused? Or just let user override.
          maxDistance={200}
          minDistance={5}
        />
      </Canvas>
      <HUD selectedPlanet={selectedPlanet} onBack={() => setSelectedPlanet(null)} />
      <Loader />
    </>
  );
}

export default App;
