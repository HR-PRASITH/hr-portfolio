# 🌌 HR Prasith — 3D Portfolio

A jaw-dropping 3D space/galaxy portfolio built with React, Three.js, and Claude AI.

## ✨ What's Inside

- **3D Galaxy background** — 12,000 particles spinning in real-time with mouse parallax
- **Floating AI Core** — an icosahedron with orbital rings that reacts to time
- **3D Planet** — a glowing orbital planet in the About section
- **Typewriter hero** — animated role text
- **Custom cursor** — glowing dot that follows your mouse
- **Scroll animations** — everything fades in as you scroll
- **Claude AI Chat** — ask HR's AI assistant powered by Anthropic

## 📁 File Structure

```
hr-portfolio/
├── public/
│   └── index.html              ← Custom cursor + Google Fonts
├── src/
│   ├── index.js                ← React entry
│   ├── App.js                  ← Root, wires everything
│   ├── styles.css              ← All CSS (variables, animations, layout)
│   └── components/
│       ├── GalaxyCanvas.jsx    ← THREE.js galaxy + AI core + orbital rings
│       ├── Nav.jsx             ← Sticky nav with scroll effect
│       ├── Hero.jsx            ← Typewriter hero section
│       ├── About.jsx           ← About + 3D planet (Three.js)
│       ├── Skills.jsx          ← Skill categories grid
│       ├── Projects.jsx        ← 4 project cards with mouse glow
│       ├── Education.jsx       ← Timeline + languages
│       └── Contact.jsx         ← Contact links + Claude AI chat widget
└── package.json
