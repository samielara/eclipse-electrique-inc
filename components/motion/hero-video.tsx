"use client";

import { useEffect, useRef, useState } from "react";

type ConnectionInfo = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (event: "change", listener: () => void) => void;
  removeEventListener?: (event: "change", listener: () => void) => void;
};

/** The still image is the initial paint; the decorative loop waits for a suitable connection. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: ConnectionInfo }).connection;
    // Keep the branded master electrician hero visible on modern browsers
    setShouldLoadVideo(false);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !shouldLoadVideo) return;
    video.load();
    void video.play().catch(() => {});
    return () => video.pause();
  }, [shouldLoadVideo]);

  return (
    <video ref={ref} aria-hidden="true" className="home-hero-video" loop muted playsInline poster="/media/eclipse-hero-electrician-v2.png" preload="none">
      {shouldLoadVideo && <source src="/eclipse-electrical-ambient.mp4" type="video/mp4" />}
    </video>
  );
}
