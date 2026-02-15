# 🖥️ Aman Kumar — Cyber Terminal Portfolio Website

## 📌 Overview

A single-page portfolio website combining the **"Cyber Terminal"** hacker aesthetic with **glassmorphism** effects. The site features a dark neon-green/cyan color scheme, terminal-inspired typography, smooth animations, interactive 3D elements throughout, an interactive 3D character, and full responsiveness across all devices.

**What makes it stand out:** This isn't just a portfolio — it's an *experience*. From the hacker boot sequence loading screen, to the playable terminal, to the 3D character that reacts to your every move, every detail is crafted to leave a lasting impression.

---

## 🎨 Design System

### Color Palette

| Token              | Value                          | Usage                         |
| ------------------- | ------------------------------ | ----------------------------- |
| `--bg-primary`      | `#0a0a0f`                      | Main background               |
| `--bg-secondary`    | `#12121a`                      | Card/section backgrounds      |
| `--bg-tertiary`     | `#1a1a2e`                      | Elevated surfaces             |
| `--accent-primary`  | `#00ff88`                      | Neon green (primary accent)   |
| `--accent-secondary`| `#00d4ff`                      | Cyan (secondary accent)       |
| `--accent-tertiary` | `#ff006e`                      | Hot pink (highlights/alerts)  |
| `--text-primary`    | `#e0e0e0`                      | Body text                     |
| `--text-secondary`  | `#8a8a9a`                      | Muted text                    |
| `--text-heading`    | `#ffffff`                      | Headings                      |
| `--glass-bg`        | `rgba(255, 255, 255, 0.05)`    | Glass card background         |
| `--glass-border`    | `rgba(255, 255, 255, 0.1)`     | Glass card borders            |
| `--glass-shadow`    | `0 8px 32px rgba(0, 0, 0, 0.4)`| Glass card shadow            |
| `--glow-green`      | `0 0 20px rgba(0, 255, 136, 0.3)` | Green glow effect         |
| `--glow-cyan`       | `0 0 20px rgba(0, 212, 255, 0.3)` | Cyan glow effect          |

### Light Mode Overrides

| Token              | Value                          |
| ------------------- | ------------------------------ |
| `--bg-primary`      | `#f0f2f5`                      |
| `--bg-secondary`    | `#ffffff`                      |
| `--bg-tertiary`     | `#e8eaf0`                      |
| `--text-primary`    | `#1a1a2e`                      |
| `--text-secondary`  | `#555568`                      |
| `--text-heading`    | `#0a0a0f`                      |
| `--glass-bg`        | `rgba(255, 255, 255, 0.6)`     |
| `--glass-border`    | `rgba(0, 0, 0, 0.1)`          |
| `--accent-primary`  | `#00cc6a`                      |
| `--accent-secondary`| `#0099cc`                      |

### Typography

| Element     | Font                    | Size   | Weight |
| ----------- | ----------------------- | ------ | ------ |
| Headings    | `'Orbitron', sans-serif` | 2–4rem | 700-900 |
| Body        | `'Rajdhani', sans-serif` | 1rem   | 400-500 |
| Code/Terminal | `'Fira Code', monospace` | 0.9rem | 400   |
| Nav/Labels  | `'Rajdhani', sans-serif` | 0.9rem | 600   |

