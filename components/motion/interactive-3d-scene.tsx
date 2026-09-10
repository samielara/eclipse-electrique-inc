"use client";

import { useEffect, useRef, useState } from "react";

interface Interactive3DSceneProps {
  className?: string;
  splineUrl?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  energy: number;
}

export function Interactive3DScene({ className = "", splineUrl }: Interactive3DSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setHasReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setHasReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // If a Spline URL is supplied, load the official Spline viewer web component dynamically
  useEffect(() => {
    if (!splineUrl) return;
    const existingScript = document.querySelector('script[src*="spline-viewer.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
      script.onload = () => setIsSplineLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsSplineLoaded(true);
    }
  }, [splineUrl]);

  // High-performance 3D WebGL / Canvas interactive electricity and spatial node field
  useEffect(() => {
    if (splineUrl && isSplineLoaded) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth || 800);
    let height = (canvas.height = container.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate 3D spatial electric nodes
    const nodeCount = 42;
    const nodes: Point3D[] = [];
    const spreadX = width * 0.9;
    const spreadY = height * 0.85;
    const spreadZ = 450;

    for (let i = 0; i < nodeCount; i++) {
      const bx = (Math.random() - 0.5) * spreadX;
      const by = (Math.random() - 0.5) * spreadY;
      const bz = (Math.random() - 0.5) * spreadZ;
      nodes.push({
        x: bx,
        y: by,
        z: bz,
        baseX: bx,
        baseY: by,
        baseZ: bz,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        energy: Math.random() * 0.7 + 0.3,
      });
    }

    // Interactive mouse coordinates tracking in 3D
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let hasMouse = false;

    const handlePointerMove = (e: MouseEvent) => {
      hasMouse = true;
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = normX * 0.55; // yaw
      targetRotationX = -normY * 0.45; // pitch
      mouseX = (e.clientX - rect.left) - rect.width / 2;
      mouseY = (e.clientY - rect.top) - rect.height / 2;
    };

    const handlePointerLeave = () => {
      hasMouse = false;
      targetRotationX = 0;
      targetRotationY = 0;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);

    const focalLength = 500;
    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth camera interpolation (inertial damping)
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(currentRotationX);
      const sinX = Math.sin(currentRotationX);
      const cosY = Math.cos(currentRotationY);
      const sinY = Math.sin(currentRotationY);

      const projected: { x2d: number; y2d: number; scale: number; alpha: number; node: Point3D }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Idle floating motion
        if (!hasReducedMotion) {
          node.x += node.vx + Math.sin(time + i) * 0.2;
          node.y += node.vy + Math.cos(time + i * 0.7) * 0.2;
          node.z += node.vz;

          // Bounding box bounce
          if (Math.abs(node.x - node.baseX) > 60) node.vx *= -1;
          if (Math.abs(node.y - node.baseY) > 60) node.vy *= -1;
          if (Math.abs(node.z - node.baseZ) > 90) node.vz *= -1;
        }

        // 3D Rotation Matrix
        // Rotate Y (yaw)
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        // Rotate X (pitch)
        const y1 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        // Perspective projection
        const depth = focalLength + z2;
        if (depth <= 10) continue;

        const scale = focalLength / depth;
        const x2d = width / 2 + x1 * scale;
        const y2d = height / 2 + y1 * scale;

        const distanceAlpha = Math.max(0.12, Math.min(0.95, (z2 + spreadZ / 2) / spreadZ));

        projected.push({
          x2d,
          y2d,
          scale,
          alpha: distanceAlpha,
          node,
        });
      }

      // Draw 3D electrical conduits between proximate nodes
      const maxDistance = 140;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.x2d - p2.x2d;
          const dy = p1.y2d - p2.y2d;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const conduitAlpha = (1 - dist / maxDistance) * 0.32 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);

            // Subtle electric jitter
            if (dist < 80 && Math.random() > 0.88) {
              const midX = (p1.x2d + p2.x2d) / 2 + (Math.random() - 0.5) * 8;
              const midY = (p1.y2d + p2.y2d) / 2 + (Math.random() - 0.5) * 8;
              ctx.lineTo(midX, midY);
            }

            ctx.lineTo(p2.x2d, p2.y2d);
            ctx.strokeStyle = `rgba(245, 158, 11, ${conduitAlpha.toFixed(3)})`;
            ctx.lineWidth = Math.max(0.6, (p1.scale + p2.scale) * 0.65);
            ctx.stroke();
          }
        }
      }

      // Draw interactive electrical tether to mouse cursor if within range
      if (hasMouse && projected.length > 0) {
        const mouseX2d = width / 2 + mouseX;
        const mouseY2d = height / 2 + mouseY;

        // Find closest node to mouse
        let closestDist = Infinity;
        let closestNode = projected[0];

        for (const p of projected) {
          const d = Math.hypot(p.x2d - mouseX2d, p.y2d - mouseY2d);
          if (d < closestDist) {
            closestDist = d;
            closestNode = p;
          }
        }

        if (closestDist < 260) {
          const tetherAlpha = (1 - closestDist / 260) * 0.55;
          ctx.beginPath();
          ctx.moveTo(closestNode.x2d, closestNode.y2d);
          // 3-point lightning arc
          const arcX = (closestNode.x2d + mouseX2d) / 2 + (Math.random() - 0.5) * 14;
          const arcY = (closestNode.y2d + mouseY2d) / 2 + (Math.random() - 0.5) * 14;
          ctx.lineTo(arcX, arcY);
          ctx.lineTo(mouseX2d, mouseY2d);
          ctx.strokeStyle = `rgba(251, 191, 36, ${tetherAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Mouse cursor glow
          const radial = ctx.createRadialGradient(mouseX2d, mouseY2d, 0, mouseX2d, mouseY2d, 28);
          radial.addColorStop(0, `rgba(245, 158, 11, ${tetherAlpha.toFixed(3)})`);
          radial.addColorStop(1, "rgba(245, 158, 11, 0)");
          ctx.fillStyle = radial;
          ctx.beginPath();
          ctx.arc(mouseX2d, mouseY2d, 28, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw 3D nodes with radial energy cores
      for (const p of projected) {
        const radius = p.node.radius * p.scale;
        if (radius <= 0.2) continue;

        // Outer glow
        const glow = ctx.createRadialGradient(p.x2d, p.y2d, 0, p.x2d, p.y2d, radius * 3.8);
        glow.addColorStop(0, `rgba(245, 158, 11, ${(0.85 * p.alpha).toFixed(3)})`);
        glow.addColorStop(0.4, `rgba(217, 119, 6, ${(0.45 * p.alpha).toFixed(3)})`);
        glow.addColorStop(1, "rgba(217, 119, 6, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, radius * 3.8, 0, Math.PI * 2);
        ctx.fill();

        // Hot white core
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.95 * p.alpha).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, Math.max(0.6, radius * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      if (!hasReducedMotion && !document.hidden) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [splineUrl, isSplineLoaded, hasReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`interactive-3d-scene ${className}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {splineUrl && isSplineLoaded ? (
        // @ts-expect-error Custom element registered via script
        <spline-viewer url={splineUrl} style={{ width: "100%", height: "100%" }} />
      ) : (
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            mixBlendMode: "screen",
            opacity: 0.88,
          }}
        />
      )}
    </div>
  );
}
