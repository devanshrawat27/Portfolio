import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { HiOutlineHand } from "react-icons/hi";

const Hero = () => {
  const [showHand, setShowHand] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Both sides rotate together as pairs
  const rotatingPairs = [
    { left: ["FULL", "STACK"], right: ["DEVELOPER"] },
    { left: ["AI"], right: ["ENGINEER"] },
  ];

  const { scrollY } = useScroll();

  const rawRotateY = useTransform(scrollY, [0, 180, 360], [0, 90, 180]);
  const rawX     = useTransform(scrollY, [0, 800], [0, isMobile ? 0   : 310]);
  const rawY     = useTransform(scrollY, [0, 800], [0, isMobile ? 600 : 800]);
  const rawScale = useTransform(scrollY, [0, 800], [1, isMobile ? 0.7 : 0.90]);
  const rawBadge = useTransform(scrollY, [0, 100], [1, 0]);

  const SP = { stiffness: 45, damping: 16, mass: 1 };
  const rotateY      = useSpring(rawRotateY, { stiffness: 45, damping: 18, mass: 1 });
  const xMove        = useSpring(rawX,       SP);
  const yMove        = useSpring(rawY,       SP);
  const scale        = useSpring(rawScale,   SP);
  const badgeOpacity = useSpring(rawBadge,   SP);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    const h = setInterval(() => setShowHand(p => !p), 2000);
    const r = setInterval(() => setRoleIndex(p => (p + 1) % rotatingPairs.length), 3200);

    const handleMouseMove = (e) => {
      if (window.innerWidth >= 768) {
        const x = (e.clientX / window.innerWidth - 0.5) * 16;
        const y = (e.clientY / window.innerHeight - 0.5) * 16;
        setMouseOffset({ x, y });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(h);
      clearInterval(r);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const currentPair = rotatingPairs[roleIndex];

  // Helper: smaller font for single-word right side entries
  const getRightFontSize = (word, isDesktop) => {
    if (word === "DEVELOPER" || word === "ENGINEER") {
      return isDesktop ? "clamp(2rem, 4.5vw, 5rem)" : "clamp(1.7rem, 8.5vw, 2.8rem)";
    }
    return isDesktop ? outlineTitle.fontSize : "clamp(2.4rem, 11vw, 3.8rem)";
  };

  if (isMobile) {
    return (
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "transparent",
        color: "#fff", padding: "100px 24px 60px",
        overflow: "visible", position: "relative",
      }}>
        {/* Subtle Ambient Glow */}
        <div style={{
          position: "absolute", top: "35%", left: "50%", transform: "translate(-50%, -50%)",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 70%)",
          filter: "blur(50px)", pointerEvents: "none", zIndex: 0,
        }} />

        {/* Name label */}
        <span style={{
          fontSize: "12px", color: "#e2e8f0", fontWeight: 800,
          letterSpacing: "4px", textTransform: "uppercase", marginBottom: "14px",
          position: "relative", zIndex: 2,
        }}>DEVANSH RAWAT</span>

        {/* LEFT TEXT (above image) — rotates */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div key={`left-${roleIndex}`}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {currentPair.left.map((word, i) => (
                <h1 key={i} style={{ ...mobileOutline }}>{word}</h1>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center Image - Fixed in place on mobile, no scroll translation */}
        <div style={{
          position: "relative", margin: "20px 0",
          zIndex: 10,
        }}>
          <div style={{
            width: "min(240px, 68vw)", height: "min(340px, 95vw)", borderRadius: "28px",
            overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.8), 0 0 35px -10px rgba(163,230,53,0.2)",
            position: "relative",
          }}>
            <img src="/pass.png" alt="Devansh" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, transparent 70%, rgba(0,0,0,0.35) 100%)" }} />
          </div>

          <div style={{ position: "absolute", bottom: "-6px", left: "-6px" }}>
            <motion.div
              style={{
                width: "60px", height: "60px", backgroundColor: "#a3e635",
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(163,230,53,0.45), inset 0 1px 2px rgba(255,255,255,0.4)",
              }}
              animate={{ rotate: [0, 12, -12, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <AnimatePresence mode="wait">
                {showHand ? (
                  <motion.div key="hand" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                    <HiOutlineHand size={28} color="#000" />
                  </motion.div>
                ) : (
                  <motion.span key="hi" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} style={{ fontSize: "20px", fontWeight: 900, color: "#000" }}>
                    Hi
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* RIGHT TEXT (below image) — rotates */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div key={`right-${roleIndex}`}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {currentPair.right.map((word, i) => (
                <h1 key={i} style={{
                  ...mobileOutline,
                  fontSize: getRightFontSize(word, false),
                }}>{word}</h1>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p style={{ color: "#8a99a8", fontSize: "13.5px", marginTop: "20px", textAlign: "center", maxWidth: "290px", lineHeight: 1.6, position: "relative", zIndex: 2 }}>
          Passionate Fullstack Developer & AI Engineer building intelligent, real-time web applications.
        </p>
      </section>
    );
  }

  // Desktop layout
  return (
    <section id="home" style={{
      height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: "transparent", color: "#fff", padding: "0 40px", overflow: "visible",
      position: "relative",
    }}>
      {/* Ambient Lighting Behind Portrait */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(163,230,53,0.06) 0%, rgba(163,230,53,0.01) 50%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{
        display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between",
        maxWidth: "1350px", position: "relative", overflow: "visible", zIndex: 1,
      }}>

        {/* ── LEFT SIDE — rotates with gentle mouse parallax ── */}
        <motion.div
          animate={{ x: -mouseOffset.x * 0.6, y: -mouseOffset.y * 0.6 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          style={{ textAlign: "right", flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" }}
        >
          <span style={{
            fontSize: "24px",
            color: "#ffffff",
            fontWeight: 800,
            letterSpacing: "4px",
            marginBottom: "8px",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}>
            DEVANSH RAWAT
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${roleIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ textAlign: "right" }}
            >
              {currentPair.left.map((word, i) => (
                <h1 key={i} style={outlineTitle}>{word}</h1>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── CENTER IMAGE ── */}
        <motion.div
          style={{ position: "relative", margin: "0 35px", flexShrink: 0, y: yMove, x: xMove, rotateY, scale, zIndex: 100, transformPerspective: 1000 }}
        >
          <div style={{
            width: "330px", height: "480px", borderRadius: "35px", overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 25px 60px -10px rgba(0,0,0,0.8), 0 0 35px -5px rgba(163,230,53,0.18)",
            position: "relative",
          }}>
            <img src="/pass.png" alt="Devansh" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {/* Subtle glass vignette */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, transparent 75%, rgba(0,0,0,0.4) 100%)" }} />
          </div>

          <motion.div style={{ position: "absolute", bottom: "-10px", left: "-35px", opacity: badgeOpacity }}>
            <motion.div
              style={{
                width: "85px", height: "85px", backgroundColor: "#a3e635",
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer",
                boxShadow: "0 0 28px rgba(163,230,53,0.45), inset 0 2px 4px rgba(255,255,255,0.4)",
              }}
              animate={{ rotate: [0, 12, -12, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <AnimatePresence mode="wait">
                {showHand ? (
                  <motion.div key="hand" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                    <HiOutlineHand size={40} color="#000" />
                  </motion.div>
                ) : (
                  <motion.span key="hi" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} style={{ fontSize: "30px", fontWeight: 900, color: "#000" }}>
                    Hi
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT SIDE — rotates with gentle mouse parallax ── */}
        <motion.div
          animate={{ x: mouseOffset.x * 0.6, y: mouseOffset.y * 0.6 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          style={{ textAlign: "left", flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}
        >
          {/* Spacer to match DEVANSH RAWAT label height on the left */}
          <div style={{ height: "40px" }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${roleIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {currentPair.right.map((word, i) => (
                <h1 key={i} style={{ ...outlineTitle, fontSize: getRightFontSize(word, true) }}>{word}</h1>
              ))}
            </motion.div>
          </AnimatePresence>
          <p style={{
            maxWidth: "310px",
            color: "#8a99a8",
            fontSize: "15px",
            marginTop: "17px",
            lineHeight: 1.6,
            fontWeight: 400,
          }}>
            Passionate Fullstack Developer & AI Engineer building intelligent, real-time web applications.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const outlineTitle = {
  fontSize: "clamp(2.5rem, 7.5vw, 8rem)",
  fontWeight: 900,
  margin: 0,
  lineHeight: 0.85,
  textTransform: "uppercase",
  color: "transparent",
  WebkitTextStroke: "1.6px rgba(255,255,255,0.75)",
  fontFamily: "Arial Black, sans-serif",
  filter: "drop-shadow(0 0 22px rgba(255,255,255,0.06))",
  transition: "all 0.3s ease",
};

const mobileOutline = {
  fontSize: "clamp(2.4rem, 11vw, 3.8rem)",
  fontWeight: 900,
  margin: 0,
  lineHeight: 0.9,
  textTransform: "uppercase",
  color: "transparent",
  WebkitTextStroke: "1.5px rgba(255,255,255,0.75)",
  fontFamily: "Arial Black, sans-serif",
  letterSpacing: "-1px",
};

export default Hero;