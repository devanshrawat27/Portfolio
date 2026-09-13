import React, { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

const CursorGlow = () => {
  const springConfig = { damping: 30, stiffness: 100 };
  const glowX = useSpring(0, springConfig);
  const glowY = useSpring(0, springConfig);
  const [isDesktop, setIsDesktop] = React.useState(typeof window !== "undefined" && window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      // Center the glow on cursor position
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [glowX, glowY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        x: glowX,
        y: glowY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(163, 230, 53, 0.08) 0%, rgba(163, 230, 53, 0.03) 35%, transparent 70%)",
        filter: "blur(30px)",
        willChange: "transform",
      }}
    />
  );
};

export default CursorGlow;
