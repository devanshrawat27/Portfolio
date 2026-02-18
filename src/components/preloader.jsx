import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MonolithPreloader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1200)); // Phase 0: The Core Pulse
      setPhase(1); 
      await new Promise(r => setTimeout(r, 1600)); // Phase 1: Welcome Snap
      setPhase(2); 
      await new Promise(r => setTimeout(r, 2500)); // Phase 2: Ultimate Reveal
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <div style={{ 
      position: "fixed", inset: 0, zIndex: 9999, 
      backgroundColor: "#000", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      
      <AnimatePresence mode="wait">
        {/* PHASE 0: THE CORE IGNITION */}
        {phase === 0 && (
          <motion.div
            key="core"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: 1 }}
            exit={{ scale: 10, opacity: 0 }}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#a3e635", boxShadow: "0 0 30px #a3e635" }}
          />
        )}

        {/* PHASE 1: THE KINETIC WELCOME (Split Text Effect) */}
        {phase === 1 && (
          <motion.div
            key="welcome-wrap"
            exit={{ y: -50, opacity: 0 }}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontSize: "clamp(3rem, 12vw, 9rem)",
                fontWeight: 900, color: "#fff",
                fontFamily: "Syncopate, sans-serif", letterSpacing: "15px",
                margin: 0, textTransform: "uppercase"
              }}
            >
              WELCOME
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ height: "1px", background: "rgba(163, 230, 53, 0.5)", width: "100%", marginTop: "10px" }}
            />
          </motion.div>
        )}

        {/* PHASE 2: THE MONOLITH IDENTITY (The "Wow" Part) */}
        {phase === 2 && (
          <motion.div
            key="identity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", position: "relative" }}
          >
            {/* The Light Leak Effect */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.2, 0.1], scale: [0.5, 1.5, 1.2] }}
              style={{
                position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%",
                width: "80vw", height: "80vh",
                background: "radial-gradient(circle, rgba(163, 230, 53, 0.15) 0%, transparent 70%)",
                zIndex: -1, pointerEvents: "none"
              }}
            />

            <motion.h1
              initial={{ letterSpacing: "30px", filter: "blur(15px)", opacity: 0 }}
              animate={{ letterSpacing: "2px", filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                fontSize: "clamp(2rem, 9vw, 6.5rem)",
                fontWeight: 900, color: "#fff",
                margin: 0, fontFamily: "Syncopate, sans-serif",
                lineHeight: 1
              }}
            >
              DEVANSH <span style={{ color: "#a3e635" }}>RAWAT</span>
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{ height: "2px", background: "linear-gradient(90deg, transparent, #a3e635, transparent)", margin: "30px 0" }}
            />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              style={{
                fontFamily: "monospace", color: "#a3e635",
                fontSize: "14px", letterSpacing: "12px",
                textTransform: "uppercase", fontWeight: "bold"
              }}
            >
              Fullstack Developer
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOISE & OVERLAY FOR PREMIUM TEXTURE */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: 0.05, pointerEvents: "none",
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`
      }} />
    </div>
  );
};

export default MonolithPreloader;