import { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Individual body parts as components ---

function Head({ mouseRef, isTyping, isWaving, isClicked }) {
    const headRef = useRef();
    const eyeL = useRef();
    const eyeR = useRef();
    const visorRef = useRef();

    useFrame(({ clock }) => {
        if (!headRef.current) return;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const t = clock.getElapsedTime();

        // Head follows mouse with more range
        const targetRotY = mx * 0.5;
        const targetRotX = -my * 0.25;
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);

        // Curious head tilt based on mouse position
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, mx * -0.08, 0.05);

        // Eye movement — more expressive
        if (eyeL.current && eyeR.current) {
            const eyeX = mx * 0.08;
            const eyeY = my * 0.05;
            eyeL.current.position.x = -0.22 + eyeX;
            eyeL.current.position.y = 0.1 + eyeY;
            eyeR.current.position.x = 0.22 + eyeX;
            eyeR.current.position.y = 0.1 + eyeY;

            // Blink every ~4 seconds
            const blinkPhase = t % 4;
            const blinkScale = blinkPhase < 0.12 ? 0.1 : 1;
            eyeL.current.scale.y = blinkScale;
            eyeR.current.scale.y = blinkScale;
        }

        // Visor glow pulse
        if (visorRef.current) {
            const pulse = isClicked ? 1.2 : (isTyping ? 0.8 + Math.sin(t * 8) * 0.3 : 0.4 + Math.sin(t * 1.5) * 0.1);
            visorRef.current.material.emissiveIntensity = pulse;
        }
    });

    return (
        <group ref={headRef} position={[0, 1.6, 0]}>
            {/* Head - rounded box */}
            <mesh>
                <boxGeometry args={[0.9, 0.9, 0.85, 4, 4, 4]} />
                <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.5} />
            </mesh>
            {/* Visor / Screen face */}
            <mesh ref={visorRef} position={[0, 0.05, 0.43]}>
                <boxGeometry args={[0.7, 0.4, 0.02]} />
                <meshStandardMaterial
                    color={isTyping ? '#00ff88' : '#00d4ff'}
                    emissive={isTyping ? '#00ff88' : '#00d4ff'}
                    emissiveIntensity={0.4}
                    metalness={0.8}
                    roughness={0.1}
                />
            </mesh>
            {/* Eyes */}
            <mesh ref={eyeL} position={[-0.22, 0.1, 0.445]}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial
                    color="#0a0a0f"
                    emissive="#00ff88"
                    emissiveIntensity={0.6}
                />
            </mesh>
            <mesh ref={eyeR} position={[0.22, 0.1, 0.445]}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial
                    color="#0a0a0f"
                    emissive="#00ff88"
                    emissiveIntensity={0.6}
                />
            </mesh>
            {/* Antenna */}
            <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
                <meshStandardMaterial color="#555" />
            </mesh>
            <AntennaOrb />
        </group>
    );
}

