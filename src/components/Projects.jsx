import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

import { PROJECTS } from "../data/projectsData";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
}

// ── MOBILE PROJECT CARD ────────────────────────────────────────────────────
const MobileProjectCard = ({ project }) => {
  const [hov, setHov] = useState(false);
  const rgb = hexToRgb(project.accent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onTouchStart={() => setHov(true)}
      onTouchEnd={() => setTimeout(() => setHov(false), 300)}
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        marginBottom: "16px",
        backgroundColor: "#08080a",
        background: hov
          ? "linear-gradient(145deg, #141419 0%, #08080a 100%)"
          : "linear-gradient(145deg, #0e0e12 0%, #050507 100%)",
        border: `1px solid ${hov ? project.accent + "66" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hov
          ? `0 16px 40px -10px rgba(0,0,0,0.95), 0 0 30px -5px rgba(${rgb},0.25)`
          : "0 8px 30px rgba(0,0,0,0.85)",
        transition: "all 0.3s ease",
        position: "relative",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Top accent light beam */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        opacity: hov ? 1 : 0.6,
        boxShadow: `0 0 10px ${project.accent}`,
        zIndex: 10,
      }} />

      {/* Image */}
      <div style={{ position: "relative", height: "clamp(160px, 45vw, 210px)", overflow: "hidden" }}>
        <img
          src={project.image}
          alt={project.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hov ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease",
          }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(8,8,10,0.95) 0%, transparent 60%)`, pointerEvents: "none" }} />

        {/* Tag chip */}
        <div style={{
          position: "absolute", top: 10, left: 10,
          display: "inline-flex", alignItems: "center", gap: "5px",
          backgroundColor: "rgba(0,0,0,0.8)", border: `1px solid ${project.accent}66`,
          color: project.accent, fontSize: "8.5px", fontWeight: 800, padding: "3px 10px",
          borderRadius: "100px", letterSpacing: "1px", textTransform: "uppercase",
          boxShadow: `0 4px 16px rgba(0,0,0,0.6)`,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: project.accent, boxShadow: `0 0 6px ${project.accent}` }} />
          {project.tag}
        </div>

        {/* Year */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          display: "inline-flex", alignItems: "center", gap: "5px",
          padding: "3px 10px", borderRadius: "100px",
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#e2e8f0", fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px", letterSpacing: "1px", fontWeight: 700,
        }}>
          {project.year}
        </div>

        {/* Github round button */}
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{
            position: "absolute", bottom: 10, right: 10, width: 38, height: 38,
            borderRadius: "50%", backgroundColor: project.accent, color: "#000",
            fontSize: "16px", fontWeight: 900, display: "flex", alignItems: "center",
            justifyContent: "center", textDecoration: "none",
            boxShadow: `0 4px 20px rgba(${rgb},0.55)`,
          }}>↗</a>
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "2px 8px", borderRadius: "100px",
            background: `rgba(${rgb},0.12)`, border: `1px solid ${project.accent}44`,
            color: project.accent, fontSize: "8.5px", fontWeight: 800, letterSpacing: "1.5px",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            PROJECT // {project.num}
          </span>
        </div>

        <h3 style={{
          fontSize: "clamp(1.15rem, 5vw, 1.5rem)", fontWeight: 900,
          fontFamily: "'Syne', 'Arial Black', sans-serif", color: "#fff",
          margin: "0 0 3px", letterSpacing: "-0.5px", lineHeight: 1.15,
          wordBreak: "break-word",
        }}>{project.name}</h3>

        <p style={{ color: project.accent, fontSize: "10.5px", fontWeight: 700, margin: "0 0 10px", letterSpacing: "0.3px", wordBreak: "break-word" }}>
          {project.subtitle}
        </p>

        <p style={{ fontSize: "11.5px", color: "#94a3b8", lineHeight: "1.7", margin: "0 0 14px", wordBreak: "break-word" }}>
          {project.description}
        </p>

        {/* Highlights */}
        <div style={{ marginBottom: "14px" }}>
          {project.highlights.slice(0, 3).map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "7px", marginBottom: "5px" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: project.accent, boxShadow: `0 0 6px ${project.accent}`, marginTop: 6, flexShrink: 0 }} />
              <span style={{ color: "#cbd5e1", fontSize: "11px", lineHeight: 1.5, wordBreak: "break-word" }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {project.tech.map(t => (
            <span key={t} style={{
              backgroundColor: `rgba(${rgb},0.12)`,
              border: `1px solid ${project.accent}35`,
              color: project.accent,
              fontSize: "8.5px",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "100px",
              letterSpacing: "0.3px",
              fontFamily: "'JetBrains Mono', monospace",
            }}>{t}</span>
          ))}
        </div>

        {/* GitHub link */}
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            color: "#ffffff", border: "1px solid rgba(255,255,255,0.12)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            padding: "8px 16px", borderRadius: "100px", fontSize: "10px", fontWeight: 700,
            textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace", width: "100%", justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            boxSizing: "border-box",
          }}>
          <FaGithub size={12} />
          <span>View on GitHub</span>
          <span style={{ fontSize: "12px" }}>↗</span>
        </a>
      </div>
    </motion.div>
  );
};

