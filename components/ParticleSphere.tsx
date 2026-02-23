'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function ParticleSystem() {
    const pointsRef = useRef<THREE.Points>(null!);
    const { theme } = useTheme();

    // Generate sphere particle positions
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(5000 * 3);

        for (let i = 0; i < 5000; i++) {
            // Fibonacci sphere distribution for even particle spacing
            const phi = Math.acos(-1 + (2 * i) / 5000);
            const theta = Math.sqrt(5000 * Math.PI) * i;

            const radius = 2.4;
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        return positions;
    }, []);

    // Smooth rotation animation
    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <Points ref={pointsRef} positions={particlesPosition} stride={3} position={[0.7, 0, 0]}>
            <PointMaterial
                transparent
                color={theme === 'dark' ? '#2dd4bf' : '#0f766e'}
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={1}
            />
        </Points>
    );
}

export default function ParticleSphere() {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <ParticleSystem />
            </Canvas>
        </div>
    );
}
