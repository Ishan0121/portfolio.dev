# Developer Identity Website — Vision & Implementation Rules

## Project Goal

Create a new personal developer identity website.

This is a new project, not a remake of any previous portfolio.

The website should represent:
- My technical journey
- My projects
- My skills
- My experiments
- My personal identity as a developer

The final result should feel like a complete digital identity, not a normal resume website.

---

# Branding

The website should NOT be named "Portfolio".

The repository name can be different, but the website itself should have its own identity.

Naming direction:

- Short
- Memorable
- Modern
- Slightly mysterious
- Mythology-inspired
- Futuristic
- Technology-related

Possible naming inspiration:

- Chakra (चक्र)
- Astra (अस्त्र)
- Tattva (तत्त्व)
- Sutra (सूत्र)
- Vyom (व्योम)
- Yantra (यन्त्र)
- Tamas (तमस्)
- Noctis
- Erebus
- Aether

---

# Reference Projects

## 1. OG Portfolio (HTML/CSS/JavaScript)

Purpose:
Historical reference only.

Use for:
- Old content
- Original ideas
- Personal information

DO NOT:
- Copy its layout
- Copy its components
- Rebuild it in Next.js
- Use it as a design source

This project is only an archive.

---

## 2. Portfolio 2.0

Website:
https://ishan0121.github.io/portfolio2.0/

GitHub:
https://github.com/Ishan0121/portfolio2.0.git

Local Path:
[ADD LOCAL PATH]

Purpose:
Functionality and content reference.

Use for:

- Project presentation
- Skills section
- Existing features
- Interactions
- Useful components
- Content


Do not copy the complete design.

Modernize the ideas using the new design system.

---

## 3. Portfolio 3.0

Website:
[ADD PORTFOLIO 3.0 LINK]

GitHub:
[ADD PORTFOLIO 3.0 GITHUB]

Local Path:
[ADD LOCAL PATH]

Purpose:
Main visual and layout inspiration.

Use for:

- Homepage layout
- Overall design language
- Typography
- Section arrangement
- Visual hierarchy
- Animations style
- Contact page style


Portfolio 3.0 controls the main website appearance.

---

## 4. Magic Portfolio

Website:
https://demo.magic-portfolio.com/about

GitHub:
https://github.com/once-ui-system/magic-portfolio.git

Local Path:
[ADD LOCAL PATH]


Purpose:
Only About page inspiration.

Use for:

- About page structure
- Storytelling
- Timeline
- Personal journey presentation
- Content flow


Do NOT copy:
- Full template
- Homepage
- Projects
- Other pages


Magic Portfolio influences only the About experience.

---

## 5. Portfolio DNA / 3D Project

Local Path:
[ADD LOCAL PATH]


Purpose:
Dedicated 3D experience.

The /3D page should be based on this project.

Use:

- DNA concept
- Three.js experience
- 3D interactions
- Visual experiments


This is the only place where heavy 3D content should exist.

---

# Page Inspiration Map

## Home Page

Primary source:

Portfolio 3.0


Use:

- Hero design
- Layout
- Visual identity
- Modern transitions


Secondary:

Portfolio 2.0

Use:

- Personal information
- Featured projects
- Existing content


Avoid:

- OG Portfolio structure

---

## About Page

Sources:

Portfolio 3.0
+
Magic Portfolio


Combine:

Portfolio 3.0:
- Visual design
- Layout language


Magic Portfolio:
- Story structure
- Timeline
- Personal journey


The About page should explain:

- Who I am
- How I evolved
- What I build
- What I focus on

---

## Projects Page

Primary source:

Portfolio 2.0


Use:

- Project cards
- Project organization
- Technical information


Improve with:

- Case-study style
- Better storytelling
- Modern presentation


Each project should explain:

- What it is
- Why it exists
- Technologies used
- Challenges
- Results

---

## Skills Page

Primary source:

Portfolio 2.0


Improve:

Do not use simple percentage bars.

Use grouped categories:

Example:

Frontend:
- React
- Next.js
- CSS

Systems:
- C++
- Linux

AI:
- Models
- Experiments

Hardware:
- Arduino
- IoT

---

## Contact Page

Primary source:

Portfolio 3.0


Keep:

- Minimal
- Clean
- Modern


Avoid unnecessary forms.

---

## 3D Page

Primary source:

Portfolio DNA project


Purpose:

A separate immersive experience.


Can contain:

- Three.js
- WebGL
- Interactive models
- DNA structure
- Experimental visuals


Important:

Do not load 3D resources globally.

Three.js should only load on this page.

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


The user should see:

A premium loading animation

and understand what is happening.


Example:

