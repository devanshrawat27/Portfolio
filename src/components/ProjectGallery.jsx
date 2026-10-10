import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaTimes, FaCode } from "react-icons/fa";
import { HiArrowLeft, HiOutlineViewGrid, HiOutlineFilm } from "react-icons/hi";
import { PROJECTS } from "../data/projectsData";
import { TECH_ICONS_MAP } from "../data/techIcons";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
}

// ── DETAIL MODAL ─────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose, onPrev, onNext }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;
  const rgb = hexToRgb(project.accent);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "820px",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "#08080b",
          borderRadius: "24px",
          border: `1px solid ${project.accent}66`,
          boxShadow: `0 30px 90px -15px rgba(0,0,0,0.95), 0 0 50px -10px rgba(${rgb},0.4)`,
          position: "relative",
        }}
      >
        {/* Top glowing bar */}
        <div
          style={{
            height: "2px",
            width: "100%",
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            boxShadow: `0 0 16px ${project.accent}`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = project.accent;
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          <FaTimes size={14} />
        </button>

        {/* Modal Banner Image */}
        <div style={{ position: "relative", height: "260px", overflow: "hidden", backgroundColor: "#040406" }}>
          <img
            src={project.image}
            alt={project.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #08080b 0%, transparent 75%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                backgroundColor: "rgba(0,0,0,0.85)",
                border: `1px solid ${project.accent}66`,
                color: project.accent,
                fontSize: "10px",
                fontWeight: 800,
                padding: "5px 14px",
                borderRadius: "100px",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "1px",
              }}
            >
              PROJECT // {project.num}
            </span>
            <span
              style={{
                backgroundColor: "rgba(0,0,0,0.85)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f0",
                fontSize: "10px",
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: "100px",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {project.year}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: "28px clamp(20px, 4vw, 36px)" }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 900,
              fontFamily: "'Syne', 'Arial Black', sans-serif",
              color: "#ffffff",
              margin: "0 0 4px",
              letterSpacing: "-0.5px",
            }}
          >
            {project.name}
          </h2>

          <p
            style={{
              color: project.accent,
              fontSize: "13px",
              fontWeight: 700,
              margin: "0 0 18px",
              letterSpacing: "0.5px",
            }}
          >
            {project.subtitle}
          </p>

          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.8",
              color: "#cbd5e1",
              margin: "0 0 24px",
            }}
          >
            {project.description}
          </p>

          {/* Highlights */}
          <div style={{ marginBottom: "26px" }}>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 800,
                color: "#94a3b8",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                margin: "0 0 12px",
              }}
            >
              Key Architecture & Engineering Highlights
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: project.accent,
                      boxShadow: `0 0 6px ${project.accent}`,
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: "13px", color: "#f1f5f9", lineHeight: 1.6 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: "32px" }}>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 800,
                color: "#94a3b8",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                margin: "0 0 12px",
              }}
            >
              Tech Stack & Dependencies
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {project.tech.map((t) => {
                const item = TECH_ICONS_MAP[t] || { icon: FaCode, color: project.accent };
                const IconComp = item.icon;
                return (
                  <span
                    key={t}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: `rgba(${rgb},0.12)`,
                      border: `1px solid ${project.accent}44`,
                      color: project.accent,
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "5px 14px",
                      borderRadius: "100px",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <IconComp size={12} style={{ color: item.color, flexShrink: 0 }} />
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Actions Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              flexWrap: "wrap",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={onPrev}
                style={{
                  padding: "8px 16px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                }}
              >
                ← Prev
              </button>
              <button
                onClick={onNext}
                style={{
                  padding: "8px 16px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                }}
              >
                Next →
              </button>
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: project.accent,
                color: "#000000",
                padding: "11px 26px",
                borderRadius: "100px",
                fontSize: "11.5px",
                fontWeight: 800,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "1px",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: `0 0 25px rgba(${rgb},0.5)`,
              }}
            >
              <FaGithub size={15} />
              <span>Launch Repository on GitHub</span>
              <span style={{ fontSize: "14px" }}>↗</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── PROJECT CARD ─────────────────────────────────────────────────────────────
const GalleryCard = ({ project, onSelectModal, style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rgb = hexToRgb(project.accent);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        borderRadius: "22px",
        overflow: "hidden",
        backgroundColor: "#08080a",
        border: `1px solid ${isHovered ? project.accent + "77" : "rgba(255,255,255,0.08)"}`,
        boxShadow: isHovered
          ? `0 24px 60px -10px rgba(0,0,0,0.95), 0 0 35px -5px rgba(${rgb},0.25)`
          : "0 10px 30px rgba(0,0,0,0.8)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Top accent light beam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: isHovered ? 1 : 0.45,
          boxShadow: isHovered ? `0 0 14px ${project.accent}` : "none",
          zIndex: 10,
        }}
      />

      {/* Media Header */}
      <div style={{ position: "relative", height: "215px", overflow: "hidden", backgroundColor: "#040406" }}>
        {/* Background Watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "-15px",
            right: "-10px",
            fontSize: "130px",
            fontWeight: 900,
            fontFamily: "'Arial Black', sans-serif",
            color: project.accent,
            opacity: isHovered ? 0.12 : 0.04,
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
            transition: "opacity 0.35s ease",
            zIndex: 1,
          }}
        >
          {project.num}
        </div>

        <img
          src={project.image}
          alt={project.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: isHovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            position: "relative",
            zIndex: 2,
          }}
          onError={(e) => { e.target.style.display = "none"; }}
        />

        {/* Dark vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            background: "linear-gradient(to top, #08080a 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Category Tag */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 5,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(0,0,0,0.85)",
            border: `1px solid ${project.accent}66`,
            color: project.accent,
            fontSize: "9.5px",
            fontWeight: 800,
            padding: "4px 12px",
            borderRadius: "100px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: project.accent,
              boxShadow: `0 0 6px ${project.accent}`,
            }}
          />
          {project.tag}
        </div>

        {/* Year */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 5,
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 11px",
            borderRadius: "100px",
            background: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#e2e8f0",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10.5px",
            fontWeight: 700,
          }}
        >
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 800,
              color: project.accent,
              letterSpacing: "1.5px",
            }}
          >
            PROJECT // {project.num}
          </span>
        </div>

        <h3
          style={{
            fontSize: "1.35rem",
            fontWeight: 900,
            fontFamily: "'Syne', 'Arial Black', sans-serif",
            color: "#ffffff",
            margin: "0 0 4px",
            letterSpacing: "-0.5px",
          }}
        >
          {project.name}
        </h3>

        <p
          style={{
            color: project.accent,
            fontSize: "11px",
            fontWeight: 700,
            margin: "0 0 10px",
            letterSpacing: "0.5px",
          }}
        >
          {project.subtitle}
        </p>

        <p
          style={{
            fontSize: "12px",
            lineHeight: "1.65",
            color: "#94a3b8",
            margin: "0 0 14px",
            flexGrow: 1,
          }}
        >
          {project.description.length > 130
            ? project.description.slice(0, 130) + "..."
            : project.description}
        </p>

        {/* Highlights */}
        <div style={{ marginBottom: "16px" }}>
          {project.highlights.slice(0, 2).map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "5px" }}>
              <span
                style={{
                  width: 4.5,
                  height: 4.5,
                  borderRadius: "50%",
                  backgroundColor: project.accent,
                  boxShadow: `0 0 6px ${project.accent}`,
                  marginTop: 6,
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "#cbd5e1", fontSize: "11px", lineHeight: 1.45 }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Tech Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "18px" }}>
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              style={{
                backgroundColor: `rgba(${rgb},0.12)`,
                border: `1px solid ${project.accent}33`,
                color: project.accent,
                fontSize: "9px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "100px",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
                fontSize: "9px",
                fontWeight: 700,
                padding: "3px 7px",
                borderRadius: "100px",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Bottom Dual Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "8px", marginTop: "auto" }}>
          <button
            onClick={() => onSelectModal(project)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "8px 10px",
              borderRadius: "100px",
              fontSize: "10px",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#f1f5f9",
              cursor: "pointer",
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.borderColor = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>Specs</span>
            <span style={{ fontSize: "10px" }}>🔍</span>
          </button>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "8px 10px",
              borderRadius: "100px",
              fontSize: "10px",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              textDecoration: "none",
              backgroundColor: project.accent,
              border: `1px solid ${project.accent}`,
              color: "#000000",
              cursor: "pointer",
              boxShadow: `0 2px 14px rgba(${rgb},0.4)`,
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(${rgb},0.65)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 2px 14px rgba(${rgb},0.4)`;
            }}
          >
            <FaGithub size={11} style={{ flexShrink: 0 }} />
            <span style={{ whiteSpace: "nowrap" }}>GitHub</span>
            <span style={{ fontSize: "10px" }}>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// ── MAIN GALLERY COMPONENT ───────────────────────────────────────────────────
const ProjectGallery = ({ onBack }) => {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [browseHov, setBrowseHov] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState("slider"); // 'slider' | 'grid'
  const [cardWidth, setCardWidth] = useState(370);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const updateWidth = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 640) {
        setCardWidth(Math.min(window.innerWidth - 36, 310));
      } else if (window.innerWidth < 1024) {
        setCardWidth(340);
      } else {
        setCardWidth(370);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % totalCards);
      } else {
        setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
      }
    }
  };

  const handleNextProject = () => {
    if (!activeModalProject) return;
    const currIdx = PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const nextIdx = (currIdx + 1) % PROJECTS.length;
    setActiveModalProject(PROJECTS[nextIdx]);
  };

  const handlePrevProject = () => {
    if (!activeModalProject) return;
    const currIdx = PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const prevIdx = (currIdx - 1 + PROJECTS.length) % PROJECTS.length;
    setActiveModalProject(PROJECTS[prevIdx]);
  };
  // ── COVERFLOW CAROUSEL ─────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = PROJECTS.length;

  // Auto-rotate every 3 seconds
  useEffect(() => {
    if (viewMode !== "slider" || isPaused || activeModalProject) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, 3000);
    return () => clearInterval(timer);
  }, [viewMode, isPaused, activeModalProject, totalCards]);

  // Get the shortest offset from activeIndex (wrapping around)
  const getOffset = (idx) => {
    let diff = idx - activeIndex;
    // Wrap around for shortest path
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;
    return diff;
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        color: "#ffffff",
        padding: "clamp(120px, 14vw, 150px) 0 clamp(60px, 8vw, 100px)",
        position: "relative",
      }}
    >

      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(163,230,53,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 60px)", position: "relative", zIndex: 1 }}>
        {/* BACK BUTTON */}
        <div style={{ marginBottom: "28px" }}>
          <button
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e2e8f0",
              padding: "7px 18px",
              borderRadius: "100px",
              fontSize: "11px",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              letterSpacing: "1px",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#a3e635";
              e.currentTarget.style.borderColor = "#a3e635";
              e.currentTarget.style.color = "#000000";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(163,230,53,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#e2e8f0";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <HiArrowLeft size={14} />
            <span>BACK</span>
          </button>
        </div>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "32px",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                padding: "5px 14px",
                borderRadius: "100px",
                background: "linear-gradient(135deg, rgba(163,230,53,0.1) 0%, rgba(163,230,53,0.02) 100%)",
                border: "1px solid rgba(163,230,53,0.28)",
                boxShadow: "0 0 16px rgba(163,230,53,0.08)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#a3e635",
                  boxShadow: "0 0 8px #a3e635",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#a3e635",
                  fontSize: "11px",
                  letterSpacing: "3px",
                  fontWeight: 800,
                }}
              >
                SELECTED_WORK
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Arial Black', sans-serif",
                fontSize: "clamp(2.4rem, 8vw, 5.2rem)",
                fontWeight: 900,
                color: "#fff",
                margin: 0,
                lineHeight: 0.9,
                letterSpacing: "-2px",
              }}
            >
              PROJECT<br />
              <span style={{ color: "#a3e635" }}>GALLERY</span>
            </h1>
          </div>

          {/* CONTROLS ROW */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "inline-flex",
                backgroundColor: "rgba(255,255,255,0.04)",
                padding: "3px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                onClick={() => setViewMode("slider")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  backgroundColor: viewMode === "slider" ? "#a3e635" : "transparent",
                  color: viewMode === "slider" ? "#000" : "#94a3b8",
                  border: "none",
                  fontSize: "10.5px",
                  fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <HiOutlineFilm size={13} />
                <span>CAROUSEL</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  backgroundColor: viewMode === "grid" ? "#a3e635" : "transparent",
                  color: viewMode === "grid" ? "#000" : "#94a3b8",
                  border: "none",
                  fontSize: "10.5px",
                  fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <HiOutlineViewGrid size={13} />
                <span>GRID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, rgba(163,230,53,0.3), #1a1a1a, transparent)",
            marginBottom: "0px",
          }}
        />
      </div>

      {/* COVERFLOW CAROUSEL */}
      {viewMode === "slider" && (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "610px" : "580px",
            overflow: "hidden",
            perspective: "1400px",
            perspectiveOrigin: "50% 45%",
            marginTop: isMobile ? "10px" : "30px",
          }}
        >
          {PROJECTS.map((project, idx) => {
            const offset = getOffset(idx);
            const absOffset = Math.abs(offset);

            // Only render cards within visible range (±3 from active)
            if (absOffset > 3) return null;

            // Horizontal position: center card at 50%, others spread outward
            const translateX = offset * (cardWidth * (isMobile ? 0.8 : 0.65));
            // Scale: center=1, ±1=0.82, ±2=0.68, ±3=0.56
            const scale = Math.max(1 - absOffset * 0.18, 0.5);
            // Rotation: tilt cards toward center
            const rotateY = offset * (isMobile ? -25 : -35);
            // Z-depth: center card in front, others recede
            const translateZ = -absOffset * (isMobile ? 80 : 120);
            // Vertical offset: slight arc
            const translateY = absOffset * absOffset * 8;
            // Opacity: fade out further cards
            const opacity = Math.max(1 - absOffset * (isMobile ? 0.45 : 0.3), 0.1);

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (offset !== 0) {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "50%",
                  width: `${cardWidth}px`,
                  marginLeft: `-${cardWidth / 2}px`,
                  transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: 100 - absOffset * 10,
                  transition: "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                  transformOrigin: "center center",
                  cursor: offset !== 0 ? "pointer" : "default",
                  filter: absOffset > 0 ? `brightness(${1 - absOffset * 0.15})` : "none",
                  pointerEvents: absOffset > 2 ? "none" : "auto",
                }}
              >
                <GalleryCard
                  project={project}
                  onSelectModal={(p) => setActiveModalProject(p)}
                  style={{
                    width: `${cardWidth}px`,
                  }}
                />
              </div>
            );
          })}

          {/* Desktop Navigation arrows (hidden on mobile) */}
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards)}
            style={{
              position: "absolute",
              left: "clamp(20px, 5vw, 80px)",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              display: isMobile ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 300,
              transition: "all 0.25s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#a3e635";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.borderColor = "#a3e635";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(163,230,53,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ‹
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % totalCards)}
            style={{
              position: "absolute",
              right: "clamp(20px, 5vw, 80px)",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              display: isMobile ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 300,
              transition: "all 0.25s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#a3e635";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.borderColor = "#a3e635";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(163,230,53,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ›
          </button>

          {/* Dot indicators and mobile touch arrows */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "10px",
              zIndex: 300,
            }}
          >
            {isMobile && (
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginRight: "4px",
                }}
              >
                ‹
              </button>
            )}
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  width: activeIndex === idx ? (isMobile ? "20px" : "28px") : "6px",
                  height: "6px",
                  borderRadius: "100px",
                  backgroundColor: activeIndex === idx ? "#a3e635" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                  boxShadow: activeIndex === idx ? "0 0 12px rgba(163,230,53,0.6)" : "none",
                }}
              />
            ))}
            {isMobile && (
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % totalCards)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginLeft: "4px",
                }}
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}

      {/* STATIC GRID VIEW (Optional toggle) */}
      {viewMode === "grid" && (
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 clamp(16px, 4vw, 60px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))",
              gap: isMobile ? "16px" : "24px",
              marginBottom: "40px",
            }}
          >
            {PROJECTS.map((project) => (
              <GalleryCard
                key={project.id}
                project={project}
                onSelectModal={(p) => setActiveModalProject(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM GITHUB ACTION */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "36px", position: "relative", zIndex: 1, padding: isMobile ? "36px 14px 0" : "36px 0 0" }}>
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
            gap: isMobile ? "8px" : "12px",
            border: "1.5px solid #a3e635",
            borderRadius: "100px",
            padding: isMobile ? "12px 24px" : "14px 44px",
            fontSize: isMobile ? "10px" : "11.5px",
            fontWeight: 800,
            letterSpacing: isMobile ? "1.5px" : "2.5px",
            textDecoration: "none",
            textTransform: "uppercase",
            color: browseHov ? "#000000" : "#a3e635",
            transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: browseHov
              ? "0 0 35px rgba(163,230,53,0.4)"
              : "0 0 16px rgba(163,230,53,0.15)",
            cursor: "pointer",
            maxWidth: "calc(100vw - 32px)",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#a3e635",
              transform: browseHov ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "bottom",
              transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
          <FaGithub size={15} style={{ position: "relative", zIndex: 1 }} />
          <span style={{ position: "relative", zIndex: 1, fontFamily: "'JetBrains Mono', monospace" }}>
            Explore All On GitHub
          </span>
          <span style={{ position: "relative", zIndex: 1, fontSize: "16px" }}>→</span>
        </a>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {activeModalProject && (
          <ProjectModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
            onPrev={handlePrevProject}
            onNext={handleNextProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectGallery;
