import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useInView } from 'react-intersection-observer';

function FloatingPlanet() {
  const mesh = useRef();
  const ring = useRef();
  const atmo = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.3;
      mesh.current.rotation.x = Math.sin(t * 0.2) * 0.1;
      mesh.current.position.y = Math.sin(t * 0.6) * 0.15;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.1;
      ring.current.position.y = Math.sin(t * 0.6) * 0.15;
    }
    if (atmo.current) {
      atmo.current.rotation.y = -t * 0.15;
      atmo.current.position.y = Math.sin(t * 0.6) * 0.15;
    }
  });

  return (
    <group>
      {/* Atmosphere glow */}
      <mesh ref={atmo}>
        <sphereGeometry args={[1.12, 32, 32]} />
        <meshBasicMaterial color="#7ee8fa" transparent opacity={0.06} />
      </mesh>

      {/* Planet body */}
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#0d1f3c"
          roughness={0.8}
          metalness={0.2}
          emissive="#1a3a6e"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Glowing grid lines on planet */}
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.015, 8, 80]} />
        <meshBasicMaterial color="#7ee8fa" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.6, 0.008, 8, 80]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.4} />
      </mesh>

      {/* Orbiting dot */}
      <OrbitingDot radius={1.4} speed={1.2} color="#7ee8fa" />
      <OrbitingDot radius={1.6} speed={-0.8} color="#f472b6" offset={Math.PI} />

      <pointLight color="#7ee8fa" intensity={3}  distance={6} position={[2, 2, 2]} />
      <pointLight color="#a78bfa" intensity={1.5} distance={4} position={[-2, -1, 1]} />
      <ambientLight intensity={0.3} />
    </group>
  );
}

function OrbitingDot({ radius, speed, color, offset = 0 }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (mesh.current) {
      mesh.current.position.x = Math.cos(t) * radius;
      mesh.current.position.z = Math.sin(t) * radius;
    }
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" ref={ref}>
      <div className="about-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Text */}
        <div className={`about-text ${inView ? 'animate-up' : ''}`}>
          <div className="section-label">01. About Me</div>
          <h2 className="section-title">Building AI<br />for the Real World</h2>
          <p>
            I'm <strong style={{ color: '#e8f0fe' }}>HR Prasith</strong>, a B.Tech AI & ML student at 
            CMR University, Bangalore. I believe technology should solve problems that matter — 
            from detecting breast cancer with ML to building emergency safety devices for women.
          </p>
          <p>
            I combine machine learning, cloud platforms, and hardware to ship end-to-end products.
            Whether it's a SHAP-explained cancer classifier or an ESP32-powered smart irrigation system,
            I build things that work in the real world.
          </p>
          <p>
            When I'm not coding, you'll find me swimming or bowling — two sports that teach
            precision and consistency, just like good engineering.
          </p>

          <div className="about-stats">
            {[
              { num: '4+',   label: 'Projects Built'       },
              { num: '7.76', label: 'CGPA @ CMR'           },
              { num: '2',    label: 'Certifications'        },
              { num: '4',    label: 'Languages Spoken'      },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Planet */}
        <div className="about-3d">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} style={{ height: '100%' }}>
            <FloatingPlanet />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
