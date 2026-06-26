import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Smooth cubic ease ───────────────────────────────────────────────────────
const SMOOTH = [0.76, 0, 0.24, 1];

// ─── The Preloader ───────────────────────────────────────────────────────────
const MonolithPreloader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  // phase 0 → avatar reveal with glow (2.2s)
  // phase 1 → avatar shrinks up + name reveal (2.4s)
  // phase 2 → subtitle + exit (2s)

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), 2200));
    timers.push(setTimeout(() => setPhase(2), 4600));
    timers.push(setTimeout(() => onComplete(), 6600));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="preloader-root"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: SMOOTH }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#050505",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* ── Ambient Glow ── */}
          <motion.div
            animate={{
              opacity: phase >= 1 ? 0.18 : 0.08,
              scale: phase >= 1 ? 1.8 : 1,
            }}
            transition={{ duration: 2, ease: SMOOTH }}
            style={{
              position: "absolute",
              width: "70vmax", height: "70vmax",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(163,230,53,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ════════════════════════════════════════════════════════════ */}
          {/*  PHASE 0 – AVATAR REVEAL                                    */}
          {/* ════════════════════════════════════════════════════════════ */}
          <motion.div
            animate={{
              scale: phase >= 1 ? 0.35 : 1,
              y: phase >= 1 ? "-38vh" : 0,
              opacity: phase >= 1 ? 0 : 1,
            }}
            transition={{ duration: 1, ease: SMOOTH }}
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
            }}
          >
            {/* Pulsing ring behind avatar */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(163,230,53,0)",
                  "0 0 80px rgba(163,230,53,0.3)",
                  "0 0 0px rgba(163,230,53,0)",
                ],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "clamp(180px, 35vw, 280px)",
                height: "clamp(180px, 35vw, 280px)",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                border: "2px solid rgba(163,230,53,0.3)",
              }}
            >
              {/* Avatar image */}
              <motion.img
                src="/avatar.png"
                alt="Devansh Rawat"
                initial={{ scale: 1.3, opacity: 0, filter: "blur(20px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: SMOOTH, delay: 0.3 }}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Shimmer sweep overlay */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, delay: 0.8, ease: SMOOTH }}
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(105deg, transparent 30%, rgba(163,230,53,0.15) 50%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>

            {/* Greeting text below avatar */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: SMOOTH }}
              style={{
                marginTop: 28,
                fontFamily: "monospace",
                fontSize: "clamp(11px, 1.4vw, 14px)",
                color: "rgba(163,230,53,0.6)",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
              }}
            >
              WELCOME TO MY WORLD
            </motion.p>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════ */}
          {/*  PHASE 1+2 – NAME REVEAL                                   */}
          {/* ════════════════════════════════════════════════════════════ */}
          {phase >= 1 && (
            <motion.div
              style={{
                textAlign: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Name container with clip reveal */}
              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, ease: SMOOTH, delay: 0.3 }}
                  style={{
                    fontSize: "clamp(2rem, 9vw, 7rem)",
                    fontWeight: 900,
                    color: "#fff",
                    fontFamily: "Syncopate, sans-serif",
                    letterSpacing: "0.15em",
                    lineHeight: 1,
                    margin: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  DEVANSH
                </motion.h1>
              </div>

              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, ease: SMOOTH, delay: 0.5 }}
                  style={{
                    fontSize: "clamp(2rem, 9vw, 7rem)",
                    fontWeight: 900,
                    color: "#a3e635",
                    fontFamily: "Syncopate, sans-serif",
                    letterSpacing: "0.15em",
                    lineHeight: 1,
                    margin: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  RAWAT
                </motion.h1>
              </div>

              {/* Horizontal rule sweeping in */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: SMOOTH, delay: 1 }}
                style={{
                  height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.5), transparent)",
                  margin: "32px 0",
                  transformOrigin: "left center",
                }}
              />

              {/* Subtitle – staggered letters */}
              {phase >= 2 && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.35em",
                  flexWrap: "wrap",
                }}>
                  {"AI & Full-Stack Developer".split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.04,
                        ease: SMOOTH,
                      }}
                      style={{
                        fontFamily: "monospace",
                        fontSize: "clamp(10px, 1.5vw, 14px)",
                        color: "#a3e635",
                        letterSpacing: "0.2em",
                        fontWeight: 600,
                        display: "inline-block",
                        minWidth: ch === " " ? "0.5em" : "auto",
                      }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Corner accents ── */}
          {[
            { top: 28, left: 28 },
            { top: 28, right: 28 },
            { bottom: 28, left: 28 },
            { bottom: 28, right: 28 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              style={{
                position: "absolute",
                ...pos,
                width: 40, height: 40,
                borderTop: pos.top !== undefined ? "1px solid rgba(163,230,53,0.3)" : "none",
                borderBottom: pos.bottom !== undefined ? "1px solid rgba(163,230,53,0.3)" : "none",
                borderLeft: pos.left !== undefined ? "1px solid rgba(163,230,53,0.3)" : "none",
                borderRight: pos.right !== undefined ? "1px solid rgba(163,230,53,0.3)" : "none",
              }}
            />
          ))}

          {/* ── Film grain ── */}
          <div style={{
            position: "absolute", inset: 0,
            opacity: 0.04, pointerEvents: "none",
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MonolithPreloader;