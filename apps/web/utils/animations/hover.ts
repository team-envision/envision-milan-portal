export const hoverScale = {
  rest: { scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
} as const;
export const hoverLift = {
  rest: {
    y: 0,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    y: -5,
    boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const;
export const hoverRotate = {
  rest: { rotate: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { rotate: 5, transition: { duration: 0.3, ease: "easeOut" } },
} as const;
export const hoverGlow = {
  rest: {
    boxShadow: "0px 0px 0px rgba(255,255,255,0)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    boxShadow: "0px 0px 8px rgba(255,255,255,0.8)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const;
export const hoverPulse = {
  rest: { scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  hover: {
    scale: 1.1,
    transition: { duration: 0.6, ease: "easeOut", yoyo: Infinity },
  },
} as const;
export const hoverBorderColor = {
  rest: {
    borderColor: "rgba(0,0,0,0.2)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    borderColor: "rgba(0,0,0,0.8)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const;
export const hoverBrightness = {
  rest: {
    filter: "brightness(1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    filter: "brightness(1.2)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const;
export const hoverShadow = {
  rest: {
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    boxShadow: "0px 12px 24px rgba(0,0,0,0.2)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const;
export const hoverSkew = {
  rest: { skew: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { skew: 5, transition: { duration: 0.3, ease: "easeOut" } },
} as const;
export const hoverTranslateY = {
  rest: { y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { y: -10, transition: { duration: 0.3, ease: "easeOut" } },
} as const;
export const hoverTranslateX = {
  rest: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { x: 10, transition: { duration: 0.3, ease: "easeOut" } },
} as const;
export const hoverOpacity = {
  rest: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { opacity: 0.8, transition: { duration: 0.3, ease: "easeOut" } },
} as const;
export const hoverBackgroundColor = {
  rest: {
    backgroundColor: "rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    backgroundColor: "rgba(0,0,0,0.3)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const;
