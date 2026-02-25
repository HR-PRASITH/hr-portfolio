import React from 'react';
import { useInView } from 'react-intersection-observer';

const TIMELINE = [
  {
    icon: '🎓',
    date: 'Aug 2023 – Present',
    title: 'B.Tech in AI & Machine Learning',
    sub: 'CMR University, Bangalore',
    grade: 'GPA: 7.76',
    type: 'education',
  },
  {
    icon: '🏫',
    date: 'Apr 2021 – Apr 2023',
    title: 'Pre-University (PCMB)',
    sub: 'Excel PU College, Mangalore',
    grade: 'Percentage: 79%',
    type: 'education',
  },
  {
    icon: '🏆',
    date: 'Jun 2025 – Aug 2025',
    title: 'GDG on Campus Solution Challenge India',
    sub: 'Google Developer Groups',
    grade: '',
    type: 'cert',
  },
  {
    icon: '📜',
    date: 'Aug 2025 – Sep 2025',
    title: 'Deep Learning & Machine Learning with Python',
    sub: 'Certification Course',
    grade: '',
    type: 'cert',
  },
];

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="education" ref={ref}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="section-label">04. Education & Certs</div>
        <h2 className="section-title">The Journey</h2>

        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className="timeline-item"
              style={{
                opacity:   inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-30px)',
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              }}
            >
              <div className="timeline-dot">{item.icon}</div>
              <div className="timeline-content">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-sub">{item.sub}</div>
                {item.grade && <div className="timeline-grade">⭐ {item.grade}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div style={{ marginTop: 60 }}>
          <div style={{ fontSize: 12, color: '#6c7a9c', letterSpacing: 3, textTransform: 'uppercase', fontFamily: "'Space Mono',monospace", marginBottom: 24 }}>
            Languages I Speak
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { lang: 'English',  level: 'Full Professional', color: '#7ee8fa' },
              { lang: 'Hindi',    level: 'Full Professional', color: '#a78bfa' },
              { lang: 'Kannada',  level: 'Full Professional', color: '#34d399' },
              { lang: 'German',   level: 'Limited Working',   color: '#fbbf24' },
            ].map(l => (
              <div
                key={l.lang}
                style={{
                  padding: '16px 24px',
                  border: `1px solid ${l.color}40`,
                  borderRadius: 10,
                  background: `${l.color}08`,
                  minWidth: 150,
                  transition: 'transform 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: '#e8f0fe', marginBottom: 4 }}>
                  {l.lang}
                </div>
                <div style={{ fontSize: 11, color: l.color, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>
                  {l.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
