import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * SectionTransition — wraps each portfolio section with a smooth, 
 * scroll-triggered fade-in + slide-up + subtle scale transition.
 * 
 * It uses Framer Motion's useScroll to track the element's viewport position,
 * creating a buttery-smooth parallax entrance and exit effect.
 */
const SectionTransition = ({ children, offset = 60, index = 0 }) => {
  const ref = useRef(null);

  // Track how far the section is within the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"], // start animating when bottom edge enters → fully in at 30% from top
  });

  // Smooth spring physics for that "buttery" feel
  const spring = { stiffness: 60, damping: 20, mass: 0.8 };

  // Opacity: 0 → 1 as section scrolls into view
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useSpring(rawOpacity, spring);

  // Y translation: slides up from `offset`px → 0
  const rawY = useTransform(scrollYProgress, [0, 1], [offset, 0]);
  const y = useSpring(rawY, spring);

  // Subtle scale: 0.97 → 1 for a gentle "grow in" effect
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const scale = useSpring(rawScale, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
        scale,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;
