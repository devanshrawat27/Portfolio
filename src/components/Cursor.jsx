import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const Cursor = () => {
  // Mouse position track karne ke liye state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" && window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "12px", // Dot ka size
        height: "12px",
        backgroundColor: "#a3e635", // Wahi lime green color
        borderRadius: "50%",
        pointerEvents: "none", // Taaki click niche wale elements pe kaam kare
        zIndex: 10000, // Sabse upar dikhne ke liye
        x: cursorX,
        y: cursorY,
        boxShadow: "0 0 10px rgba(163, 230, 53, 0.5)", // Halka glow
      }}
    />
  );
};

export default Cursor;