// ── DESKTOP PROJECT CARD ───────────────────────────────────────────────────
const DesktopProjectCard = ({ project, index, total, containerProgress }) => {
  const [hov, setHov] = useState(false);
  const rgb = hexToRgb(project.accent);
  const cardRef = useRef(null);
  const stickyTop = 80;
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const rawScale = useTransform(containerProgress, [segStart, segEnd], [1, 0.95]);
  const scale = useSpring(rawScale, { stiffness: 120, damping: 26 });

  return (
    <motion.div ref={cardRef} style={{ scale, position: "sticky", top: stickyTop + index * 10, zIndex: index + 1, marginBottom: "24px" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          minHeight: "480px",
          display: "grid",
          gridTemplateColumns: "1.08fr 1fr",
          backgroundColor: "#060608",
          background: hov
            ? "linear-gradient(145deg, #131318 0%, #070709 100%)"
            : "linear-gradient(145deg, #0e0e12 0%, #050507 100%)",
          border: `1px solid ${hov ? project.accent + "77" : "rgba(255,255,255,0.09)"}`,
          boxShadow: hov
            ? `0 30px 80px -10px rgba(0,0,0,0.95), 0 0 45px -5px rgba(${rgb},0.28), inset 0 1px 1px rgba(255,255,255,0.22)`
            : "0 20px 60px -10px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.04)",
          transition: "border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease",
        }}
      >
        {/* Top ambient lighting beam */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent 0%, ${project.accent} 50%, transparent 100%)`,
          opacity: hov ? 1 : 0.45,
          boxShadow: hov ? `0 0 18px ${project.accent}` : `0 0 8px ${project.accent}66`,
          transition: "all 0.35s ease",
          zIndex: 10,
        }} />

        {/* Left Image Panel */}
        <div style={{ position: "relative", overflow: "hidden", background: "#050505" }}>
          {/* Watermark Number */}
          <div style={{
            position: "absolute", bottom: "-20px", right: "-10px", fontSize: "160px",
            fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: project.accent,
            opacity: hov ? 0.08 : 0.03, lineHeight: 1, pointerEvents: "none", userSelect: "none",
            transition: "opacity 0.4s", zIndex: 1,
          }}>{project.num}</div>

          <img
            src={project.image}
            alt={project.name}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "480px",
              transform: hov ? "scale(1.06)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              position: "relative", zIndex: 2,
            }}
            onError={e => { e.target.style.display = "none"; }}
          />

          {/* Vignette Gradients */}
          <div style={{ position: "absolute", inset: 0, zIndex: 3, background: `linear-gradient(to right, transparent 60%, #050507 100%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 4, background: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)`, pointerEvents: "none" }} />

          {/* Tag Pill */}
          <div style={{
            position: "absolute", top: 22, left: 22, zIndex: 5,
            display: "inline-flex", alignItems: "center", gap: "6px",
            backgroundColor: "rgba(0,0,0,0.8)", border: `1px solid ${project.accent}66`,
            color: project.accent, fontSize: "10px", fontWeight: 800, padding: "5px 14px",
            borderRadius: "100px", letterSpacing: "1px", textTransform: "uppercase",
            boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
            backdropFilter: "blur(12px)",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: project.accent, boxShadow: `0 0 6px ${project.accent}` }} />
            {project.tag}
          </div>

          {/* Year Pill */}
          <div style={{
            position: "absolute", bottom: 22, left: 22, zIndex: 5,
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "5px 14px", borderRadius: "100px",
            background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#e2e8f0", fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px", letterSpacing: "1.5px", fontWeight: 700,
            boxShadow: "0 4px 12px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.15)",
          }}>
            {project.year}
          </div>

          {/* Circular Hover Launch Orb */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute", bottom: 20, right: 20, zIndex: 6,
              width: 48, height: 48, borderRadius: "50%",
              backgroundColor: hov ? project.accent : "rgba(0,0,0,0.75)",
              border: `1px solid ${hov ? project.accent : "rgba(255,255,255,0.18)"}`,
              color: hov ? "#000" : "#fff",
              fontSize: "18px", fontWeight: 900,
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none",
              boxShadow: hov ? `0 0 25px rgba(${rgb},0.6)` : "0 4px 14px rgba(0,0,0,0.5)",
              transform: hov ? "scale(1.1)" : "scale(1)",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            ↗
          </a>
        </div>

        {/* Right Content Panel */}
        <div style={{
          padding: "clamp(32px, 3.5vw, 44px)",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between", position: "relative",
          backgroundColor: "#050507",
        }}>
          {/* Background Watermark */}
          <div style={{
            position: "absolute", top: "50%", right: "-30px", transform: "translateY(-50%)",
            fontSize: "220px", fontWeight: 900, fontFamily: "'Arial Black', sans-serif",
            color: "#fff", opacity: 0.012, lineHeight: 1, pointerEvents: "none", userSelect: "none",
          }}>{project.num}</div>

          <div>
            {/* Project Index Micro-Pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "4px 12px", borderRadius: "100px",
                background: `rgba(${rgb},0.12)`, border: `1px solid ${project.accent}44`,
                color: project.accent, fontSize: "10.5px", fontWeight: 800, letterSpacing: "1.5px",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                <span style={{ width: 4.5, height: 4.5, borderRadius: "50%", backgroundColor: project.accent, boxShadow: `0 0 6px ${project.accent}` }} />
                PROJECT // {project.num}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: "clamp(1.65rem, 2.3vw, 2.3rem)",
              fontWeight: 900,
              fontFamily: "'Syne', 'Arial Black', sans-serif",
              color: "#ffffff",
              margin: "0 0 6px",
              letterSpacing: "-0.5px",
              lineHeight: 1.15,
              textShadow: hov ? `0 0 35px rgba(${rgb},0.3)` : "none",
              transition: "text-shadow 0.3s ease",
            }}>
              {project.name}
            </h3>

            {/* Subtitle */}
            <p style={{
              color: project.accent,
              fontSize: "12px",
              fontWeight: 700,
              margin: "0 0 16px",
              letterSpacing: "0.5px",
              fontFamily: "'Inter', sans-serif",
            }}>
              {project.subtitle}
            </p>

            {/* Description */}
            <p style={{
              fontSize: "13.5px",
              lineHeight: "1.75",
              margin: "0 0 20px",
              color: "#94a3b8",
              fontFamily: "'Inter', sans-serif",
            }}>
              {project.description}
            </p>

            {/* Highlights */}
            <div style={{ marginBottom: "22px" }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: "50%",
                    backgroundColor: project.accent,
                    boxShadow: `0 0 6px ${project.accent}`,
                    marginTop: 7, flexShrink: 0,
                  }} />
                  <span style={{ color: hov ? "#f1f5f9" : "#cbd5e1", fontSize: "12.5px", lineHeight: 1.55, transition: "color 0.25s ease" }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Tech chips + GitHub Action Button */}
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "22px" }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  backgroundColor: hov ? `rgba(${rgb},0.15)` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hov ? project.accent + "55" : "rgba(255,255,255,0.08)"}`,
                  color: hov ? "#ffffff" : project.accent,
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "100px",
                  letterSpacing: "0.5px",
                  fontFamily: "'JetBrains Mono', monospace",
                  boxShadow: hov ? `0 2px 10px rgba(${rgb},0.25)` : "none",
                  transition: "all 0.3s ease",
                }}>{t}</span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(12px)",
                padding: "10px 24px",
                borderRadius: "100px",
                fontSize: "11px",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow: "0 4px 14px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = project.accent;
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.backgroundColor = project.accent;
                e.currentTarget.style.boxShadow = `0 0 24px rgba(${rgb},0.5)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)";
              }}
            >
              <FaGithub size={13} />
              <span>View on GitHub</span>
              <span style={{ fontSize: "13px" }}>↗</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── MAIN ─────────────────────────────────────────────────────────────────────