// Antenna orb with animated glow
function AntennaOrb() {
    const ref = useRef();
    useFrame(({ clock }) => {
        if (ref.current) {
            const t = clock.getElapsedTime();
            ref.current.material.emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.4;
            ref.current.scale.setScalar(1 + Math.sin(t * 3) * 0.15);
        }
    });
    return (
        <mesh ref={ref} position={[0, 0.75, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
                color="#00ff88"
                emissive="#00ff88"
                emissiveIntensity={1}
            />
        </mesh>
    );
}

function Body({ isTyping, isWaving }) {
    const armL = useRef();
    const armR = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        if (armL.current && armR.current) {
            if (isWaving) {
                // Wave animation — right arm waves enthusiastically
                armR.current.rotation.x = -0.3;
                armR.current.rotation.z = -1.2 + Math.sin(t * 8) * 0.4;
                armL.current.rotation.x = Math.sin(t * 0.8) * 0.05;
                armL.current.rotation.z = 0.15;
            } else if (isTyping) {
                // Typing animation - arms move as if typing
                armL.current.rotation.x = -0.8 + Math.sin(t * 12) * 0.15;
                armR.current.rotation.x = -0.8 + Math.sin(t * 12 + Math.PI) * 0.15;
                armL.current.rotation.z = 0.3;
                armR.current.rotation.z = -0.3;
            } else {
                // Idle - gentle sway with more personality
                armL.current.rotation.x = Math.sin(t * 0.8) * 0.08;
                armR.current.rotation.x = Math.sin(t * 0.8 + 1) * 0.08;
                armL.current.rotation.z = 0.15 + Math.sin(t * 0.5) * 0.03;
                armR.current.rotation.z = -0.15 + Math.sin(t * 0.5) * 0.03;
            }
        }
    });

    return (
        <group position={[0, 0.4, 0]}>
            {/* Torso */}
            <mesh>
                <boxGeometry args={[0.8, 1.0, 0.5, 2, 2, 2]} />
                <meshStandardMaterial color="#12121a" metalness={0.3} roughness={0.6} />
            </mesh>
            {/* Chest accent line */}
            <mesh position={[0, 0.15, 0.26]}>
                <boxGeometry args={[0.5, 0.04, 0.01]} />
                <meshStandardMaterial
                    color="#00ff88"
                    emissive="#00ff88"
                    emissiveIntensity={0.6}
                />
            </mesh>
            {/* Secondary chest accent */}
            <mesh position={[0, 0.0, 0.26]}>
                <boxGeometry args={[0.3, 0.02, 0.01]} />
                <meshStandardMaterial
                    color="#00d4ff"
                    emissive="#00d4ff"
                    emissiveIntensity={0.4}
                />
            </mesh>
            {/* Left Arm */}
            <group ref={armL} position={[-0.55, 0.2, 0]}>
                <mesh position={[0, -0.35, 0]}>
                    <boxGeometry args={[0.2, 0.7, 0.22]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.5} />
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.75, 0]}>
                    <sphereGeometry args={[0.1, 12, 12]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.5} />
                </mesh>
            </group>
            {/* Right Arm */}
            <group ref={armR} position={[0.55, 0.2, 0]}>
                <mesh position={[0, -0.35, 0]}>
                    <boxGeometry args={[0.2, 0.7, 0.22]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.5} />
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.75, 0]}>
                    <sphereGeometry args={[0.1, 12, 12]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.5} />
                </mesh>
            </group>
        </group>
    );
}

function Legs() {
    const legL = useRef();
    const legR = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        // Subtle idle leg shifting
        if (legL.current && legR.current) {
            legL.current.rotation.x = Math.sin(t * 0.6) * 0.02;
            legR.current.rotation.x = Math.sin(t * 0.6 + Math.PI) * 0.02;
        }
    });

    return (
        <group position={[0, -0.6, 0]}>
            {/* Left Leg */}
            <group ref={legL}>
                <mesh position={[-0.2, -0.35, 0]}>
                    <boxGeometry args={[0.25, 0.7, 0.25]} />
                    <meshStandardMaterial color="#0a0a1a" metalness={0.2} roughness={0.6} />
                </mesh>
                {/* Foot */}
                <mesh position={[-0.2, -0.72, 0.05]}>
                    <boxGeometry args={[0.28, 0.06, 0.32]} />
                    <meshStandardMaterial color="#0a0a1a" metalness={0.3} roughness={0.5} />
                </mesh>
            </group>
            {/* Right Leg */}
            <group ref={legR}>
                <mesh position={[0.2, -0.35, 0]}>
                    <boxGeometry args={[0.25, 0.7, 0.25]} />
                    <meshStandardMaterial color="#0a0a1a" metalness={0.2} roughness={0.6} />
                </mesh>
                {/* Foot */}
                <mesh position={[0.2, -0.72, 0.05]}>
                    <boxGeometry args={[0.28, 0.06, 0.32]} />
                    <meshStandardMaterial color="#0a0a1a" metalness={0.3} roughness={0.5} />
                </mesh>
            </group>
        </group>
    );
}

// Floating laptop when typing
function Laptop({ isTyping }) {
    const ref = useRef();

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        ref.current.position.y = -0.1 + Math.sin(t * 2) * 0.02;
        ref.current.visible = isTyping;
    });

    return (
        <group ref={ref} position={[0, -0.1, 0.7]} visible={isTyping}>
            {/* Laptop base */}
            <mesh rotation={[-0.3, 0, 0]}>
                <boxGeometry args={[0.6, 0.02, 0.4]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* Laptop screen */}
            <mesh position={[0, 0.2, -0.15]} rotation={[0.3, 0, 0]}>
                <boxGeometry args={[0.55, 0.35, 0.02]} />
                <meshStandardMaterial
                    color="#00ff88"
                    emissive="#00ff88"
                    emissiveIntensity={0.3}
                />
            </mesh>
        </group>
    );
}

