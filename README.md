<div align="center">
  
  # 💻 portfolio.dev
  ### The Interactive 3D Portfolio of Ishan Maiti

  <p align="center">
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
    <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  </p>
  
  <p align="center">
    A meticulously crafted digital experience bridging the gap between modern web development, hardware, and creative 3D technologies.
    <br/>
    <br/>
  </p>
</div>

---

## ⚡ Overview

**portfolio.dev** is the personal portfolio of **Ishan Maiti**—a Full Stack Engineer and Computer Science student based in Kolkata, India. Driven by a passion for clean architecture and system-level understanding, this portfolio goes beyond standard web design to deliver a premium, WebGL-powered interactive experience using the latest React 19 and Next.js 16 App Router.

## ✨ The 3D Lab

The core of this portfolio is its extensive **3D Lab**, featuring over 30 procedural and highly optimized React Three Fiber models. These aren't just static assets; they are interactive, math-driven WebGL experiences:

* 🧬 **DNA Engine** & **BioSpine**: Procedurally animated organic structures.
* 🧠 **Neural Network** & **Cyber Brain**: Node-based visualizations of complex connections.
* ⚙️ **Titan Gear** & **Mecha Lotus**: Hard-surface mechanical animations.
* 🌌 **Quantum Lily**, **AI Orb**, **Data Vault**, and many more.

Each model is integrated with dynamic post-processing (Bloom, Reflections) and Zustand-managed global states for real-time interaction.

## 🛠️ Tech Architecture

This project is built on a bleeding-edge modern stack, utilizing the React Compiler, strictly typed architectures, and complex fluid animations.

| Category | Technologies |
|---|---|
| **Core** | [Next.js 16](https://nextjs.org/) • [React 19](https://react.dev/) • [TypeScript 5](https://www.typescriptlang.org/) |
| **Graphics** | [Three.js 0.184](https://threejs.org/) • [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) • [@react-three/drei](https://github.com/pmndrs/drei) • [Postprocessing](https://docs.pmnd.rs/react-postprocessing/introduction) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) • [Framer Motion 12](https://www.framer.com/motion/) • [Aceternity UI](https://ui.aceternity.com/) |
| **State & Data** | [Zustand 5](https://github.com/pmndrs/zustand) • [React Hook Form](https://react-hook-form.com/) • Web3Forms |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.17+ recommended)
- `npm`, `yarn`, `pnpm`, or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ishan0121/portfolio.dev.git
   cd portfolio.dev
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Web3Forms access key (required for the contact form):
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Directory Structure

```text
├── src/
│   ├── app/               # Next.js App Router (Pages, Layouts, Loading states)
│   ├── components/        
│   │   ├── 3DScene/       # All 30+ R3F interactive models & scenes
│   │   ├── core/          # Core navigation and loading screens
│   │   ├── effects/       # Framer Motion & Aceternity UI effects
│   │   ├── sections/      # Main content sections (About, Projects, TechTree)
│   │   └── ui/            # Reusable atomic UI components (shadcn/ui)
│   ├── lib/               # Global configuration (siteConfig, portfolioInfo)
│   └── store/             # Zustand state slices (InteractStore, SettingsStore)
├── public/                # Static assets, fonts, resumes
└── tailwind.config.ts     # Advanced Tailwind configuration with custom animations
```

## 📬 Contact & Links

I am always exploring new technologies and building complex systems. Feel free to reach out or connect!

- **GitHub:** [@Ishan0121](https://github.com/Ishan0121)
- **LinkedIn:** [Ishan Maiti](https://www.linkedin.com/in/ishan-maiti-785212297)
- **X / Twitter:** [@maiti_ishan](https://x.com/maiti_ishan)
- **Email:** [ishanmaiti1234@gmail.com](mailto:ishanmaiti1234@gmail.com)
- **Schedule a meeting:** [Cal.com](https://cal.com/ishan-maiti)

---
<div align="center">
  <sub>Built with ❤️ by Ishan Maiti. Distributed under the MIT License.</sub>
</div>
