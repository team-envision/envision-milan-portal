export const slideInLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7 },
  },
} as const;

export const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7 },
  },
} as const;

export const slideOutLeft = {
  hidden: { x: 0, opacity: 1 },
  visible: {
    x: -60,
    opacity: 0,
    transition: { duration: 0.7 },
  },
} as const;

export const slideOutRight = {
  hidden: { x: 0, opacity: 1 },
  visible: {
    x: 60,
    opacity: 0,
    transition: { duration: 0.7 },
  },
} as const;