// Glow ring behind character — now with pulsing
function GlowRing({ isClicked }) {
    const ref = useRef();

    useFrame(({ clock }) => {
        if (ref.current) {
            const t = clock.getElapsedTime();
            ref.current.rotation.z = t * 0.2;
            // Pulse on click
            const pulseScale = isClicked ? 1.1 + Math.sin(t * 10) * 0.05 : 1;
            ref.current.scale.setScalar(pulseScale);
            ref.current.material.opacity = isClicked ? 0.7 : 0.3 + Math.sin(t * 1.5) * 0.1;
        }
    });

    return (
        <mesh ref={ref} position={[0, 0.5, -0.5]}>
            <torusGeometry args={[1.6, 0.02, 16, 64]} />
            <meshStandardMaterial
                color="#00ff88"
                emissive="#00ff88"
                emissiveIntensity={0.8}
                transparent
                opacity={0.4}
            />
        </mesh>
    );
}

// Floating particles around character
function FloatingParticles() {
    const ref = useRef();
    const count = 20;
    const positions = useRef(
        Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 3,
            y: (Math.random() - 0.5) * 4,
            z: (Math.random() - 0.5) * 2,
            speed: 0.3 + Math.random() * 0.7,
            offset: Math.random() * Math.PI * 2,
        }))
    );

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        const posArray = ref.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const p = positions.current[i];
            posArray[i * 3] = p.x + Math.sin(t * p.speed + p.offset) * 0.3;
            posArray[i * 3 + 1] = p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.3;
            posArray[i * 3 + 2] = p.z + Math.sin(t * p.speed * 0.5 + p.offset) * 0.2;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    const initialPositions = new Float32Array(count * 3);
    positions.current.forEach((p, i) => {
        initialPositions[i * 3] = p.x;
        initialPositions[i * 3 + 1] = p.y;
        initialPositions[i * 3 + 2] = p.z;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={initialPositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#00ff88"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Main character assembly
function CharacterModel({ mouseRef, isTyping, isClicked, isHovered }) {
    const groupRef = useRef();
    const [isWaving, setIsWaving] = useState(false);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();

        // Breathing / idle floating — more alive
        const baseY = -0.5;
        groupRef.current.position.y = baseY + Math.sin(t * 1.2) * 0.1;

        // Gentle body sway
        groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.06;
        groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.01;

        // Lean forward when hovered
        const targetLean = isHovered ? -0.08 : 0;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetLean, 0.05);

        // Wave on click (for 1.5s)
        if (isClicked && !isWaving) {
            setIsWaving(true);
            setTimeout(() => setIsWaving(false), 1500);
        }
    });

    return (
        <group ref={groupRef} scale={[1.15, 1.15, 1.15]} position={[0, -0.5, 0]}>
            <Head mouseRef={mouseRef} isTyping={isTyping} isWaving={isWaving} isClicked={isClicked} />
            <Body isTyping={isTyping} isWaving={isWaving} />
            <Legs />
            <Laptop isTyping={isTyping} />
            <GlowRing isClicked={isClicked} />
            <FloatingParticles />
        </group>
    );
}

// Exported component with Canvas
export default function Character3D({ isTyping = false }) {
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Track normalized mouse position (-1 to 1)
    const handlePointerMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }, []);

    const handleClick = useCallback(() => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 1500);
    }, []);

    return (
        <div
            className="character-container"
            onPointerMove={handlePointerMove}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <Canvas
                camera={{ position: [0, 0.6, 5], fov: 40 }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent', width: '100%', height: '100%' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 5, 5]} intensity={0.9} />
                <pointLight position={[-3, 2, 2]} intensity={0.5} color="#00ff88" />
                <pointLight position={[3, 0, 3]} intensity={0.4} color="#00d4ff" />
                <CharacterModel mouseRef={mouseRef} isTyping={isTyping} isClicked={isClicked} isHovered={isHovered} />
            </Canvas>
        </div>
    );
}
