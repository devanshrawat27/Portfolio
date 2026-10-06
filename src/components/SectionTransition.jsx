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

  // Spring physics optimized for instant, silky responsiveness
  const spring = { stiffness: 80, damping: 24, mass: 0.5 };

  // Opacity: 0.2 → 1 as section scrolls into view
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const opacity = useSpring(rawOpacity, spring);

  // Y translation: smooth slide up with minimal distance to reduce GPU composite cost
  const rawY = useTransform(scrollYProgress, [0, 1], [Math.min(offset, 40), 0]);
  const y = useSpring(rawY, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
        transform: "translateZ(0)",
      }}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;
