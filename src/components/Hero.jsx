import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { HiOutlineHand } from "react-icons/hi";

const Hero = () => {
  const [showHand, setShowHand]   = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const rotatingRoles = ["MERN STACK", "DEVELOPER"];

  const { scrollY } = useScroll();

  // ─── Y-axis flip: 0° → 90° (disappears) → 180° (flipped/back)
  // Then image travels right + down to About section image position
  // Scroll 0–200:   flip happens (Y axis — horizontal card flip)
  // Scroll 200–800: image moves to About right-side position

  const rawRotateY = useTransform(scrollY, [0, 180, 360], [0, 90, 180]);

  // Travel to About section — right side, vertically centered
  const rawX     = useTransform(scrollY, [0, 800], [0,  310]);
  const rawY     = useTransform(scrollY, [0, 800], [0,  800]);
  const rawScale = useTransform(scrollY, [0, 800], [1, 0.90]);  // slight shrink
  const rawBadge = useTransform(scrollY, [0, 100], [1, 0]);     // badge fades fast

  // Ultra-smooth springs — very low stiffness = buttery
  const SP = { stiffness: 45, damping: 16, mass: 1 };

  const rotateY     = useSpring(rawRotateY, { stiffness: 38, damping: 14, mass: 1.2 });
  const xMove       = useSpring(rawX,       SP);
  const yMove       = useSpring(rawY,       SP);
  const scale       = useSpring(rawScale,   SP);
  const badgeOpacity = useSpring(rawBadge,  SP);

  useEffect(() => {
    const h = setInterval(() => setShowHand((p) => !p), 2000);
    const r = setInterval(() => setRoleIndex((p) => (p + 1) % rotatingRoles.length), 3000);
    return () => { clearInterval(h); clearInterval(r); };
  }, []);

  return (
    <section id="home" style={styles.heroWrapper}>
      <div style={styles.container}>

        {/* Left: Name + FULL STACK */}
        <div style={styles.textSideLeft}>
          <span style={styles.nameLabel}>DEVANSH RAWAT</span>
          <h1 style={styles.outlineTitle}>FULL</h1>
          <h1 style={styles.outlineTitle}>STACK</h1>
        </div>

        {/* Center: Image — Y-axis flip then travels to About right side */}
        <motion.div
          style={{
            ...styles.imageContainer,
            y: yMove,
            x: xMove,
            rotateY,
            scale,
            zIndex: 100,
            transformPerspective: 1000,
          }}
        >
          <div style={styles.imageBox}>
            <img src="/pass.jpg" alt="Devansh" style={styles.heroImg} />
          </div>

          <motion.div style={{ ...styles.badgeWrapper, opacity: badgeOpacity }}>
            <motion.div
              style={styles.handCircle}
              animate={{ rotate: [0, 12, -12, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {showHand ? (
                  <motion.div key="hand" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                    <HiOutlineHand size={40} color="#000" />
                  </motion.div>
                ) : (
                  <motion.span key="hi" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} style={styles.hiText}>
                    Hi
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Rotating Role */}
        <div style={styles.textSideRight}>
          <div style={styles.roleBox}>
            <AnimatePresence mode="wait">
              <motion.div
                key={rotatingRoles[roleIndex]}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {rotatingRoles[roleIndex].split(" ").map((word, i) => (
                  <h1 key={i} style={{
                    ...styles.outlineTitle,
                    fontSize: word === "DEVELOPER" ? "clamp(2rem, 4.5vw, 5rem)" : styles.outlineTitle.fontSize,
                  }}>
                    {word}
                  </h1>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <p style={styles.tagline}>
            Passionate Full Stack Developer specializing in building real-time web applications.
          </p>
        </div>

      </div>
    </section>
  );
};

const styles = {
  heroWrapper: {
    height: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    backgroundColor: "transparent",
    color: "#fff", padding: "0 40px",
    overflow: "visible",
  },
  container: {
    display: "flex", alignItems: "center",
    width: "100%", justifyContent: "space-between",
    maxWidth: "1350px",
    position: "relative", overflow: "visible",
  },
  textSideLeft: {
    textAlign: "right", flex: 1,
    display: "flex", flexDirection: "column", alignItems: "flex-end",
  },
  textSideRight: {
    textAlign: "left", flex: 1,
    display: "flex", flexDirection: "column", alignItems: "flex-start",
  },
  nameLabel: {
    fontSize: "24px", color: "#fff", fontWeight: "800",
    letterSpacing: "4px", marginBottom: "8px", textTransform: "uppercase",
  },
  outlineTitle: {
    fontSize: "clamp(2.5rem, 7.5vw, 8rem)",
    fontWeight: "900", margin: 0, lineHeight: "0.85",
    textTransform: "uppercase", color: "transparent",
    WebkitTextStroke: "1.5px rgba(255,255,255,0.7)",
    fontFamily: "Arial Black, sans-serif",
  },
  imageContainer: { position: "relative", margin: "0 35px", flexShrink: 0 },
  imageBox: {
    width: "330px", height: "480px", borderRadius: "35px",
    overflow: "hidden", border: "1px solid #333",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  },
  heroImg: { width: "100%", height: "100%", objectFit: "cover" },
  badgeWrapper: { position: "absolute", bottom: "-10px", left: "-35px" },
  handCircle: {
    width: "85px", height: "85px", backgroundColor: "#a3e635",
    borderRadius: "50%", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer",
    boxShadow: "0 0 25px rgba(163,230,53,0.4)",
  },
  hiText: { fontSize: "30px", fontWeight: "900", color: "#000" },
  roleBox: { height: "160px", display: "flex", alignItems: "center", minWidth: "300px" },
  tagline: { maxWidth: "300px", color: "#666", fontSize: "15px", marginTop: "15px", lineHeight: "1.5" },
};

export default Hero;