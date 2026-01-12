import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import Moon from './Moon';
import { moonData } from '../data/moons';

const Planet = forwardRef(({ name, size, distance, speed, color, hasRings, description, detailedDescription, travelTime, yearLength, siderealDay, mlData, isSelected, onSelect }, ref) => {
    const groupRef = useRef();

    // Expose the group ref to parent via the forwarded ref
    useImperativeHandle(ref, () => groupRef.current);
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);

    // Random initial orbit offset
    const initialAngle = useRef(Math.random() * Math.PI * 2).current;

    useFrame((state, delta) => {
        // Orbital rotation (parent group)
        const t = state.clock.getElapsedTime() * speed + initialAngle;
        const x = Math.cos(t) * distance;
        const z = Math.sin(t) * distance;
        groupRef.current.position.set(x, 0, z);

        // Self rotation
        meshRef.current.rotation.y += delta * 0.5;
    });

    return (
        <>
            {/* Orbit Path Visual */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[distance - 0.05, distance + 0.05, 64]} />
                <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
            </mesh>

            <group ref={groupRef}>
                <mesh
                    ref={meshRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect({ name, size, distance, speed, color, hasRings, description, detailedDescription, travelTime, yearLength, siderealDay, mlData });
                    }}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    <sphereGeometry args={[size, 32, 32]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={hovered ? 0.5 : 0.1}
                        roughness={0.7}
                        metalness={0.3}
                    />

                    {hasRings && (
                        <mesh rotation={[-Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[size * 1.4, size * 2.2, 32]} />
                            <meshStandardMaterial color={color} opacity={0.6} transparent side={THREE.DoubleSide} />
                        </mesh>
                    )}

                    {/* Render Moons if selected */}
                    {isSelected && moonData[name] && moonData[name].moons && moonData[name].moons.map((moon, idx) => (
                        <Moon key={idx} {...moon} />
                    ))}
                </mesh>

                {hovered && (
                    <Html distanceFactor={15}>
                        <div style={{
                            color: 'white',
                            background: 'rgba(0,0,0,0.8)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid ' + color,
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap'
                        }}>
                            {name}
                        </div>
                    </Html>
                )}
            </group>
        </>
    );
});

export default Planet;