const Projects = () => {
  const containerRef = useRef(null);
  const [browseHov, setBrowseHov] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section id="projects" ref={containerRef} style={{ backgroundColor: "transparent", padding: isMobile ? "60px 14px 40px" : `clamp(80px,10vw,130px) clamp(16px,4vw,60px) clamp(60px,8vw,100px)`, color: "#fff", position: "relative", maxWidth: "100%", boxSizing: "border-box", overflowX: "hidden" }}>
      {/* Ambient background glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)",
        width: "800px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(163,230,53,0.035) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* HEADER */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
        flexDirection: isMobile ? "column" : "row",
        marginBottom: isMobile ? "24px" : "56px", gap: isMobile ? "16px" : "60px",
        flexWrap: "wrap", position: "relative", zIndex: 1,
      }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
            padding: "5px 14px",
            borderRadius: "100px",
            background: "linear-gradient(135deg, rgba(163,230,53,0.1) 0%, rgba(163,230,53,0.02) 100%)",
            border: "1px solid rgba(163,230,53,0.28)",
            boxShadow: "0 0 16px rgba(163,230,53,0.08)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#a3e635", fontSize: "11px", letterSpacing: "3px", fontWeight: 800 }}>
              SELECTED_WORK
            </span>
          </div>
          <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(2.4rem,9vw,5.5rem)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 0.88, letterSpacing: "-2px" }}>
            FEATURED<br /><span style={{ color: "#a3e635" }}>PROJECTS</span>
          </h2>
        </motion.div>

        {/* Header Right: Interactive Project Gallery CTA Button */}
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          onClick={() => { window.location.hash = "#gallery"; }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: isMobile ? "9px 18px" : "11px 24px",
            borderRadius: "100px",
            background: "linear-gradient(135deg, rgba(163,230,53,0.12) 0%, rgba(163,230,53,0.03) 100%)",
            border: "1.5px solid #a3e635",
            color: "#ffffff",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: isMobile ? "11px" : "12px",
            fontWeight: 800,
            letterSpacing: "1.2px",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(163,230,53,0.22)",
            transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            marginBottom: "12px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#a3e635";
            e.currentTarget.style.color = "#000000";
            e.currentTarget.style.boxShadow = "0 0 32px rgba(163,230,53,0.55)";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(163,230,53,0.12) 0%, rgba(163,230,53,0.03) 100%)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(163,230,53,0.22)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635" }} />
          <span style={{ whiteSpace: "nowrap" }}>PROJECT GALLERY</span>
          <span style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "2px 7px",
            borderRadius: "100px",
            fontSize: "10px",
            fontWeight: 800,
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            08
          </span>
          <span style={{ fontSize: "14px" }}>↗</span>
        </motion.button>
      </div>

      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, rgba(163,230,53,0.3), #1a1a1a, transparent)", marginBottom: isMobile ? "24px" : "48px" }} />

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
        {PROJECTS.map((project, index) =>
          isMobile ? (
            <MobileProjectCard key={project.id} project={project} />
          ) : (
            <DesktopProjectCard key={project.id} project={project} index={index} total={PROJECTS.length} containerProgress={scrollYProgress} />
          )
        )}
      </div>

      {/* Browse all */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ display: "flex", justifyContent: "center", paddingTop: isMobile ? "40px" : "80px", position: "relative", zIndex: 1 }}>
        <a
          href="https://github.com/devanshrawat27"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setBrowseHov(true)}
          onMouseLeave={() => setBrowseHov(false)}
          style={{
            position: "relative",
            overflow: "hidden",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            border: "1.5px solid #a3e635",
            borderRadius: "100px",
            padding: isMobile ? "13px 26px" : "15px 48px",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "2px",
            textDecoration: "none",
            textTransform: "uppercase",
            color: browseHov ? "#000000" : "#a3e635",
            transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: browseHov ? "0 0 35px rgba(163,230,53,0.4)" : "0 0 16px rgba(163,230,53,0.15)",
            cursor: "pointer",
            whiteSpace: "nowrap",
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          <span style={{ position: "absolute", inset: 0, backgroundColor: "#a3e635", transform: browseHov ? "scaleY(1)" : "scaleY(0)", transformOrigin: "bottom", transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)" }} />
          <FaGithub size={15} style={{ position: "relative", zIndex: 1, flexShrink: 0 }} />
          <span style={{ position: "relative", zIndex: 1, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>Browse All Projects</span>
          <span style={{ position: "relative", zIndex: 1, fontSize: "16px", flexShrink: 0 }}>→</span>
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;