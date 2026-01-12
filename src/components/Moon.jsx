import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const Moon = ({ name, size, distance, speed, color }) => {
    const meshRef = useRef();
    const groupRef = useRef();
    const [hovered, setHover] = useState(false);

    // Random initial start angle so moons aren't all aligned
    const initialAngle = useRef(Math.random() * Math.PI * 2).current;

    useFrame((state) => {
        // Orbit logic
        const t = state.clock.getElapsedTime() * speed + initialAngle;
        const x = Math.cos(t) * distance;
        const z = Math.sin(t) * distance;

        if (groupRef.current) {
            groupRef.current.position.set(x, 0, z);
        }

        // Self rotation
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <>
            {/* Orbit Path for Moon */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[distance - 0.02, distance + 0.02, 32]} />
                <meshBasicMaterial color={color} opacity={0.15} transparent side={THREE.DoubleSide} />
            </mesh>

            <group ref={groupRef}>
                <mesh
                    ref={meshRef}
                    onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
                    onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
                >
                    <sphereGeometry args={[size, 16, 16]} />
                    <meshStandardMaterial color={color} roughness={0.8} />
                </mesh>

                {hovered && (
                    <Html position={[0, size + 0.5, 0]}>
                        <div style={{
                            background: 'rgba(0,0,0,0.8)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.8em',
                            whiteSpace: 'nowrap',
                            color: 'white',
                            border: `1px solid ${color}`
                        }}>
                            {name}
                        </div>
                    </Html>
                )}
            </group>
        </>
    );
};

export default Moon;
