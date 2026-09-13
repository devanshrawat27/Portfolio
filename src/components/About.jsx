import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDownload } from "react-icons/fa";
import { HiAcademicCap, HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

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

        <motion.div
          {...fadeUp(0)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            borderRadius: "100px",
            background: "linear-gradient(135deg, rgba(163,230,53,0.1) 0%, rgba(163,230,53,0.02) 100%)",
            border: "1px solid rgba(163,230,53,0.28)",
            boxShadow: "0 0 16px rgba(163,230,53,0.08)",
            alignSelf: "flex-start",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635" }} />
          <span style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", color: "#a3e635", fontSize: "11px", letterSpacing: "3px", fontWeight: 800 }}>
            WHO_AM_I
          </span>
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
          I build intelligent applications powered by <span style={{ color: "#e0e0e0", fontWeight: 600 }}>LLMs, AI Agents, and RAG</span> while developing scalable full-stack products using <span style={{ color: "#e0e0e0", fontWeight: 600 }}>React, Next.js, Node.js</span>, and modern backend technologies. I'm focused on creating practical AI solutions that solve real-world problems.
        </motion.p>

        {/* Education */}
        <motion.div {...fadeUp(0.15)}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 14px" }}>
            <div style={{ width: 28, height: 1.5, background: "rgba(163,230,53,0.3)" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#a3e635", fontSize: "10px", letterSpacing: "3px", fontWeight: 700 }}>EDUCATION</span>
          </div>

          <div
            onMouseEnter={() => setHovEdu(true)}
            onMouseLeave={() => setHovEdu(false)}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "default",
              borderRadius: "24px",
              padding: "clamp(22px, 4vw, 28px)",
              background: hovEdu
                ? "linear-gradient(145deg, rgba(163,230,53,0.08) 0%, rgba(12,12,16,0.96) 100%)"
                : "linear-gradient(145deg, rgba(255,255,255,0.035) 0%, rgba(8,8,10,0.88) 100%)",
              border: `1px solid ${hovEdu ? "rgba(163,230,53,0.45)" : "rgba(255,255,255,0.09)"}`,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: hovEdu
                ? "0 22px 50px -10px rgba(0,0,0,0.9), 0 0 35px -5px rgba(163,230,53,0.22), inset 0 1px 1px rgba(255,255,255,0.2)"
                : "0 6px 24px -4px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.04)",
              transform: hovEdu ? "translateY(-4px)" : "translateY(0)",
              transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {/* Ambient Top Glow Line on hover */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "8%",
                right: "8%",
                height: 2,
                background: "linear-gradient(90deg, transparent, #a3e635, transparent)",
                opacity: hovEdu ? 1 : 0,
                transition: "opacity 0.3s ease",
                boxShadow: "0 0 16px #a3e635",
              }}
            />

            {/* Top Row: Status Beacon Pill & Date Pill */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "4px 13px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, rgba(163,230,53,0.14) 0%, rgba(163,230,53,0.03) 100%)",
                  border: "1px solid rgba(163,230,53,0.35)",
                  boxShadow: "0 0 14px rgba(163,230,53,0.1)",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#a3e635", fontSize: "10.5px", letterSpacing: "1.5px", fontWeight: 800 }}>
                  PURSUING DEGREE
                </span>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 13px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#cbd5e1",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                <HiOutlineCalendar size={13} color="#a3e635" />
                <span>2023 – 2027</span>
              </div>
            </div>

            {/* Main Info Row: Academic Cap Logo Housing + Degree & University */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3.5vw, 22px)" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "18px",
                  flexShrink: 0,
                  background: hovEdu
                    ? "radial-gradient(circle at 50% 50%, rgba(163,230,53,0.22) 0%, rgba(255,255,255,0.04) 100%)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hovEdu ? "rgba(163,230,53,0.55)" : "rgba(255,255,255,0.1)"}`,
                  boxShadow: hovEdu
                    ? "0 0 24px rgba(163,230,53,0.35), inset 0 1px 2px rgba(255,255,255,0.25)"
                    : "0 4px 14px rgba(0,0,0,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: hovEdu ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <HiAcademicCap
                  size={32}
                  color="#a3e635"
                  style={{
                    filter: hovEdu ? "drop-shadow(0 0 12px #a3e635)" : "drop-shadow(0 0 3px rgba(163,230,53,0.5))",
                    transition: "filter 0.3s ease",
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    margin: "0 0 5px",
                    fontFamily: "'Arial Black', sans-serif",
                    fontSize: "clamp(1.05rem, 2.3vw, 1.3rem)",
                    fontWeight: 900,
                    color: "#ffffff",
                    letterSpacing: "-0.3px",
                    lineHeight: 1.25,
                  }}
                >
                  B.Tech — Computer Science & Engineering
                </h3>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: hovEdu ? "#c6f567" : "#a3e635",
                      fontWeight: 700,
                      transition: "color 0.25s",
                    }}
                  >
                    Graphic Era Hill University
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#94a3b8",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                    }}
                  >
                    <HiOutlineLocationMarker size={12} color="#a3e635" />
                    Dehradun, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Domain Pills - Ultra Premium Frosted Capsules without emoji icons */}
        <motion.div {...fadeUp(0.2)} style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {[
            { text: "AI ENGINEERING", color: "#a3e635" },
            { text: "FULL-STACK", color: "#61DAFB" },
          ].map(({ text, color }) => (
            <motion.div
              key={text}
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 20px",
                borderRadius: "100px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.12)",
                color: "#f1f5f9",
                fontSize: "11.5px",
                fontWeight: 700,
                letterSpacing: "1px",
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "default",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
              <span>{text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.25)} style={{ width: "100%", height: 1, background: "linear-gradient(90deg, #1e1e1e 0%, transparent 100%)" }} />

        {/* CTA */}
        <motion.div {...fadeUp(0.28)} style={{ display: "flex", alignItems: "center", gap: "clamp(10px,3vw,16px)", flexWrap: "wrap" }}>
          <a href="https://drive.google.com/file/d/1n6HCk39KNJGOCp43fli80Nyql4ANmTe3/view?usp=sharing"
            target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovBtn(true)} onMouseLeave={() => setHovBtn(false)}
            style={{
              position: "relative",
              overflow: "hidden",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1.5px solid #a3e635",
              borderRadius: "100px",
              padding: "11px 24px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "2px",
              cursor: "pointer",
              textDecoration: "none",
              color: hovBtn ? "#000" : "#a3e635",
              transition: "color 0.3s",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
            <span style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: hovBtn ? "100%" : "0%", background: "#a3e635", transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)", zIndex: 0 }} />
            <FaDownload size={11} style={{ position: "relative", zIndex: 1 }} />
            <span style={{ position: "relative", zIndex: 1, whiteSpace: "nowrap" }}>Resume</span>
          </a>
          <div style={{ width: 1, height: 26, background: "#1e1e1e" }} />
          <div style={{ display: "flex", gap: "8px" }}>
            {socials.map(({ href, icon }, i) => (
              <SocialLink key={i} href={href} icon={icon} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialLink = ({ href, icon }) => {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 36,
        height: 36,
        borderRadius: "10px",
        border: `1px solid ${h ? "#a3e635" : "#222"}`,
        background: h ? "rgba(163,230,53,0.08)" : "transparent",
        color: h ? "#a3e635" : "#666",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transform: h ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.22s",
      }}
    >
      {icon}
    </a>
  );
};

export default About;