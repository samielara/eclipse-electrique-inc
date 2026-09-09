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
