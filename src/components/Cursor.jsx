import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const Cursor = () => {
  // Mouse position track karne ke liye state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smoothness ke liye useSpring use karenge (Isse 'parallel' wala smooth feel aayega)
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Dot ko cursor ke center mein lane ke liye coordinates update
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

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