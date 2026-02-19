import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { HiOutlineHand } from "react-icons/hi";

const Hero = () => {
  const [showHand, setShowHand] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const rotatingRoles = ["MERN STACK", "DEVELOPER"];

  const { scrollY } = useScroll();

  const rawRotateY = useTransform(scrollY, [0, 180, 360], [0, 90, 180]);
  const rawX     = useTransform(scrollY, [0, 800], [0, isMobile ? 0   : 310]);
  const rawY     = useTransform(scrollY, [0, 800], [0, isMobile ? 600 : 800]);
  const rawScale = useTransform(scrollY, [0, 800], [1, isMobile ? 0.7 : 0.90]);
  const rawBadge = useTransform(scrollY, [0, 100], [1, 0]);

  const SP = { stiffness: 45, damping: 16, mass: 1 };
  const rotateY      = useSpring(rawRotateY, { stiffness: 38, damping: 14, mass: 1.2 });
  const xMove        = useSpring(rawX,       SP);
  const yMove        = useSpring(rawY,       SP);
  const scale        = useSpring(rawScale,   SP);
  const badgeOpacity = useSpring(rawBadge,   SP);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    const h = setInterval(() => setShowHand(p => !p), 2000);
    const r = setInterval(() => setRoleIndex(p => (p + 1) % rotatingRoles.length), 3000);
    return () => { clearInterval(h); clearInterval(r); window.removeEventListener("resize", handleResize); };
  }, []);

  if (isMobile) {
    return (
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "transparent",
        color: "#fff", padding: "100px 24px 60px",
        overflow: "visible",
      }}>
        {/* Name label */}
        <span style={{
          fontSize: "11px", color: "#aaa", fontWeight: 800,
          letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px",
        }}>DEVANSH RAWAT</span>

        {/* FULL text */}
        <h1 style={{
          fontSize: "clamp(3.5rem, 18vw, 6rem)", fontWeight: 900, margin: 0,
          lineHeight: 0.85, textTransform: "uppercase", color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,255,255,0.7)",
          fontFamily: "Arial Black, sans-serif", letterSpacing: "-2px",
        }}>  FULL <br />STACK</h1>

        {/* Center Image */}
        <motion.div style={{
          position: "relative", margin: "20px 0",
          y: yMove, x: xMove, rotateY, scale,
          zIndex: 100, transformPerspective: 1000,
        }}>
          <div style={{
            width: "240px", height: "340px", borderRadius: "28px",
            overflow: "hidden", border: "1px solid #333",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}>
            <img src="/pass.jpg" alt="Devansh" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <motion.div style={{ position: "absolute", bottom: "-10px", left: "-30px", opacity: badgeOpacity }}>
            <motion.div
              style={{
                width: "70px", height: "70px", backgroundColor: "#a3e635",
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", boxShadow: "0 0 25px rgba(163,230,53,0.4)",
              }}
              animate={{ rotate: [0, 12, -12, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <AnimatePresence mode="wait">
                {showHand ? (
                  <motion.div key="hand" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                    <HiOutlineHand size={32} color="#000" />
                  </motion.div>
                ) : (
                  <motion.span key="hi" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} style={{ fontSize: "24px", fontWeight: 900, color: "#000" }}>
                    Hi
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* STACK / DEVELOPER */}
        <div style={{ textAlign: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div key={rotatingRoles[roleIndex]}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            >
              {rotatingRoles[roleIndex].split(" ").map((word, i) => (
                <h1 key={i} style={{
                  fontSize: word === "DEVELOPER" ? "clamp(2rem, 11vw, 4rem)" : "clamp(3.5rem, 18vw, 6rem)",
                  fontWeight: 900, margin: 0, lineHeight: 0.85,
                  textTransform: "uppercase", color: "transparent",
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.7)",
                  fontFamily: "Arial Black, sans-serif", letterSpacing: "-2px",
                }}>{word}</h1>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p style={{ color: "#666", fontSize: "13px", marginTop: "20px", textAlign: "center", maxWidth: "280px", lineHeight: 1.6 }}>
          Passionate Full Stack Developer specializing in building real-time web applications.
        </p>
      </section>
    );
  }

  // Desktop layout
  return (
    <section id="home" style={{
      height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: "transparent", color: "#fff", padding: "0 40px", overflow: "visible",
    }}>
      <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", maxWidth: "1350px", position: "relative", overflow: "visible" }}>
        <div style={{ textAlign: "right", flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontSize: "24px", color: "#fff", fontWeight: 800, letterSpacing: "4px", marginBottom: "8px" }}>DEVANSH RAWAT</span>
          <h1 style={outlineTitle}>FULL</h1>
          <h1 style={outlineTitle}>STACK</h1>
        </div>

        <motion.div style={{ position: "relative", margin: "0 35px", flexShrink: 0, y: yMove, x: xMove, rotateY, scale, zIndex: 100, transformPerspective: 1000 }}>
          <div style={{ width: "330px", height: "480px", borderRadius: "35px", overflow: "hidden", border: "1px solid #333", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
            <img src="/pass.jpg" alt="Devansh" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <motion.div style={{ position: "absolute", bottom: "-10px", left: "-35px", opacity: badgeOpacity }}>
            <motion.div style={{ width: "85px", height: "85px", backgroundColor: "#a3e635", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 0 25px rgba(163,230,53,0.4)" }}
              animate={{ rotate: [0, 12, -12, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <AnimatePresence mode="wait">
                {showHand ? (
                  <motion.div key="hand" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                    <HiOutlineHand size={40} color="#000" />
                  </motion.div>
                ) : (
                  <motion.span key="hi" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} style={{ fontSize: "30px", fontWeight: 900, color: "#000" }}>Hi</motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        <div style={{ textAlign: "left", flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ height: "160px", display: "flex", alignItems: "center", minWidth: "300px" }}>
            <AnimatePresence mode="wait">
              <motion.div key={rotatingRoles[roleIndex]} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {rotatingRoles[roleIndex].split(" ").map((word, i) => (
                  <h1 key={i} style={{ ...outlineTitle, fontSize: word === "DEVELOPER" ? "clamp(2rem, 4.5vw, 5rem)" : outlineTitle.fontSize }}>{word}</h1>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <p style={{ maxWidth: "300px", color: "#666", fontSize: "15px", marginTop: "17px", lineHeight: 1.5 }}>
            Passionate Full Stack Developer specializing in building real-time web applications.
          </p>
        </div>
      </div>
    </section>
  );
};

const outlineTitle = {
  fontSize: "clamp(2.5rem, 7.5vw, 8rem)", fontWeight: 900, margin: 0, lineHeight: 0.85,
  textTransform: "uppercase", color: "transparent",
  WebkitTextStroke: "1.5px rgba(255,255,255,0.7)", fontFamily: "Arial Black, sans-serif",
};

export default Hero;