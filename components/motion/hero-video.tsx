"use client";

import { useEffect, useRef } from "react";

/** Short decorative introduction; never starts when reduced motion is requested. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => video.pause();
    const update = () => { if (preference.matches) stop(); };
    if (!preference.matches) void video.play().catch(() => {});
    const timer = window.setTimeout(stop, 4500);
    preference.addEventListener("change", update);
    return () => { stop(); clearTimeout(timer); preference.removeEventListener("change", update); };
  }, []);
  return <video ref={ref} aria-hidden="true" className="home-hero-video" muted playsInline poster="/eclipse-electrical-grid.webp" preload="none"><source src="/eclipse-electrical-ambient.mp4" type="video/mp4" /></video>;
}
