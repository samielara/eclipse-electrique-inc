export const motionTokens = {
  duration: { quick: 0.16, standard: 0.24, entrance: 0.42 },
  ease: [0.22, 1, 0.36, 1] as const,
  distance: 6,
};

export const cinematicVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const;

export const cinematicTransition = {
  duration: 0.64,
  ease: [0.22, 1, 0.36, 1] as const,
} as const;

export function cinematicMotionProps(reducedMotion: boolean | null) {
  return reducedMotion
    ? {
        initial: false,
        animate: cinematicVariants.visible,
        transition: { duration: 0 },
      }
    : {
        initial: cinematicVariants.hidden,
        animate: cinematicVariants.visible,
        transition: cinematicTransition,
      };
}
