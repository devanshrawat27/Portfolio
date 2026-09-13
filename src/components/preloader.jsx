import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

const Preloader = ({ onComplete }) => {
  const [dimension, setDimension] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const updateDimension = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimension();
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []);

  // Lock background scroll during preloader
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Fast, silky smooth counter from 0 to 100 in ~1.0 second
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step =
        current < 30 ? 5 :
        current < 75 ? 7 :
        current < 94 ? 5 : 2;

      current = Math.min(current + step, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
        }, 180);
      }
    }, 24);

    return () => clearInterval(interval);
  }, []);

  const w = dimension.width;
  const h = dimension.height;
  const curveDepth = Math.min(300, Math.round(h * 0.32));

  // The Dennis Snellenberg fluid curtain path
  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;
  const curvePath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + curveDepth} 0 ${h} L0 0`;

  return (
    <motion.div
      key="snellenberg-curtain"
      initial={{ y: 0 }}
      animate={isExiting ? { y: -(h + curveDepth) } : { y: 0 }}
      transition={{
        duration: 0.85,
        ease: EASE,
      }}
      onAnimationComplete={() => {
        if (isExiting) {
          onComplete();
        }
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        pointerEvents: isExiting ? "none" : "all",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Liquid curved SVG curtain */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `${h + curveDepth}px`,
          pointerEvents: "none",
        }}
      >
        <motion.path
          initial={{ d: initialPath }}
          animate={isExiting ? { d: curvePath } : { d: initialPath }}
          transition={{
            duration: 0.85,
            ease: EASE,
          }}
          fill="#0a0a0c"
        />
      </svg>

      {/* Center Minimalist Luxury Counter - Perfectly Dead-Centered */}
      <motion.div
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -20 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          userSelect: "none",
        }}
      >
        {/* Subtle breathing dot + Number */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.span
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#a3e635",
              display: "inline-block",
              boxShadow: "0 0 10px rgba(163,230,53,0.7)",
            }}
          />

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.12em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {progress.toString().padStart(2, "0")}%
          </span>
        </div>

        {/* Ultra-thin hairline progress track */}
        <div
          style={{
            width: "140px",
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            position: "relative",
            overflow: "hidden",
            borderRadius: "1px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${progress}%`,
              backgroundColor: "#a3e635",
              boxShadow: "0 0 8px #a3e635",
              transition: "width 0.04s linear",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
