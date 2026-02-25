import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const PROJECTS = [
  {
    num: '01',
    icon: '📞',
    title: 'Customer-Churn-Prediction-for-Telecom',
    desc: 'ML model using Logistic Regression, SVM, and Random Forest to predict customer churn for a telecom company. Achieved 85% accuracy and 0.78 AUC-ROC, enabling proactive retention strategies.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
    color: '#a78bfa',
  },
  {
    num: '02',
    icon: '🩺',
    title: 'Breast Cancer FNA Classifier',
    desc: 'ML classifier using Logistic Regression, SVM, and Random Forest to detect malignancy from Fine Needle Aspiration cell samples. Used SHAP values for explainable AI insights — making the model trustworthy for medical use.',
    tags: ['Python', 'Scikit-learn', 'SHAP', 'SVM', 'Random Forest'],
    color: '#f472b6',
  },
  {
    num: '03',
    icon: '🎤',
    title: 'AI Interview Coach',
    desc: 'AI-powered interview coach using Google Cloud, TensorFlow, and Speech-to-Text to analyze tone, clarity, confidence, and response quality in real-time. Deployed across web and mobile with Flutter.',
    tags: ['Python', 'TensorFlow', 'Google Cloud', 'Flutter', 'Speech-to-Text'],
    color: '#7ee8fa',
  },
  {
    num: '04',
    icon: '🌿',
    title: 'Automated Plant Watering System',
    desc: 'Smart irrigation system using ESP32 with soil-moisture sensing, real-time weather data integration, and Firebase cloud monitoring. Features adaptive watering logic, remote control, and fail-safe alert mechanisms.',
    tags: ['ESP32', 'Firebase', 'IoT', 'Arduino IDE', 'Sensors'],
    color: '#34d399',
  },
  {
    num: '05',
    icon: '🛡',
    title: 'ResQ — Women Safety Device',
    desc: 'Compact keychain device with real-time GPS tracking and one-press SOS that auto-sends location and triggers emergency calls. Features covert ambient audio monitoring using ESP32-C3 + A9G for fast, discreet protection.',
    tags: ['ESP32-C3', 'A9G Module', 'GPS', 'Embedded C', 'Hardware'],
    color: '#fb923c',
  },
];

function ProjectCard({ project, index, inView }) {
  const cardRef = useRef();

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    cardRef.current.style.setProperty('--mx', `${x}%`);
    cardRef.current.style.setProperty('--my', `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{
        '--project-color': project.color,
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
      onMouseMove={onMouseMove}
    >
      <div className="project-num">{project.num}</div>
      <span className="project-icon">{project.icon}</span>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map(t => (
          <span key={t} className="project-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="projects" ref={ref}>
      <div className="projects-section">
        <div className="section-label">03. Projects</div>
        <h2 className="section-title">Things I've Built</h2>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
