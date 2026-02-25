import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const titleRef = useRef();

  // Typewriter for role
  useEffect(() => {
    const roles = ['AI/ML Engineer', 'Problem Solver', 'Builder of Ideas', 'B.Tech @ CMR'];
    let roleIdx = 0, charIdx = 0, deleting = false;
    const el = document.getElementById('typed-role');
    if (!el) return;

    const tick = () => {
      const current = roles[roleIdx];
      if (deleting) {
        el.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
      } else {
        el.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) { deleting = true; setTimeout(tick, 1800); return; }
      }
      setTimeout(tick, deleting ? 80 : 150);
    };
    tick();
  }, []);

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 48px' }}>
      <div className="hero">
        <h1 className="hero-name animate-up delay-2" ref={titleRef}>
          HR<br /><span className="highlight">Prasith</span>
        </h1>

        <div className="hero-role animate-up delay-3">
          <span id="typed-role" style={{ borderRight: '2px solid #7ee8fa', paddingRight: 4 ,  color: '#ffffff'}}>AI/ML Engineer</span>
        </div>

        <p className="hero-bio animate-up delay-4">
          Innovative student at CMR University, Bangalore — exploring how technology can be used
          to build practical, intelligent systems. From breast cancer classifiers to women's safety devices,
          I build things that <em style={{ color: '#7ee8fa', fontStyle: 'normal' }}>actually matter</em>.
        </p>

        <div className="hero-cta animate-up delay-5">
          <a href="#projects" className="btn-primary">
            🚀 View Projects
          </a>
          <a href="#contact" className="btn-ghost">
            Let's Connect
          </a>
        </div>

        {/* Floating tags */}
        <div style={{ display: 'flex', gap: 12, marginTop: 48, flexWrap: 'wrap' }} className="animate-up delay-5">
          {['Python', 'Machine Learning', 'TensorFlow', 'Flutter', 'Firebase'].map(tag => (
            <span key={tag} style={{
              padding: '6px 14px',
              border: '1px solid #1a274480',
              borderRadius: '100px',
              fontSize: 12,
              fontFamily: "'Space Mono', monospace",
              color: '#fdfdfd',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#7ee8fa'; e.target.style.color = '#7ee8fa'; }}
            onMouseLeave={e => { e.target.style.borderColor = '#1a274480'; e.target.style.color = '#6c7a9c'; }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-scroll-hint">
        ↓ &nbsp; scroll
      </div>
    </section>
  );
}
