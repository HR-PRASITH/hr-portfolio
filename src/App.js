import React, { Suspense } from 'react';
import './styles.css';

import GalaxyCanvas from './components/GalaxyCanvas';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

function LoadingFallback() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#02040a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 14,
        color: '#7ee8fa',
        letterSpacing: 4,
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        INITIALIZING GALAXY...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      {/* 3D Galaxy Background — always present */}
      <Suspense fallback={null}>
        <GalaxyCanvas />
      </Suspense>

      {/* Scroll content on top */}
      <div className="scroll-container">
        <Nav />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>

        <footer>
          <p>
            Designed & Built by&nbsp;
            <span style={{ color: '#7ee8fa' }}>HR Prasith</span>
            &nbsp;·&nbsp;
            <span style={{ color: '#6c7a9c' }}>© 2025</span>
          </p>
        </footer>
      </div>
    </>
  );
}
