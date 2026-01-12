import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Sun from './Sun';
import Planet from './Planet';
import { solarSystemData } from '../data/solarSystem';

const CameraController = ({ selectedPlanet, planetRefs }) => {
    const { camera, controls } = useThree();
    const defaultPos = new THREE.Vector3(0, 20, 40);
    const targetPos = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state, delta) => {
        if (selectedPlanet && planetRefs.current[selectedPlanet.name]) {
            const planetGroup = planetRefs.current[selectedPlanet.name];
            // Target position: Planet position + offset
            // We want to view from a bit above and side
            const pPos = planetGroup.position;
            const offset = new THREE.Vector3(selectedPlanet.size * 3 + 5, selectedPlanet.size * 2 + 2, selectedPlanet.size * 3 + 5);

            const desiredCamPos = pPos.clone().add(offset);

            // Smoothly move camera
            easing.damp3(camera.position, desiredCamPos, 0.5, delta);
            // Smoothly look at planet
            easing.damp3(targetPos.current, pPos, 0.5, delta);
            camera.lookAt(targetPos.current);
        } else {
            // Return to default
            easing.damp3(camera.position, defaultPos, 1.5, delta);
            easing.damp3(targetPos.current, new THREE.Vector3(0, 0, 0), 1.5, delta);
            camera.lookAt(targetPos.current);
        }
    });
    return null;
};

const Scene = ({ selectedPlanet, onSelectPlanet }) => {
    const planetRefs = useRef({});

    return (
        <>
            <CameraController selectedPlanet={selectedPlanet} planetRefs={planetRefs} />
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={500} scale={100} size={1} speed={0.4} opacity={0.1} />

            <ambientLight intensity={0.1} />
            <pointLight position={[0, 0, 0]} intensity={2} decay={0} distance={1000} color="#ffaa00" />

            <Sun />

            {solarSystemData.map((planet) => (
                <Planet
                    key={planet.name}
                    {...planet}
                    isSelected={selectedPlanet?.name === planet.name}
                    onSelect={onSelectPlanet}
                    ref={(el) => (planetRefs.current[planet.name] = el)}
                />
            ))}

            <EffectComposer>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
            </EffectComposer>
        </>
    );
};

export default Scene;
