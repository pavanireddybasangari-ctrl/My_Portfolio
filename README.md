# 🌟 Basangari Pavani - 3D Interactive Portfolio

An ultra-modern, high-performance, 3D animated personal portfolio website designed for **Basangari Pavani**, Web Developer and Software Engineer with expertise in Web Development, Python, Java, and Machine Learning.

![Portfolio Preview](./dist/index.html)

---

## 👤 Personal & Contact Profile
- **Name:** Basangari Pavani
- **Role:** Web Developer & Software Engineer
- **Email:** [pavanireddy.basangari@gmail.com](mailto:pavanireddy.basangari@gmail.com)
- **Phone:** [+91 7794897255](tel:7794897255)
- **Location:** Alwal, Hyderabad, Telangana, India
- **LinkedIn:** [linkedin.com/in/pavani-basangari-91919a422](https://www.linkedin.com/in/pavani-basangari-91919a422?)
- **Core Skills:** Web Development (HTML5, CSS3, JavaScript, React), Python, Java, Machine Learning (Scikit-Learn, Pandas, NumPy)

---

## ✨ Key Features & Technical Highlights

### 1. 🪐 Real-Time 3D WebGL Canvas (Three.js)
- **Active 3D Geometry Core:** **Icosahedron** in futuristic **Holo Wireframe** visual style.
- **Rotation Speed:** **0x** by default (clean, poised orientation that smoothly tracks cursor movement with mouse parallax and reacts to section scrolling).
- **Cosmic Starfield:** 1,500+ additive blending dual-color particles orbiting in 3D space.
- **Dynamic Physics & Lighting:** Mouse-responsive camera damping, glowing neon point lights, and scroll-reactive positioning.

### 2. 💎 Cyber-Glass UI & Micro-Interactions
- **Glassmorphism Design System:** Translucent backdrop blur, neon glowing borders, dynamic gradients, and custom responsive typography (`Outfit`, `Space Grotesk`, `JetBrains Mono`).
- **3D Card Perspective Tilt:** Mouse-following spring tilt physics on project cards and skill clusters.
- **Unique & Dynamic Circular Cursor System:** Features a live interactive **Cursor Preview Switcher** (`Gyro`, `Magnetic`, `Fluid`, `Minimal`), real-time velocity squash-and-stretch, rotating gyro orbital ring, cosmic stardust particle trail, and frosted glass hover lens.

### 3. 💼 Portfolio Sections
- **Hero Section:** Engaging introduction with live availability badge, role typewriter, instant CTAs, and click-to-copy social pills.
- **About Me & Code Terminal:** Clean narrative detailing software background, plus an interactive terminal code viewer (`pavani_profile.py`).
- **Technical Skills Matrix:** Categorized skill pills with proficiency ratings covering Web Development, Core Programming (Python & Java), Machine Learning, and Engineering Tools.
- **Featured Projects Showcase:**
  1. *NeuralCare* - Disease Prediction System (Python & ML)
  2. *CyberSphere* - 3D Interactive Web Experience (Three.js & WebGL)
  3. *AlgoCraft* - Interactive Algorithm Simulator (Java & JavaScript)
  4. *DataPulse* - Predictive Analytics Hub (Python & Data Science)
- **Project Detail Modals:** Clickable project inspection modals with key engineering highlights and direct repository / contact triggers.
- **Journey & Academic Timeline:** Timeline tracing computer science education and development milestones in Hyderabad.
- **Interactive Contact Hub:**
  - One-click copy to clipboard for phone (`7794897255`) and email (`pavanireddy.basangari@gmail.com`) with toast notification alerts.
  - Live Indian Standard Time (IST) Hyderabad clock with real-time seconds ticking.
  - Direct message form with animated validation, celebratory confetti, and automated mail client handoff.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
```bash
# Clone or navigate to the directory
cd "c:\Users\matta\OneDrive\Desktop\Projects\Pavani(Portfolio)"

# Install dependencies
npm install
```

### Run Locally (Development Server)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
The optimized bundle will be created in the `dist/` directory, ready to deploy to **GitHub Pages**, **Vercel**, or **Netlify**.

### Preview Production Build
```bash
npm run preview
```

---

## 📂 Project Architecture
```text
Pavani(Portfolio)/
├── dist/                      # Production build output
│   ├── assets/                # Minified CSS, JS, and Three.js chunks
│   └── index.html             # Production HTML
├── src/
│   ├── main.js                # Application controller & DOM interactions
│   ├── style.css              # Cyber-glass design system & responsive styling
│   └── threeScene.js          # Three.js 3D WebGL scene, particles, lights & parallax
├── index.html                 # Main HTML5 entry point
├── package.json               # NPM scripts and dependencies
├── vite.config.js             # Vite configuration with chunk splitting
└── README.md                  # Project documentation
```

---

## 📜 License
Created with ❤️ for Basangari Pavani. All rights reserved © 2026.
