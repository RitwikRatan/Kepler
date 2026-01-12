import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Sun = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.05;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[3, 32, 32]} />
            <meshStandardMaterial
                emissive="#FFD700"
                emissiveIntensity={4}
                color="#FDB813"
                toneMapped={false}
            />
            <pointLight intensity={10} distance={100} decay={2} color="white" />
        </mesh>
    );
};

export default Sun;
