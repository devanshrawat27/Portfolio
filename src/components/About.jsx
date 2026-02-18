import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDownload } from "react-icons/fa";

const About = () => {
  const [hovBtn, setHovBtn]   = useState(false);
  const [hovEdu, setHovEdu]   = useState(false);

  const socials = [
    { href: "https://github.com/devanshrawat27",                     icon: <FaGithub size={16} />   },
    { href: "https://www.linkedin.com/in/devansh-rawat-170649268/", icon: <FaLinkedin size={16} />  },
    { href: "https://x.com/Devanshrawat49",                         icon: <FaTwitter size={16} />   },
    { href: "https://www.instagram.com/",                            icon: <FaInstagram size={16} /> },
  ];

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 24 },
    whileInView:{ opacity: 1, y: 0  },
    transition: { duration: 0.6, ease: [0.22,1,0.36,1], delay },
    viewport:   { once: true },
  });

  return (
    <section id="about" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "60px 80px",          // ← reduced from 100px to 60px
      backgroundColor: "transparent",
      position: "relative", zIndex: 1,
    }}>

      {/* soft bg glow */}
      <div style={{
        position: "absolute", top: "40%", left: "20%",
        width: 600, height: 500, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(163,230,53,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 640, width: "100%", display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* label */}
        <motion.div {...fadeUp(0)} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 28, height: 1.5, background: "#a3e635" }} />
          <span style={{ fontFamily: "'Courier New', monospace", color: "#a3e635", fontSize: "10px", letterSpacing: "4px" }}>
            WHO_AM_I
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 {...fadeUp(0.05)} style={{
          fontFamily: "'Arial Black', sans-serif",
          fontSize: "clamp(3rem, 6vw, 5rem)",
          fontWeight: 900, lineHeight: 0.88,
          margin: 0, letterSpacing: "-2px", color: "#fff",
        }}>
          ABOUT<br /><span style={{ color: "#a3e635" }}>ME.</span>
        </motion.h2>

        {/* Bio */}
        <motion.p {...fadeUp(0.1)} style={{
          fontSize: "16px", color: "#aaaaaa",
          lineHeight: "1.85", margin: 0,
        }}>
          Hey! I'm <span style={{ color: "#ffffff", fontWeight: 700 }}>Devansh Rawat</span> — a 3rd year B.Tech CSE student and passionate Full Stack Developer. I build products that are fast, scalable, and production-ready using the{" "}
          <span style={{ color: "#e0e0e0", fontWeight: 600 }}>MERN stack</span> as my primary toolkit. I also explore <span style={{ color: "#e0e0e0", fontWeight: 600 }}>AI/ML</span> to build smarter, more impactful applications.
        </motion.p>

        {/* ── Education card with hover effect ── */}
        <motion.div {...fadeUp(0.15)}>
          <p style={{ fontFamily: "'Courier New', monospace", color: "#444", fontSize: "10px", letterSpacing: "3px", margin: "0 0 12px" }}>
            EDUCATION
          </p>

          <div
            onMouseEnter={() => setHovEdu(true)}
            onMouseLeave={() => setHovEdu(false)}
            style={{
              display: "flex", alignItems: "center", gap: "18px",
              padding: "20px 22px",
              borderRadius: "16px",
              background: hovEdu
                ? "linear-gradient(135deg, rgba(163,230,53,0.07) 0%, #0c0c0c 100%)"
                : "#0c0c0c",
              border: `1px solid ${hovEdu ? "rgba(163,230,53,0.3)" : "#1e1e1e"}`,
              position: "relative", overflow: "hidden",
              cursor: "default",
              transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
              boxShadow: hovEdu
                ? "0 0 0 1px rgba(163,230,53,0.1), 0 16px 40px rgba(0,0,0,0.5)"
                : "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            {/* left green accent bar — grows on hover */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: hovEdu ? 4 : 3,
              background: hovEdu
                ? "#a3e635"
                : "linear-gradient(to bottom, #a3e635 0%, transparent 100%)",
              borderRadius: "3px 0 0 3px",
              transition: "width 0.3s, background 0.3s",
              boxShadow: hovEdu ? "0 0 12px #a3e63580" : "none",
            }} />

            {/* scan line on hover */}
            {hovEdu && (
              <div style={{
                position: "absolute", left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.3), transparent)",
                animation: "eduScan 1.8s linear infinite",
                pointerEvents: "none", zIndex: 5,
              }} />
            )}

            {/* icon */}
            <div style={{
              width: 50, height: 50, borderRadius: "13px", flexShrink: 0,
              background: hovEdu ? "rgba(163,230,53,0.12)" : "rgba(163,230,53,0.07)",
              border: `1px solid ${hovEdu ? "rgba(163,230,53,0.25)" : "rgba(163,230,53,0.12)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px",
              transition: "background 0.3s, border-color 0.3s",
              boxShadow: hovEdu ? "0 0 16px rgba(163,230,53,0.15)" : "none",
              transform: hovEdu ? "scale(1.05)" : "scale(1)",
            }}>🎓</div>

            {/* text */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Arial Black', sans-serif",
                color: hovEdu ? "#ffffff" : "#e0e0e0",
                fontSize: "15px", fontWeight: 900,
                letterSpacing: "-0.3px", marginBottom: "7px",
                transition: "color 0.3s",
                textShadow: hovEdu ? "0 0 20px rgba(163,230,53,0.2)" : "none",
              }}>
                Graphic Era Hill University
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
                <span style={{
                  background: hovEdu ? "rgba(163,230,53,0.15)" : "rgba(163,230,53,0.1)",
                  border: `1px solid ${hovEdu ? "rgba(163,230,53,0.4)" : "rgba(163,230,53,0.22)"}`,
                  color: "#a3e635", fontSize: "10px", fontWeight: 800,
                  padding: "3px 11px", borderRadius: "100px", letterSpacing: "0.5px",
                  transition: "background 0.3s, border-color 0.3s",
                }}>B.Tech — CSE</span>

                <span style={{ color: "#2e2e2e" }}>·</span>
                <span style={{ color: hovEdu ? "#aaa" : "#888", fontSize: "12px", fontFamily: "'Courier New', monospace", transition: "color 0.3s" }}>
                  2023 – 2027
                </span>
                <span style={{ color: "#2e2e2e" }}>·</span>
                <span style={{ color: hovEdu ? "#aaa" : "#888", fontSize: "12px", transition: "color 0.3s" }}>
                  Dehradun, Uttarakhand
                </span>
              </div>
            </div>

            {/* grad badge */}
            <div style={{
              flexShrink: 0,
              fontFamily: "'Courier New', monospace",
              fontSize: "9px",
              color: hovEdu ? "#a3e63580" : "#a3e63535",
              letterSpacing: "1.5px", textAlign: "right", lineHeight: 1.6,
              transition: "color 0.3s",
            }}>GRAD'27</div>
          </div>

          {/* keyframe for scan line */}
          <style>{`
            @keyframes eduScan {
              from { top: -2px; }
              to   { top: 102%; }
            }
          `}</style>
        </motion.div>

        {/* skill pills */}
        <motion.div {...fadeUp(0.2)} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {[
            { icon: "⚡", text: "MERN STACK" },
            { icon: "🤖", text: "AI / ML" },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 18px", borderRadius: "100px",
              background: "#0d0d0d", border: "1px solid #222",
              color: "#cccccc", fontSize: "13px", fontWeight: 600,
            }}>
              <span style={{ fontSize: "15px" }}>{icon}</span>
              {text}
            </div>
          ))}
        </motion.div>

        {/* divider */}
        <motion.div {...fadeUp(0.25)} style={{
          width: "100%", height: 1,
          background: "linear-gradient(90deg, #1e1e1e 0%, transparent 100%)",
        }} />

        {/* CTA + Socials */}
        <motion.div {...fadeUp(0.28)} style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>

          {/* Resume Download button */}
          <a
            href="https://drive.google.com/file/d/1n6HCk39KNJGOCp43fli80Nyql4ANmTe3/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovBtn(true)}
            onMouseLeave={() => setHovBtn(false)}
            style={{
              position: "relative", overflow: "hidden", display: "inline-flex",
              alignItems: "center", gap: "8px",
              border: "1.5px solid #a3e635", borderRadius: "100px",
              padding: "12px 28px", fontSize: "12px",
              fontWeight: 800, letterSpacing: "2px",
              cursor: "pointer", textDecoration: "none",
              color: hovBtn ? "#000" : "#a3e635",
              transition: "color 0.3s", textTransform: "uppercase",
            }}
          >
            <span style={{
              position: "absolute", bottom: 0, left: 0, width: "100%",
              height: hovBtn ? "100%" : "0%", background: "#a3e635",
              transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)", zIndex: 0,
            }} />
            <FaDownload size={12} style={{ position: "relative", zIndex: 1 }} />
            <span style={{ position: "relative", zIndex: 1 }}>Resume</span>
          </a>

          <div style={{ width: 1, height: 26, background: "#1e1e1e" }} />

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map(({ href, icon }, i) => {
              const [h, setH] = useState(false);
              return (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  style={{
                    width: 38, height: 38, borderRadius: "10px",
                    border: `1px solid ${h ? "#a3e635" : "#222"}`,
                    background: h ? "rgba(163,230,53,0.08)" : "transparent",
                    color: h ? "#a3e635" : "#666",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none",
                    transform: h ? "translateY(-3px)" : "translateY(0)",
                    transition: "all 0.22s",
                  }}
                >{icon}</a>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;