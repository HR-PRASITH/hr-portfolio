import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── GALAXY PARTICLES ─────────────────────────────────────────────────────────
function Galaxy() {
  const points = useRef();
  const count = 12000;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    const insideColor  = new THREE.Color('#7ee8fa');
    const outsideColor = new THREE.Color('#a78bfa');
    const pinkColor    = new THREE.Color('#f472b6');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius  = Math.random() * 8 + 0.5;
      const arms    = 3;
      const spin    = radius * 1.2;
      const arm     = (i % arms) * ((Math.PI * 2) / arms);
      const angle   = arm + spin;

      const spread  = 0.5;
      const randX   = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread;
      const randY   = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * 0.3;
      const randZ   = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread;

      positions[i3]     = Math.cos(angle) * radius + randX;
      positions[i3 + 1] = randY;
      positions[i3 + 2] = Math.sin(angle) * radius + randZ;

      // Color mix
      const t = radius / 8;
      const mixed = new THREE.Color();
      if (Math.random() < 0.05) {
        mixed.copy(pinkColor);
      } else {
        mixed.lerpColors(insideColor, outsideColor, t);
      }
      colors[i3]     = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        sizeAttenuation
        vertexColors
        transparent
        alphaTest={0.001}
        depthWrite={false}
      />
    </points>
  );
}

// ─── FLOATING ORBITAL RINGS ───────────────────────────────────────────────────
function OrbitalRing({ radius, color, speed, tilt }) {
  const ring = useRef();
  useFrame((state) => {
    if (ring.current) {
      ring.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });
  return (
    <mesh ref={ring} rotation={[tilt, 0, 0]} position={[2, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

// ─── FLOATING DODECAHEDRON (AI Brain) ────────────────────────────────────────
function AICore() {
  const mesh = useRef();
  const wireframe = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.3;
      mesh.current.rotation.y = t * 0.5;
      mesh.current.position.y = Math.sin(t * 0.8) * 0.3;
      const scale = 1 + Math.sin(t * 1.2) * 0.04;
      mesh.current.scale.setScalar(scale);
    }
    if (wireframe.current) {
      wireframe.current.rotation.x = -t * 0.2;
      wireframe.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group position={[3.5, 0.5, -2]}>
      {/* Solid core */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color="#7ee8fa"
          emissive="#7ee8fa"
          emissiveIntensity={0.4}
          transparent
          opacity={0.15}
          wireframe={false}
        />
      </mesh>
      {/* Wireframe shell */}
      <mesh ref={wireframe}>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshBasicMaterial color="#7ee8fa" wireframe transparent opacity={0.6} />
      </mesh>
      {/* Glow point */}
      <pointLight color="#7ee8fa" intensity={2} distance={3} />
    </group>
  );
}

// ─── FLOATING PARTICLES (ambient) ────────────────────────────────────────────
function AmbientParticles() {
  const points = useRef();
  const count = 300;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a78bfa" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ─── MOUSE PARALLAX CAMERA ────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── MAIN CANVAS ──────────────────────────────────────────────────────────────
export default function GalaxyCanvas() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 1.5, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#7ee8fa" />
        <CameraRig />
        <Galaxy />
        <AmbientParticles />
        <AICore />
        <OrbitalRing radius={1.0} color="#7ee8fa" speed={0.4}  tilt={Math.PI / 4} />
        <OrbitalRing radius={1.4} color="#a78bfa" speed={-0.3} tilt={Math.PI / 3} />
        <OrbitalRing radius={1.8} color="#f472b6" speed={0.2}  tilt={Math.PI / 6} />
      </Canvas>
    </div>
  );
}
