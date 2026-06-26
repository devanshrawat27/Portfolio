import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDownload } from "react-icons/fa";

const About = () => {
  const [hovBtn, setHovBtn] = useState(false);
  const [hovEdu, setHovEdu] = useState(false);

  const socials = [
    { href: "https://github.com/devanshrawat27", icon: <FaGithub size={16} /> },
    { href: "https://www.linkedin.com/in/devansh-rawat-170649268/", icon: <FaLinkedin size={16} /> },
    { href: "https://x.com/Devanshrawat49", icon: <FaTwitter size={16} /> },
    { href: "https://www.instagram.com/", icon: <FaInstagram size={16} /> },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }, viewport: { once: true },
  });

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 80px)",
      backgroundColor: "transparent", position: "relative", zIndex: 1,
    }}>
      <div style={{ position: "absolute", top: "40%", left: "20%", width: 600, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(163,230,53,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 640, width: "100%", display: "flex", flexDirection: "column", gap: "clamp(20px, 4vw, 32px)" }}>

        <motion.div {...fadeUp(0)} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 28, height: 1.5, background: "#a3e635" }} />
          <span style={{ fontFamily: "'Courier New', monospace", color: "#a3e635", fontSize: "10px", letterSpacing: "4px" }}>WHO_AM_I</span>
        </motion.div>

        <motion.h2 {...fadeUp(0.05)} style={{
          fontFamily: "'Arial Black', sans-serif",
          fontSize: "clamp(2.4rem, 10vw, 5rem)",
          fontWeight: 900, lineHeight: 0.88, margin: 0, letterSpacing: "-2px", color: "#fff",
        }}>
          ABOUT<br /><span style={{ color: "#a3e635" }}>ME.</span>
        </motion.h2>

        <motion.p {...fadeUp(0.1)} style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "#aaaaaa", lineHeight: "1.85", margin: 0 }}>
          Hey! I'm <span style={{ color: "#fff", fontWeight: 700 }}>Devansh Rawat</span> — a final year B.Tech CSE student passionate about <span style={{ color: "#e0e0e0", fontWeight: 600 }}>AI Engineering</span> and <span style={{ color: "#e0e0e0", fontWeight: 600 }}>Full-Stack Development</span>.
        </motion.p>

        <motion.p {...fadeUp(0.12)} style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "#aaaaaa", lineHeight: "1.85", margin: 0 }}>
          I build intelligent applications powered by <span style={{ color: "#e0e0e0", fontWeight: 600 }}>LLMs, AI Agents, and RAG</span> while developing scalable full-stack products using <span style={{ color: "#e0e0e0", fontWeight: 600 }}>React, Node.js</span>, and modern backend technologies. I'm focused on creating practical AI solutions that solve real-world problems.
        </motion.p>

        {/* Education */}
        <motion.div {...fadeUp(0.15)}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 14px" }}>
            <div style={{ width: 28, height: 1.5, background: "rgba(163,230,53,0.3)" }} />
            <span style={{ fontFamily: "'Courier New', monospace", color: "#555", fontSize: "10px", letterSpacing: "3px" }}>EDUCATION</span>
          </div>

          <div onMouseEnter={() => setHovEdu(true)} onMouseLeave={() => setHovEdu(false)}
            style={{
              position: "relative", overflow: "hidden", cursor: "default",
              borderRadius: "20px",
              padding: "1px",
              background: hovEdu
                ? "linear-gradient(135deg, rgba(163,230,53,0.4), rgba(163,230,53,0.08), rgba(163,230,53,0.25))"
                : "linear-gradient(135deg, #1a1a1a, #111, #1a1a1a)",
              transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
              transform: hovEdu ? "translateY(-3px)" : "translateY(0)",
              boxShadow: hovEdu
                ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(163,230,53,0.06)"
                : "0 4px 24px rgba(0,0,0,0.3)",
            }}>
            {/* Inner container */}
            <div style={{
              display: "flex", alignItems: "center", gap: "clamp(14px, 3vw, 22px)",
              padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 30px)",
              borderRadius: "19px",
              background: hovEdu
                ? "linear-gradient(135deg, rgba(163,230,53,0.05) 0%, #090909 40%, #0a0a0a 100%)"
                : "linear-gradient(135deg, #0c0c0c 0%, #090909 100%)",
              position: "relative",
            }}>
              {/* Scan line */}
              {hovEdu && <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.25), transparent)", animation: "eduScan 2s linear infinite", pointerEvents: "none", zIndex: 5 }} />}
              {/* Corner glow */}
              <div style={{
                position: "absolute", top: -60, right: -60, width: 160, height: 160,
                background: `radial-gradient(circle, rgba(163,230,53,${hovEdu ? "0.07" : "0.02"}) 0%, transparent 70%)`,
                pointerEvents: "none", transition: "all 0.5s",
              }} />

              {/* Icon */}
              <div style={{
                width: "clamp(48px,9vw,60px)", height: "clamp(48px,9vw,60px)",
                borderRadius: "16px", flexShrink: 0,
                background: hovEdu
                  ? "linear-gradient(145deg, rgba(163,230,53,0.15) 0%, rgba(163,230,53,0.04) 100%)"
                  : "linear-gradient(145deg, rgba(163,230,53,0.06) 0%, rgba(163,230,53,0.02) 100%)",
                border: `1px solid rgba(163,230,53,${hovEdu ? "0.25" : "0.08"})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "clamp(20px,4.5vw,26px)",
                transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
                transform: hovEdu ? "scale(1.06) rotate(-2deg)" : "scale(1)",
                boxShadow: hovEdu ? "0 0 24px rgba(163,230,53,0.1)" : "none",
              }}>🎓</div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Arial Black', sans-serif",
                  color: hovEdu ? "#fff" : "#d4d4d4",
                  fontSize: "clamp(14px,3.5vw,17px)",
                  fontWeight: 900, letterSpacing: "-0.3px",
                  marginBottom: "10px",
                  transition: "color 0.3s",
                }}>Graphic Era Hill University</div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", rowGap: "6px" }}>
                  <span style={{
                    background: `rgba(163,230,53,${hovEdu ? "0.14" : "0.07"})`,
                    border: `1px solid rgba(163,230,53,${hovEdu ? "0.35" : "0.15"})`,
                    color: "#a3e635", fontSize: "10px", fontWeight: 800,
                    padding: "4px 12px", borderRadius: "100px",
                    transition: "all 0.3s", letterSpacing: "0.5px",
                  }}>B.Tech — CSE</span>
                  <span style={{
                    color: hovEdu ? "#888" : "#555",
                    fontSize: "12px", fontFamily: "'Courier New', monospace",
                    transition: "color 0.3s",
                  }}>2023 – 2027</span>
                  <span style={{
                    color: hovEdu ? "#888" : "#555", fontSize: "12px",
                    transition: "color 0.3s",
                  }}>· Dehradun</span>
                </div>
              </div>

              {/* Right: Year badge */}
              <div style={{
                flexShrink: 0,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              }}>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes eduScan { from { top: -2px; } to { top: 102%; } }
          `}</style>
        </motion.div>

        {/* Pills */}
        <motion.div {...fadeUp(0.2)} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {[{ icon: "🤖", text: "AI ENGINEERING" }, { icon: "⚡", text: "MERN STACK" }].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 16px", borderRadius: "100px", background: "#0d0d0d", border: "1px solid #222", color: "#cccccc", fontSize: "clamp(11px,3vw,13px)", fontWeight: 600 }}>
              <span style={{ fontSize: "14px" }}>{icon}</span>{text}
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.25)} style={{ width: "100%", height: 1, background: "linear-gradient(90deg, #1e1e1e 0%, transparent 100%)" }} />

        {/* CTA */}
        <motion.div {...fadeUp(0.28)} style={{ display: "flex", alignItems: "center", gap: "clamp(10px,3vw,16px)", flexWrap: "wrap" }}>
          <a href="https://drive.google.com/file/d/1n6HCk39KNJGOCp43fli80Nyql4ANmTe3/view?usp=sharing"
            target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovBtn(true)} onMouseLeave={() => setHovBtn(false)}
            style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: "8px", border: "1.5px solid #a3e635", borderRadius: "100px", padding: "11px 24px", fontSize: "11px", fontWeight: 800, letterSpacing: "2px", cursor: "pointer", textDecoration: "none", color: hovBtn ? "#000" : "#a3e635", transition: "color 0.3s", textTransform: "uppercase" }}>
            <span style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: hovBtn ? "100%" : "0%", background: "#a3e635", transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)", zIndex: 0 }} />
            <FaDownload size={11} style={{ position: "relative", zIndex: 1 }} />
            <span style={{ position: "relative", zIndex: 1 }}>Resume</span>
          </a>
          <div style={{ width: 1, height: 26, background: "#1e1e1e" }} />
          <div style={{ display: "flex", gap: "8px" }}>
            {socials.map(({ href, icon }, i) => {
              const [h, setH] = useState(false);
              return (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  style={{ width: 36, height: 36, borderRadius: "10px", border: `1px solid ${h ? "#a3e635" : "#222"}`, background: h ? "rgba(163,230,53,0.08)" : "transparent", color: h ? "#a3e635" : "#666", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transform: h ? "translateY(-3px)" : "translateY(0)", transition: "all 0.22s" }}
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