### Glassmorphism Card Style

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: var(--glass-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
```

---

## 🏗️ Architecture

### Technology Stack

| Layer       | Technology                           |
| ----------- | ------------------------------------ |
| Structure   | HTML5 (semantic, accessible)         |
| Styling     | Vanilla CSS (custom properties, grid, flexbox) |
| Logic       | Vanilla JavaScript (ES6+)            |
| 3D Engine   | Three.js (CDN) for 3D icons, character, and effects |
| Animations  | CSS keyframes + Intersection Observer API + GSAP-like custom tweens |
| Icons       | Lucide Icons (CDN)                   |
| Fonts       | Google Fonts (Orbitron, Rajdhani, Fira Code) |
| Contact Form| Web3Forms (free, no server needed)   |

### File Structure

```
Portfolio/
├── index.html              # Main HTML (single page)
├── css/
│   ├── style.css           # Design tokens, layout, all component styles
│   └── animations.css      # Keyframe animations & scroll-triggered styles
├── js/
│   ├── main.js             # Core logic: nav, theme toggle, scroll, magnetic buttons
│   ├── animations.js       # Intersection Observer scroll animations + text scramble
│   ├── particles.js        # Interactive particle network background
│   ├── terminal.js         # Playable terminal in hero section
│   ├── character.js        # 3D character controller (reactions, idle, typing)
│   ├── three-scene.js      # Three.js scene setup for 3D tech icons
│   ├── tilt.js             # Mouse-tracking 3D tilt effect for cards
│   ├── cursor.js           # Custom neon cursor trail
│   └── loader.js           # Hacker boot sequence loading screen
├── assets/
│   ├── resume.pdf          # Downloadable resume
│   └── images/             # Any static images needed
├── resume.txt              # Source resume
└── task.md                 # This plan
```

---

## 🌟 STANDOUT FEATURES (What Makes This Portfolio Unforgettable)

### 🔊 Feature 1: Hacker Boot Sequence (Loading Screen)
- **What**: When the page first loads, a fullscreen terminal-style boot sequence plays
- **Details**:
  - Black screen with green monospace text
  - Lines appear rapidly like a system booting:
    ```
    [OK] Initializing neural network...
    [OK] Loading security protocols...
    [OK] Decrypting portfolio data...
    [OK] Establishing secure connection...
    [██████████████████████] 100%
    > Access Granted. Welcome.
    ```
  - Progress bar fills up
  - After 2-3 seconds, screen fades/glitches away to reveal the actual site
  - Only plays on first visit (uses `sessionStorage` to skip on reload)

### ⌨️ Feature 2: Playable Terminal (Hero Section)
- **What**: A real interactive terminal embedded in the hero section
- **Details**:
  - Looks like a real terminal window with title bar (`aman@portfolio:~$`)
  - Visitors can type commands and get responses:
    - `help` → Lists available commands
    - `about` → Shows a brief bio
    - `skills` → Lists technical skills with ASCII art
    - `projects` → Lists project names and descriptions
    - `contact` → Shows contact info
    - `clear` → Clears terminal
    - `sudo hire-me` → Fun response: "Permission granted! Sending resume..."
    - `hack` → Triggers a fun "hacking animation" easter egg across the screen
    - Unknown commands → `Command not found. Type 'help' for available commands.`
  - Green blinking cursor
  - Scrollable output area
  - Auto-types initial greeting on page load

### 🎮 Feature 3: Interactive 3D Character
- **What**: A stylized 3D character (low-poly hacker) built with Three.js
- **Behavior**:
  - **Idle**: Subtle breathing animation, occasionally looks around
  - **Mouse tracking**: Head/eyes follow the user's cursor across the screen
  - **Contact form typing**: When the user types in the contact form, the character starts typing on a laptop too (mirroring the action)
  - **Scroll reaction**: Character waves when About section is reached
  - **Hover reaction**: Character perks up (slight lean forward) when hovering over project cards
- **Implementation**: Built with Three.js using basic geometric shapes (cylinders, spheres, boxes) — a stylized robot/hacker figure, not a complex model. This keeps it lightweight and doesn't require external 3D model files.
- **Placement**: Fixed position on the right side of hero, follows along as a small floating companion in the bottom-right corner as user scrolls past hero

### 🧊 Feature 4: 3D Rotating Tech Icons
- **What**: Each technology/skill is displayed as a floating, slowly rotating 3D icon
- **Details**:
  - Built with Three.js or CSS 3D transforms
  - Each icon is a 3D extruded shape (e.g., Python logo as a 3D object, or a stylized letter/symbol)
  - Icons float with a subtle bobbing animation
  - On hover: icon spins faster, emits a glow, and shows the skill name tooltip
  - Arranged in a circular orbit or grid layout
  - Fallback: For performance, use CSS 3D transforms with pseudo-3D cube faces showing tech logos

### 🧲 Feature 5: Magnetic Buttons
- **What**: CTA buttons subtly attract toward the cursor when the mouse is within ~100px radius
- **Details**:
  - Uses `mousemove` listener to calculate distance
  - Button translates slightly toward cursor (max 10px offset)
  - Snaps back with elastic easing when cursor leaves the radius
  - Applied to: Hero CTAs, Submit button, social icons

### 🔤 Feature 6: Text Scramble/Decode Effect
- **What**: Section titles appear as scrambled random characters that "decode" into readable text
- **Details**:
  - When a section scrolls into view, the title starts as random glitch characters (`█▓░▒╔╗`)
  - Characters rapidly cycle through random symbols before settling on the correct letter
  - Decoding happens left-to-right with a slight stagger
  - Gives a "cracking a cipher" / "decryption" feel
  - Applied to all section headers

### ✨ Feature 7: Custom Neon Cursor + Trail
- **What**: Custom cursor with a glowing neon trail
- **Details**:
  - Default cursor hidden, replaced with a small neon-green dot
  - A trail of fading dots/glow follows the cursor
  - Trail color matches the current accent color
  - On hover over interactive elements: cursor expands into a ring
  - Desktop only (disabled on touch devices)

### 🕸️ Feature 8: Interactive Particle Network Background
- **What**: Floating particles connected by lines that react to the mouse
- **Details**:
  - Canvas-based particle system
  - Particles slowly drift and connect to nearby particles with lines
  - When mouse moves near particles, they gently push away (repel effect)
  - Clicking creates a brief pulse/explosion of new particles
  - Low opacity to keep content readable
  - Replaces the simpler matrix rain effect (more interactive and unique)

### 🔍 Feature 9: 3D Tilt Cards
- **What**: Project and certification cards respond to mouse position with 3D tilt
- **Details**:
  - As mouse moves over a card, it tilts in 3D toward the cursor
  - Creates a parallax depth effect (elements inside move at different rates)
  - Subtle light reflection/shine moves across the glass surface
  - Returns to flat with smooth spring animation on mouse leave
  - Max tilt: 10-15 degrees
  - Applied to: Project cards, cert badges, stat cards

### 🥚 Feature 10: Easter Eggs
- **What**: Hidden surprises that reward curious visitors
- **Details**:
  - **Konami Code** (↑↑↓↓←→←→BA): Triggers a Matrix "digital rain" takeover for 3 seconds
  - **Terminal `hack` command**: Triggers a faux "hacking other websites" animation overlay
  - **Click the logo 5 times**: Briefly inverts all colors with a glitch effect
  - **Secret CSS**: Hovering the footer copyright for 3 seconds reveals "Want to see the source? Check my GitHub!"

---

## 📐 Sections & Layout

### 1. 🔝 Navigation Bar (Fixed)

- **Position**: Fixed top, full-width, glass background with blur
- **Content**:
  - Left: Logo `<AK/>` in neon green monospace (clickable → scroll to top)
  - Center: Nav links — Home | About | Skills | Experience | Projects | Education | Certs | Contact
  - Right: Dark/Light toggle (sun/moon icon animated transition)
- **Behavior**:
  - Transparent initially, gains glass background on scroll
  - Active section highlighted with neon green underline (tracked via Intersection Observer)
  - Mobile: Hamburger menu → slide-in drawer with glass background
- **Hover Effects**: 
  - Nav links: text glows green, underline slides in from left
  - Logo: subtle glitch effect on hover
  - Toggle button: rotates 360° on click

### 2. 🦸 Hero Section

- **Layout**: Two-column (text + terminal left, 3D character right) on desktop; stacked on mobile
- **Left Column**:
  - **Playable Terminal Window** (see Feature 2 above)
    - With window chrome (dots, title bar)
    - Auto-types greeting on load
    - Visitors can interact
  - Below terminal:
    - Name: **Aman Kumar** (large, Orbitron, gradient text green→cyan)
    - Title: `Cybersecurity Researcher & Developer` with scramble decode effect
    - CTA buttons (magnetic + glass-card style):
      - `[ ◈ View My Work ]` → scrolls to Projects (neon green border)
      - `[ ↓ Download Resume ]` → downloads PDF (cyan border)
    - Social icons row: [GitHub](https://github.com/amank007) | [LinkedIn](https://linkedin.com/in/k-aman7) | Email
- **Right Column**:
  - 3D Interactive Character (see Feature 3)
  - Neon glow ring behind character
- **Background**: Interactive particle network (see Feature 8)

### 3. 👤 About Me Section

- **Section title**: `> about_me` with scramble decode animation
- **Layout**: Glass card with two columns — text left, decorative right
- **Content**:
  - 2-3 paragraphs crafted from resume:
    - Currently pursuing M.Tech in Cyber Security at DIAT, Pune (a premier Defence institute)
    - Cybersecurity Intern at DRDO — working on real-world defence security systems
    - Passionate about penetration testing, reverse engineering, and building secure digital infrastructure
    - B.Tech CS foundation with hands-on project experience spanning IoT, web systems, and ML-based security
  - Key stats in glass mini-cards (with count-up animation):
    - `2+` Years in Cybersecurity
    - `3+` Projects Built
    - `5+` Certifications
    - `GATE` CS Qualified
- **3D Character**: Waves or gives thumbs up when this section is in view
- **Hover Effect**: Stat cards pulse glow and scale up

### 4. 🛠️ Skills Section

- **Section title**: `> technical_skills` with scramble decode
- **Layout**: Full-width section with categorized groups in glass cards
- **Categories**:
  1. **Languages**: C, C++, Java, Python, JavaScript, Bash, SQL, HTML
  2. **Security Tools**: Burp Suite, Nmap, Wireshark, Metasploit, Ghidra
  3. **Cloud & DevOps**: AWS, Azure, Git, Docker, VMware
  4. **OS**: Linux, Windows
  5. **Core Concepts**: TCP/IP, OSI Model, Network Security, Reverse Engineering, Web Pen Testing
- **Display**: Each skill as a **3D rotating icon** (see Feature 4) — a floating cube/shape with the tech name
- **Animation**: Icons materialize one-by-one with staggered timing on scroll
- **Hover Effect**: Icon spins faster, emits neon glow, name tooltip appears

### 5. 💼 Experience Section

- **Section title**: `> work_experience` with scramble decode
- **Layout**: Vertical timeline with glass cards
- **Entry**:
  - **Cyber Security Intern — DRDO** (Jul 2025 – Present)
    - Glass card with role details
    - Brief description of cybersecurity work at India's defence R&D org
    - Tech tags
    - DRDO logo/icon area
- **Timeline Design**: Vertical neon-green gradient line, glowing dots at nodes
- **Animation**: Timeline draws itself on scroll (line grows downward), cards slide in from alternating sides
- **Hover Effect**: Card border glows, timeline node pulses, card tilts (3D tilt)

### 6. 🚀 Projects Section

- **Section title**: `> my_projects` with scramble decode
- **Layout**: Grid of 3D tilt cards (responsive: 3→2→1 cols)
- **Project Cards** (glassmorphism + 3D tilt effect):
  1. **Smart Hydroponics CPS** (Mar–Apr 2025)
     - Icon: 🌱 or plant/circuit icon
     - Description: Built a portable CPS integrating environmental sensors for real-time monitoring. Implemented automation for pumps, fans, and lighting. Developed a web dashboard for visualization and analytics.
     - Tech: Python, MariaDB, HTML, CSS, JavaScript
     - Links: GitHub
  2. **Thesis Management System** (Sep–Dec 2023)
     - Icon: 📄 or document/gear icon
     - Description: Developed a centralized portal for thesis submission and SAC management. Implemented real-time tracking for submission statuses. Digitized university-wide thesis procedures.
     - Tech: PHP, MySQL, HTML, CSS, JavaScript
     - Links: GitHub
  3. **Malware Log Analysis** (Mar–May 2023)
     - Icon: 🔍 or shield/bug icon
     - Description: Trained ML models to detect malware using system log analysis. Improved threat identification accuracy and reduced security risks.
     - Tech: Python, ML
     - Links: GitHub
- **Card Design**: Glass card with animated gradient top border, project icon, description, stacked tech pills, action button
- **Animation**: Cards fade + scale in with stagger on scroll
- **Hover Effect**: 3D tilt following mouse, light reflection moves across surface, shadow deepens

### 7. 🎓 Education Section

- **Section title**: `> education` with scramble decode
- **Layout**: Two glass cards side by side (stacked on mobile), with 3D tilt
- **Cards**:
  1. **M.Tech Cyber Security** — DIAT (Defence Institute of Advanced Technology), Pune
     - Jul 2024 – Present
     - CGPA: 7.8 (animated circular progress ring with neon glow)
  2. **B.Tech Computer Science** — SHUATS, Prayagraj
     - Apr 2020 – Jun 2024
     - CGPA: 7.9 (animated circular progress ring)
- **Design**: Glass card with institution name, degree, dates, and an animated SVG circular progress ring for CGPA
- **Hover Effect**: Scale + glow + 3D tilt

### 8. 🏆 Certifications Section

- **Section title**: `> certifications` with scramble decode
- **Layout**: Flex grid of glass badge cards (responsive wrapping)
- **Badges**:
  1. 🏅 GATE CS 2024 — Qualified
  2. 🔓 Ethical Hacking — IIT Kharagpur
  3. ☁️ Azure Fundamentals — Microsoft
  4. 🛡️ Cybersecurity Tools & Cyber Attacks — IBM
  5. 📊 Cyber Security Management VEP — ANZ
- **Design**: Each badge is a compact glass card with emoji icon, cert name, and issuer
- **Animation**: Badges slide in with stagger on scroll
- **Hover Effect**: Badge scales up, green glow border, 3D tilt

### 9. 📬 Contact Section

- **Section title**: `> contact_me` with scramble decode
- **Layout**: Two columns — info left, form right (stacked on mobile)
- **Left Column**:
  - "Let's Work Together" heading
  - "Have a project idea or want to discuss cybersecurity? Reach out!"
  - Contact details:
    - 📧 kaman000k@gmail.com
    - 📱 +91 9305663953
    - 🔗 [LinkedIn](https://linkedin.com/in/k-aman7)
    - 🐙 [GitHub](https://github.com/amank007)
    - 📍 Pune, Maharashtra, India
- **Right Column (Contact Form)** — Glass card:
  - Name input
  - Email input
  - Subject input
  - Message textarea
  - Submit button (neon green, magnetic effect)
  - Uses **Web3Forms** (free tier, no server needed, API key based)
  - Client-side validation with animated error states (red glow + shake)
  - Success: green pulse + "Message sent!" overlay
- **Input styling**: Dark transparent backgrounds, neon-green focus borders with glow, terminal-cursor caret
- **3D Character Reaction**: When user types in the form, the 3D character (floating in bottom-right corner) starts typing on its laptop, mirroring the user's action
- **Hover Effect**: Submit button glow intensifies + magnetic pull

### 10. 🔻 Footer

- **Design**: Minimalist, glass background strip
- **Content**:
  - `<AK/>` logo (left)
  - Quick nav links (center)
  - Social icons: GitHub, LinkedIn, Email (right)
  - `© 2025 Aman Kumar | Crafted with ☕ & 💻`
  - Animated "Back to Top" arrow button (floats above footer)
- **Easter Egg**: Hover copyright text for 3 seconds → reveals "Check out the source on GitHub!"

---

## ✨ Full Animation & Effects Catalog

### Page Load
| Effect | Description |
|---|---|
| Boot sequence | Fake terminal loading screen (2-3s) |
| Content reveal | Staggered fade-in of hero elements after boot |
| Particle init | Background particles fade in |
| Terminal auto-type | Greeting types itself in the playable terminal |

### Scroll Animations (Intersection Observer)
| Element          | Animation                          | Trigger     |
| ---------------- | ---------------------------------- | ----------- |
| Section titles   | Text scramble decode               | On scroll into view |
| Glass cards      | Fade in + scale from 0.9 → 1      | On scroll   |
| Skill 3D icons   | Materialize + start rotating       | On scroll   |
| Timeline line    | Draws downward (height grows)      | On scroll   |
| Timeline cards   | Slide in from left/right           | On scroll   |
| Cert badges      | Slide up with 100ms stagger        | On scroll   |
| Stats numbers    | Count-up from 0 to value           | On scroll   |
| CGPA rings       | SVG stroke draws from 0 to value   | On scroll   |
| 3D character     | Context-specific reaction per section | On scroll |

### Hover Effects
| Element         | Effect                                     |
| --------------- | ------------------------------------------ |
| Glass cards     | 3D tilt + light reflection + green glow border |
| Nav links       | Green text glow, underline slide-in        |
| Logo            | Subtle glitch effect                       |
| Skill icons     | Spin faster, emit glow                     |
| CTA buttons     | Magnetic pull + scale 1.03 + glow          |
| Social icons    | Scale 1.2, color → accent, glow           |
| Project cards   | Deep 3D tilt + shadow intensify            |
| Cert badges     | Scale up + glow border                     |
| Stat cards      | Pulse glow + scale                         |
| Form inputs     | Green border glow on focus                 |
| Submit button   | Magnetic + glow pulse                      |
| Footer copyright| (3s hold) Reveal easter egg message        |

### Continuous Animations
| Effect | Description |
|---|---|
| Particle network | Drifting, connecting, mouse-reactive |
| 3D character idle | Breathing, looking around |
| Tech icons | Slow rotation, floating bob |
| Cursor trail | Neon glow following mouse |

---

## 🌓 Dark / Light Mode Toggle

- **Default**: Dark mode (the cyber terminal aesthetic)
- **Toggle**: Animated sun↔moon icon in navbar
- **Implementation**: 
  - `data-theme="light"` attribute on `<html>`
  - All colors via CSS custom properties — instant switch
  - Saved to `localStorage` (persists across sessions)
  - Smooth 0.4s transition on all color properties
- **Light Mode adjustments**:
  - Softer backgrounds (light gray/white)
  - Darker text
  - Muted accent colors (less neon, more refined)
  - Particle network opacity reduced
  - Cursor trail adapts to dark color
  - 3D icons adjust material colors

---

## 📱 Responsive Breakpoints

| Breakpoint | Target          | Key Changes                              |
| ---------- | --------------- | ---------------------------------------- |
| `> 1200px` | Desktop         | Full layout, 3-col grids, side-by-side, all 3D effects |
| `768–1200` | Tablet          | 2-col grids, reduced spacing, 3D effects simplified |
| `< 768px`  | Mobile          | Single column, hamburger nav, stacked hero, character hidden or miniaturized |
| `< 480px`  | Small mobile    | Reduced font sizes, compact cards, cursor trail disabled |

### Mobile-Specific
- Custom cursor & trail: disabled (touch devices)
- 3D tilt: disabled (no mouse)
- Magnetic buttons: disabled
- Character: small floating version or hidden
- Particle count: reduced for performance
- Terminal: still interactive (touch keyboard)

---

## 🔗 External Links & URLs

| Item           | URL                                    |
| -------------- | -------------------------------------- |
| GitHub         | https://github.com/amank007            |
| LinkedIn       | https://linkedin.com/in/k-aman7       |
| Email          | kaman000k@gmail.com                   |
| Phone          | +91 9305663953                         |
| Resume (PDF)   | ./assets/resume.pdf                   |

---

## 📦 Implementation Phases

### Phase 1: Foundation & Core Setup
- [ ] Create folder structure (css/, js/, assets/)
- [ ] Set up `index.html` with full semantic structure, meta tags, Open Graph
- [ ] Create `css/style.css` with complete design system (tokens, base, layout)
- [ ] Create `css/animations.css` with all keyframe definitions
- [ ] Import fonts (Orbitron, Rajdhani, Fira Code) from Google Fonts
- [ ] Import Three.js from CDN
- [ ] Import Lucide Icons from CDN
- [ ] Set up dark/light theme toggle with CSS custom properties

### Phase 2: Loading Screen & Navigation
- [ ] Build hacker boot sequence loader (`js/loader.js`)
- [ ] Build fixed glassmorphism navbar
- [ ] Implement hamburger menu for mobile
- [ ] Active section tracking via Intersection Observer
- [ ] Dark/light toggle with localStorage persistence
- [ ] Smooth scroll behavior

### Phase 3: Hero Section & Terminal
- [ ] Build playable terminal component (`js/terminal.js`)
- [ ] Terminal commands: help, about, skills, projects, contact, clear, sudo hire-me, hack
- [ ] Hero layout with name, title, CTAs, social links
- [ ] Magnetic button effect (`js/main.js`)
- [ ] Terminal auto-greeting on page load

### Phase 4: 3D Character
- [ ] Build 3D character with Three.js (`js/character.js`)
- [ ] Character geometry: head, body, arms, legs from basic shapes
- [ ] Idle animation (breathing, looking around)
- [ ] Mouse-tracking (head follows cursor)
- [ ] Contact form typing reaction
- [ ] Scroll-based reactions (wave at about section)
- [ ] Responsive: minimize/hide on mobile

### Phase 5: Content Sections (Part 1)
- [ ] About Me section with bio and animated stat cards
- [ ] Skills section with all categories
- [ ] 3D rotating tech icons (`js/three-scene.js`)
- [ ] Experience section with animated timeline

### Phase 6: Content Sections (Part 2)
- [ ] Projects section with 3D tilt cards (`js/tilt.js`)
- [ ] Education section with CGPA progress rings (SVG animated)
- [ ] Certifications section with badge cards
- [ ] Contact section with form + Web3Forms integration
- [ ] Form validation with animated error states
- [ ] Footer with all links and easter egg

### Phase 7: Effects & Polish
- [ ] Interactive particle network background (`js/particles.js`)
- [ ] Custom neon cursor trail (`js/cursor.js`)
- [ ] Text scramble/decode effect for section titles (`js/animations.js`)
- [ ] Scroll-triggered animations via Intersection Observer
- [ ] Count-up animation for stat numbers
- [ ] Easter eggs (Konami code, terminal hack command, logo click)
- [ ] Staggered animation timing for all card/badge groups

### Phase 8: Responsive & Performance
- [ ] Responsive styles for all 4 breakpoints
- [ ] Mobile hamburger menu animation
- [ ] Touch device adaptations (disable cursor, tilt, magnetic)
- [ ] Performance: reduce particle count on mobile
- [ ] Performance: lazy initialize Three.js scenes
- [ ] Cross-browser testing
- [ ] Accessibility: ARIA labels, keyboard navigation, focus styles
- [ ] SEO: meta tags, Open Graph, semantic HTML
- [ ] Final deploy-ready check

---

## ✅ Complete Feature Checklist

### Core
- [ ] Cyber Terminal aesthetic (neon green/cyan, dark theme)
- [ ] Glassmorphism cards throughout
- [ ] All 10 sections implemented
- [ ] GitHub (amank007) & LinkedIn links
- [ ] Fully responsive (4 breakpoints)
- [ ] Dark/Light mode with persistence
- [ ] Resume download button (PDF)
- [ ] Working contact form (Web3Forms)
- [ ] SEO optimized
- [ ] Static hosting ready

### Standout Features
- [ ] Hacker boot sequence loading screen
- [ ] Playable terminal with commands
- [ ] Interactive 3D character (mouse tracking, typing reaction, scroll reactions)
- [ ] 3D rotating tech icons for skills
- [ ] Magnetic CTA buttons
- [ ] Text scramble/decode on section titles
- [ ] Custom neon cursor with trail
- [ ] Interactive particle network background
- [ ] 3D tilt cards with light reflection
- [ ] Easter eggs (Konami, hack command, logo click, footer)

### Animations
- [ ] Scroll-triggered reveals (fade, slide, scale)
- [ ] Count-up stat animations
- [ ] CGPA ring draw animations
- [ ] Timeline draw animation
- [ ] Staggered badge/card reveals
- [ ] Terminal typing effect
- [ ] Subtle hover effects on ALL interactive elements
