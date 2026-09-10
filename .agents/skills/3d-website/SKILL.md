---
name: 3d-website
description: Instructions and best practices for creating 3D animated, interactive websites using Spline 3D embeds, 3D WebGL scenes, Bento Box layouts, and scroll depth animations in Antigravity.
---

# 3D Website Development with AntiGravity & Spline

This skill documents the methodology popularized by Jack Roberts for transforming standard web applications into immersive 2026 3D interactive experiences using **AntiGravity**, **Spline**, and **3D WebGL / CSS Transforms**.

## 1. Core Architectural Pillars

### A. The 3D Scene Layer (Hero & Background)
- **Full-Screen Canvas**: Position the 3D scene in an absolute background layer (`inset: 0`, `z-index: 1` or `0`) with a non-blocking pointer events structure or interactive pointer listener on the hero wrapper.
- **Dynamic Mouse Tracking**:
  - Track cursor coordinates `(x, y)` normalized from `[-0.5, 0.5]`.
  - Pass mouse coordinates to CSS custom properties (`--mouse-x`, `--mouse-y`, `--hero-depth-x`, `--hero-depth-y`) or directly to the 3D WebGL / Spline camera pitch and yaw.
- **Spline Web Component Integration**:
  - Official web component: `<spline-viewer url="https://prod.spline.design/.../scene.splinecode"></spline-viewer>`
  - Dynamic module loader: Ensure dynamic script injection of `@splinetool/viewer` runs on client mount to prevent SSR hydration errors.
- **Seamless Multi-Stage Loading**:
  - Step 1: Render a lightweight, high-contrast cutout subject or poster immediately on SSR.
  - Step 2: Initialize WebGL / Spline runtime in the background.
  - Step 3: Once `onCanPlay`, `onLoadedData`, or Spline `load` fires, smoothly fade the 3D scene in with `transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)`.

### B. Vibe Design & Bento Box 3D Grids
- **Bento Card Structure**:
  - Group features into modular asymmetrical cards with subtle borders (`border: 1px solid rgba(255, 255, 255, 0.08)` in dark mode, `rgba(0, 0, 0, 0.08)` in light mode).
  - High backdrop saturation & blur: `backdrop-filter: blur(24px) saturate(180%)`.
- **Tactile 3D Card Hover Tilt**:
  - Container: `perspective: 1200px; transform-style: preserve-3d;`
  - On mouse hover: calculate rotation angles:
    `rotateX = ((mouseY - centerY) / height) * -12deg`
    `rotateY = ((mouseX - centerX) / width) * 12deg`
  - Floating inner elements (icons, badges, titles): add `transform: translateZ(18px)` for true physical depth separation.
  - Specular lighting: overlay a radial gradient tracking cursor position:
    `background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(245, 158, 11, 0.15), transparent 60%)`

### C. 3D Scroll Depth Animations
- **Perspective Enclosure**:
  - Wrap scrollable sections in a 3D perspective context (`perspective: 1400px`).
- **3D Entry Transitions**:
  - Hidden state:
    `transform: perspective(1400px) rotateX(7deg) translateY(36px) scale(0.97); opacity: 0;`
  - Visible state:
    `transform: perspective(1400px) rotateX(0deg) translateY(0) scale(1); opacity: 1;`
    `transition: transform 720ms cubic-bezier(0.16, 1, 0.3, 1), opacity 720ms ease;`
- **Staggered Delays**: Stagger sibling cards by 90ms intervals for an organic cascade.

## 2. Accessibility & Graceful Degradation
- **`prefers-reduced-motion: reduce`**:
  - Disable mouse-follow camera orbit and 3D card tilt.
  - Force all transforms to `none` and transitions to `0s`.
- **Low-Power / Mobile Devices**:
  - Fallback to optimized CSS transforms and static high-resolution imagery when bandwidth or GPU is constrained.
