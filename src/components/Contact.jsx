import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [aiMsg, setAiMsg]     = useState('');
  const [aiReply, setAiReply] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!aiMsg.trim()) return;
    setLoading(true);
    setAiReply('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: `You are HR Prasith's AI portfolio assistant. HR Prasith is a B.Tech AI & ML student at CMR University, Bangalore. 
His projects include: Breast Cancer FNA Classifier (ML/SHAP), AI Interview Coach (Google Cloud/TensorFlow/Flutter), Automated Plant Watering System (ESP32/Firebase), and ResQ Women Safety Device (ESP32-C3/GPS).
His skills: Python, ML, TensorFlow, Flutter, Firebase, Google Cloud, ESP32, Git.
GPA: 7.76. Contact: hr.prasith28@gmail.com, GitHub: github.com/Hrprasith.
Answer questions about HR Prasith professionally and helpfully. Keep answers concise (2-3 sentences max).`,
          messages: [{ role: 'user', content: aiMsg }],
        }),
      });
      const data = await res.json();
      setAiReply(data.content?.[0]?.text || 'Let me connect you with HR directly!');
    } catch {
      setAiReply('Hmm, something went wrong. Reach out to hr.prasith28@gmail.com directly!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref}>
      <div
        className="contact-section"
        style={{
          opacity:   inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="section-label" style={{ justifyContent: 'center' }}>05. Contact</div>

        <div className="contact-big-text">
          Let's Build<br /><span>Something Insane</span>
        </div>

        <p style={{ color: '#6c7a9c', fontSize: 16, lineHeight: 1.8, marginBottom: 48, maxWidth: 560, margin: '0 auto 48px' }}>
          Open to internships, collaborations, research projects, and hackathons.
          Based in Bangalore — let's connect.
        </p>

        <div className="contact-links">
          <a href="mailto:hr.prasith28@gmail.com" className="contact-link">
            📧 hr.prasith28@gmail.com
          </a>
          <a href="tel:9448739738" className="contact-link">
            📞 +91 9448739738
          </a>
          <a href="https://github.com/HR-PRASITH" target="_blank" rel="noopener noreferrer" className="contact-link">
            🐙 github.com/Hrprasith
          </a>
          <a href="https://www.linkedin.com/in/hr-prasith-924223291/" target="_blank" rel="noopener noreferrer" className="contact-link">
            💼 linkedin.com/HrPrasith
          </a>
          <a href="#" className="contact-link">
            📍 Bangalore, India
          </a>
        </div>
      </div>
    </section>
  );
}
