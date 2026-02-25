import React from 'react';
import { useInView } from 'react-intersection-observer';

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    icon: '⚡',
    color: '#7ee8fa',
    skills: ['Python', 'C', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'AI / ML',
    icon: '🧠',
    color: '#a78bfa',
    skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'Scikit-learn', 'SHAP', 'Google Cloud AI'],
  },
  {
    title: 'Web & Mobile',
    icon: '📱',
    color: '#f472b6',
    skills: ['Flutter', 'Firebase', 'MySQL', 'Android Studio'],
  },
  {
    title: 'Hardware & IoT',
    icon: '🔧',
    color: '#fbbf24',
    skills: ['ESP32', 'ESP32-C3', 'A9G Module', 'Arduino IDE', 'Soil Moisture Sensors'],
  },
  {
    title: 'Tools',
    icon: '🛠',
    color: '#34d399',
    skills: ['Git', 'GitHub', 'VSCode', 'Google Colab', 'Jupyter Notebook', 'MySQL Workbench'],
  },
  {
    title: 'Soft Skills',
    icon: '🎯',
    color: '#fb923c',
    skills: ['Critical Problem-Solving', 'Leadership', 'Team Coordination', 'Time Management', 'Communication'],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" ref={ref}>
      <div className="skills-section">
        <div className="section-label">02. Skills</div>
        <h2 className="section-title">What I Work With</h2>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div
              key={cat.title}
              className="skill-category"
              style={{
                '--category-color': cat.color,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              }}
            >
              <div className="skill-cat-title">
                <span>{cat.icon}</span> {cat.title}
              </div>
              <div className="skill-tags">
                {cat.skills.map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
