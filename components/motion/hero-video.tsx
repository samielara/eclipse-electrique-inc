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
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // Keep the branded master electrician and van hero visible without video per user request
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
    <video
      ref={ref}
      aria-hidden="true"
      className={`home-hero-video${isVideoReady ? " is-playing" : " is-buffering"}`}
      loop
      muted
      onCanPlay={() => setIsVideoReady(true)}
      onLoadedData={() => setIsVideoReady(true)}
      onPlaying={() => setIsVideoReady(true)}
      playsInline
      poster="/media/eclipse-hero-electrician-v2.png"
      preload="none"
    >
      {shouldLoadVideo && <source src="/eclipse-electrical-ambient.mp4" type="video/mp4" />}
    </video>
  );
}
