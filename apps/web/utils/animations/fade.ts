export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;
export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;
export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;
export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;
export const fadeOut = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;
export const fadeOutUp = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;
export const fadeOutDown = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;
