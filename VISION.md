# Developer Identity Website — Vision & Implementation Rules

## Project Goal

Create a new personal developer identity website.

This is NOT a remake of any previous portfolio.

This is a new project that selectively inherits:
- ideas
- content
- UI patterns
- design language

from previous projects.

The final website should feel like one unified product.

---

# Reference Projects

## Reference 1 — OG Portfolio (HTML/CSS/JavaScript)

Local Path:
/home/phantom/Documents/Codes/Aetheris/web/portfolio

Purpose:
Historical reference only.

Use for:
- Understanding old personal branding
- Recovering old content if needed
- Seeing original ideas

DO NOT copy:
- Layout
- Components
- Structure
- Styling
- Implementation approach

DO NOT recreate the OG portfolio in Next.js.

This project is only an archive.

---

## Reference 2 — Portfolio 2.0

Website:
https://ishan0121.github.io/portfolio2.0/

GitHub:
https://github.com/Ishan0121/portfolio2.0.git

Local Path:
/home/phantom/Documents/Codes/Aetheris/web/portfolio2.0

Purpose:
Feature and functionality reference.

Use for:
- Existing sections
- Project presentation
- Skills presentation
- Interactions
- Useful UI patterns

This is the source for:
- Projects page
- Skills page
- Technical content


Do NOT copy its entire layout.

Rebuild the useful parts with the new design system.

---

## Reference 3 — Portfolio 3.0

Website:
https://ishan0121.github.io/Portfolio3.0/

GitHub:
https://github.com/Ishan0121/Portfolio3.0.git

Local Path:
/home/phantom/Documents/Codes/Aetheris/web/Portfolio3.0

Purpose:
Main visual inspiration.

Use for:
- Overall layout
- Homepage structure
- Visual identity
- Typography
- Animation style
- Loading experience


This controls the global design language.

---

## Reference 4 — Magic Portfolio

Website:
https://demo.magic-portfolio.com/about

GitHub:
https://github.com/once-ui-system/magic-portfolio.git

Local Path:
/home/phantom/Documents/Codes/Aetheris/web/magic-portfolio

Purpose:
Only for About page structure.

Use:
- Storytelling format
- Timeline ideas
- Personal journey presentation
- Content organization


DO NOT copy:
- Full template
- Whole page design
- Other sections

Magic Portfolio influences only the About experience.

---

## Reference 5 — Portfolio DNA / 3D Project

Local Path:
/home/phantom/Documents/Codes/Aetheris/web/Portfolio-dna

Purpose:
Dedicated 3D experience.

The /3D page should be based on this project.

Use:
- DNA concept
- Three.js implementation ideas
- 3D interactions


Important:

3D remains isolated.

Do not move Three.js into:
- Home
- About
- Projects
- Contact

---

## Other Portfolio Projects in Parent Directory

The following projects are also located in the parent (`web`) directory and may contain useful references or experiments:

- **Portfolio 2.1 (Vite/React)**: `/home/phantom/Documents/Codes/Aetheris/web/Portfolio`
- **Portfolio DIY**: `/home/phantom/Documents/Codes/Aetheris/web/Portfolio-diy`
- **Portfolio Skeleton**: `/home/phantom/Documents/Codes/Aetheris/web/Portfolio-skeleton`
- **Portfolio Copy**: `/home/phantom/Documents/Codes/Aetheris/web/Portfolio copy`

---

# Inspiration Mapping

## Home Page

Primary source:
Portfolio 3.0

Secondary:
Portfolio 2.0 content

Include:
- Modern hero
- Personal identity
- Featured work
- Clean animations


Do not use:
OG Portfolio layout

---

## About Page

Sources:

Portfolio 3.0
+
Magic Portfolio


Combine:

Portfolio 3.0:
- Visual style
- Layout language

Magic Portfolio:
- Story structure
- Timeline
- Personal journey


---

## Projects Page

Primary source:
Portfolio 2.0

Keep:
- Project information
- Project organization
- Technical details


Upgrade:
- Better case-study presentation
- Modern layout

---

## Skills Page

Primary source:
Portfolio 2.0

Improve:

Replace simple skill lists with:

- Technology groups
- Domains
- Experience areas


---

## Contact Page

Primary source:
Portfolio 3.0

Keep:
- Minimal
- Clean
- Modern


---

## 3D Page

Primary source:
Portfolio DNA project

This page is an experimental space.

It can contain:
- Heavy graphics
- WebGL
- Three.js
- Interactive models


Only this page should load heavy 3D resources.

---

# Architecture Rules

Create a fresh Next.js project.

Do NOT:
- Upgrade old repositories
- Copy old components directly
- Import old dependencies
- Preserve outdated packages


Migrate ideas, not code.

---

# Performance Rules

Priority:

1. Performance
2. Maintainability
3. Design
4. Effects


Avoid:
- Heavy global animations
- Unnecessary libraries
- Large assets
- Blocking resources


---

# Loading Screen

Reference:
https://trionn.com/

The loading screen should take direct inspiration from Trionn's loading experience.

Use inspiration from:
- Entrance feeling
- Premium transition
- Visual rhythm
- Smooth reveal
- Modern animation style

Do NOT copy the whole website.
Only the loading experience and feeling.

---

# Loading Behavior

The loading screen must NOT use a fixed timer.

Bad:
"Show loading screen for 5 seconds"

Correct:
Show loading screen until required resources are ready.

---

# Loading Experience

Combine:
Trionn-style visual loading
+
Real-time resource status

The user should see a premium loading animation and understand what is happening.

Example:
```text
SYSTEM INITIALIZATION

✓ Interface loaded
✓ Fonts loaded
✓ Components ready
⟳ Loading assets
○ Preparing 3D environment

Progress: 78%
```

---

# 3D Loading

Normal pages:
Load:
- UI
- Content
- Images

3D page:
Load:
- Three.js
- Models
- Textures
- Environment
- Shaders

Only the 3D page should have heavy loading.

---

# Final Identity

The final website should represent:

A developer building systems.

Not:

A copied portfolio template.

The result should combine:

Portfolio 3.0:
Design language

Portfolio 2.0:
Functionality and content

Magic Portfolio:
About storytelling

Trionn:
Loading experience + premium entrance feeling

Portfolio DNA:
3D experimentation

OG Portfolio:
Historical reference only