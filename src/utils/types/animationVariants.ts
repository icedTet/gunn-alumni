import { Variants } from "framer-motion";

export const animateTitle = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0,
      type: "spring",
      bounce: 0.4,
    },
  },
};
export const animateData = (delay: number, staggerDelay: number) => ({
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        when: "afterChildren",
        staggerChildren: staggerDelay,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: delay,
        when: "beforeChildren",
        staggerChildren: staggerDelay,
      },
    },
  },
});
export const animateEntry = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.3,
    },
  },
} as Variants;
export const animateEntryDown = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.3,
    },
  },
} as Variants;