```

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

# Technology Direction

Preferred stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint
- React Compiler
- Framer Motion when needed
- Three.js only for isolated 3D pages


---

# Development Rules

Create a fresh implementation.

Do NOT:

- Upgrade old projects directly
- Copy old code blindly
- Keep outdated dependencies
- Import unnecessary libraries


Migrate:

Ideas → not code

Content → not architecture

Design inspiration → not duplication


---

# Performance Rules

Priorities:

1. Performance
2. Maintainability
3. User experience
4. Visual quality


Avoid:

- Heavy global animations
- Large assets
- Blocking resources
- Unnecessary dependencies


---

# Final Identity

The final website should combine:


Portfolio 3.0:
Visual identity + layout


Portfolio 2.0:
Features + content


Magic Portfolio:
About storytelling


Trionn:
Loading experience + premium entrance feeling


Portfolio DNA:
3D experimental page


OG Portfolio:
Historical reference only


Final result:

A fast, professional, modern developer identity website with a separate experimental layer.



# Personal Developer Identity Website — Vision Document

## Project Goal

Create a modern personal developer website that represents my identity, projects, skills, and technical journey.

This is not a generic portfolio template. It should feel like a personal digital identity / creative technology space.

The website name should NOT be "Portfolio".

The final brand name will be chosen separately.

Possible naming direction:
- Short
- Memorable
- Mythical / ancient inspired
- Futuristic
- Mysterious
- Technology-oriented

Examples of considered names:
- Chakra (चक्र)
- Astra (अस्त्र)
- Tattva (तत्त्व)
- Sutra (सूत्र)
- Vyom (व्योम)
- Yantra (यन्त्र)
- Tamas (तमस्)
- Noctis
- Erebus
- Aether

---

# Main Inspiration

## Previous Website (Legacy)

Website:
https://ishan0121.github.io/portfolio2.0/

GitHub:
https://github.com/Ishan0121/portfolio2.0.git

Local Path:
[ADD LOCAL PATH]


Purpose:
Use this as a source of:
- Existing ideas
- Projects
- Personal identity
- Previous design elements

Do not directly upgrade it.

Rebuild using modern architecture and migrate only useful parts.

---

## Design Inspiration

Website:
https://trionn.com/

Use inspiration from:
- Premium presentation
- Strong visual identity
- Typography
- Storytelling
- Clean futuristic style
- Smooth transitions

Do not copy:
- Heavy animations
- Large 3D scenes
- Excessive effects
- Agency-style sections


---

## About Section Inspiration

Website:
https://demo.magic-portfolio.com/about

GitHub:
https://github.com/once-ui-system/magic-portfolio.git

Local Path:
[ADD LOCAL PATH]

Adapt:
- Story-based about section
- Personal journey presentation
- Experience timeline
- Clean content structure

Do not copy the whole template.


---

# Technology Direction

Preferred technologies:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Modern animation library when needed
- Three.js only for isolated experiences
- MDX/content systems if useful


---

# Design Philosophy

The website should be:

- Fast
- Clean
- Professional
- Modern
- Personal
- Technically expressive


Avoid:

- Heavy default animations
- Unnecessary dependencies
- Slow loading
- Template-like appearance


---

# Website Concept

The website represents:

A developer's digital universe.

It should show:

- Software development
- Web projects
- AI experiments
- Hardware/electronics
- Creative technology


---

# Pages Concept

## Home

Purpose:
Introduce identity.

Include:
- Name/brand
- Short introduction
- Featured work


---

## About

Should focus on:

- Who I am
- My journey
- Skills evolution
- Current focus
- Future direction

Not just a skill list.

---

## Projects

Projects should feel like case studies.

Include:
- Purpose
- Technology
- Challenges
- Results


---

## Lab

Experimental area.

Contains:

- AI experiments
- Hardware projects
- Creative coding
- Research/learning projects


---

## 3D

Dedicated 3D experience page.

Contains:

- Three.js experiments
- Interactive models
- DNA/cybernetic concepts


Important:

3D must NOT affect the performance of the main website.

Load heavy resources only on this page.

---

# 3D Experience Rules

Use:

- Lazy loading
- Dynamic imports
- Optimized models
- Compressed assets

Avoid:

- Loading Three.js globally
- Large textures
- Heavy scenes everywhere


---

# Loading Screen

Create a custom loading experience inspired by modern futuristic websites.

The loading screen should not use a fixed timer.

Correct behavior:

Show loading screen until required resources are ready.


The user should see real progress.

Example:

System Initialization

✓ Loading interface
✓ Loading assets
✓ Loading fonts
✓ Preparing experience
⟳ Loading 3D environment


The user should understand why the page is loading.

---

# Loading Design Direction

Style:

- Minimal futuristic interface
- Dark theme
- Clean typography
- Subtle motion
- System/terminal feeling


The loading screen should feel like:

"System starting"

not:

"Waiting animation"

---

# Performance Rules

Prioritize:

1. Speed
2. Maintainability
3. User experience


Avoid:
- Unnecessary packages
- Deprecated libraries
- Heavy global imports
- Blocking resources


---

# Final Goal

Combine:

Legacy portfolio experience

+

Modern Next.js architecture

+

Premium visual identity

+

Experimental technology space


Final result:

A lightweight professional developer identity website with an optional immersive experience layer.