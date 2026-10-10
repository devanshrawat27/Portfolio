import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaCode,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { PROJECTS } from "../data/projectsData";
import { LIME, TECH_ICONS_MAP } from "../data/techIcons";

const renderTechBadge = (t, isSmall = false) => {
  const item = TECH_ICONS_MAP[t] || { icon: FaCode, color: LIME };
  const IconComp = item.icon;
  return (
    <span
      key={t}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isSmall ? "5px" : "7px",
        padding: isSmall ? "3px 9px" : "5px 12px",
        borderRadius: "100px",
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(6px)",
        color: "#e2e8f0",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: isSmall ? "8.5px" : "10px",
        fontWeight: 600,
        letterSpacing: "0.3px",
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(163,230,53,0.45)";
        e.currentTarget.style.background = "rgba(163,230,53,0.08)";
        e.currentTarget.style.transform = "translateY(-1.5px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <IconComp style={{ color: item.color, fontSize: isSmall ? "10px" : "13px", flexShrink: 0 }} />
      <span>{t}</span>
    </span>
  );
};

// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// CINEMATIC PROJECT SLIDE — Slidable & Interactive
// ═══════════════════════════════════════════════════════
const CinematicSlide = ({ project, direction, goNext, goPrev }) => {
  const [imgHov, setImgHov] = useState(false);
  const [btnHov1, setBtnHov1] = useState(false);
  const [btnHov2, setBtnHov2] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shiftX: 0, shiftY: 0 });

  // Cinematic depth transition: current scales/blurs backward, next scales forward into focus
  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 0.92,
      filter: "blur(14px)",
      x: dir > 0 ? 50 : -50,
    }),
    center: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      x: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.88,
      filter: "blur(16px)",
      x: dir > 0 ? -50 : 50,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 8, // subtle max 4deg vertical tilt
      rotateY: x * 10,  // subtle max 5deg horizontal tilt
      shiftX: x * 16,  // gentle translation
      shiftY: y * 12,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setImgHov(false);
    setTilt({ rotateX: 0, rotateY: 0, shiftX: 0, shiftY: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setImgHov(true);
  }, []);

  return (
    <motion.div
      key={project.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        const threshold = 50;
        if (info.offset.x < -threshold || info.velocity.x < -300) {
          goNext();
        } else if (info.offset.x > threshold || info.velocity.x > 300) {
          goPrev();
        }
      }}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 clamp(20px, 5vw, 80px)",
        cursor: "grab",
        userSelect: "none",
        boxSizing: "border-box",
      }}
      whileTap={{ cursor: "grabbing" }}
    >
      <div style={{
        width: "100%",
        maxWidth: "1180px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1.15fr",
        gap: "clamp(24px, 3.2vw, 44px)",
        alignItems: "center",
      }}>
        {/* ── LEFT: Content ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 10,
          paddingLeft: 0,
        }}>
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              fontFamily: "'Syne', 'Arial Black', sans-serif",
              fontSize: "clamp(2.3rem, 3.7vw, 3.8rem)",
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 6px",
              letterSpacing: "-1.5px",
              lineHeight: 1.04,
            }}
          >
            {project.name}
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 700,
              color: LIME,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              margin: "0 0 20px",
              opacity: 0.9,
            }}
          >
            {project.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            style={{
              fontSize: "13.5px",
              lineHeight: 1.7,
              color: "#94a3b8",
              margin: "0 0 22px",
              maxWidth: "460px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {project.description.length > 180
              ? project.description.slice(0, 180) + "…"
              : project.description}
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            style={{ marginBottom: "22px" }}
          >
            {project.highlights.slice(0, 4).map((h, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                marginBottom: "7px",
              }}>
                <span style={{
                  width: 4, height: 4, borderRadius: "50%",
                  backgroundColor: LIME,
                  boxShadow: `0 0 6px ${LIME}`,
                  marginTop: 7, flexShrink: 0,
                }} />
                <span style={{
                  color: "#cbd5e1",
                  fontSize: "12px",
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif",
                }}>{h}</span>
              </div>
            ))}
          </motion.div>

          {/* Tech Stack with Real Brand Icons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.45 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "7px",
              marginBottom: "26px",
            }}
          >
            {project.tech.map(t => renderTechBadge(t))}
          </motion.div>

          {/* Actions — Smooth lime energy hover animations */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.45 }}
            onPointerDownCapture={e => e.stopPropagation()}
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "center",
              zIndex: 20,
            }}
          >
            {/* Primary CTA: View Project with lime energy aura & sweep */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setBtnHov1(true)}
              onMouseLeave={() => setBtnHov1(false)}
              style={{
                position: "relative",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                borderRadius: "100px",
                backgroundColor: LIME,
                color: "#000",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "1px",
                textDecoration: "none",
                textTransform: "uppercase",
                boxShadow: btnHov1
                  ? "0 0 32px rgba(163,230,53,0.75), 0 0 65px rgba(163,230,53,0.35), inset 0 1px 2px rgba(255,255,255,0.6)"
                  : "0 4px 24px rgba(163,230,53,0.3)",
                transform: btnHov1 ? "translateY(-2px) scale(1.025)" : "translateY(0) scale(1)",
                transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                cursor: "pointer",
              }}
            >
              {/* Smooth energy sweep reflection */}
              <motion.div
                animate={btnHov1 ? { x: ["-100%", "200%"] } : { x: "-100%" }}
                transition={{ duration: 0.85, repeat: btnHov1 ? Infinity : 0, repeatDelay: 0.35, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  pointerEvents: "none",
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>View Project</span>
              <motion.span
                animate={{ x: btnHov1 ? 3 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ position: "relative", zIndex: 1, fontSize: "14px", display: "inline-block" }}
              >
                →
              </motion.span>
            </a>

            {/* Secondary CTA: GitHub with lime energy border & glass glow */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setBtnHov2(true)}
              onMouseLeave={() => setBtnHov2(false)}
              style={{
                position: "relative",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "100px",
                border: btnHov2
                  ? "1.5px solid #a3e635"
                  : "1px solid rgba(255,255,255,0.15)",
                background: btnHov2
                  ? "radial-gradient(circle at center, rgba(163,230,53,0.15) 0%, rgba(163,230,53,0.03) 100%)"
                  : "rgba(255,255,255,0.03)",
                backdropFilter: "blur(8px)",
                color: btnHov2 ? "#a3e635" : "#fff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textDecoration: "none",
                textTransform: "uppercase",
                boxShadow: btnHov2
                  ? "0 0 28px rgba(163,230,53,0.38), inset 0 0 16px rgba(163,230,53,0.15)"
                  : "none",
                transform: btnHov2 ? "translateY(-2px) scale(1.025)" : "translateY(0) scale(1)",
                transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                cursor: "pointer",
              }}
            >
              <FaGithub size={15} style={{ color: btnHov2 ? LIME : "#fff", transition: "color 0.3s ease" }} />
              <span>GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Hero Screenshot with 3D Parallax, Float & Energy Glow ── */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            zIndex: 5,
            perspective: "1200px",
          }}
        >
          {/* Atmospheric ambient backdrop glow */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "130%",
            height: "130%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(163,230,53,0.03) 0%, transparent 60%)",
            pointerEvents: "none",
            zIndex: 0,
          }} />


          {/* Slow 3–5px organic floating motion wrapper */}
          <motion.div
            animate={{ y: [0, -4.5, 0] }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "820px",
              zIndex: 10,
              transformStyle: "preserve-3d",
              transform: "rotateY(-3deg) rotateX(2deg)",
            }}
          >
            {/* 3D Depth & Mouse Parallax Card */}
            <motion.div
              animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                x: tilt.shiftX,
                y: tilt.shiftY,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 24,
                mass: 0.6,
              }}
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: imgHov
                  ? "1px solid rgba(163,230,53,0.36)"
                  : "1px solid rgba(163,230,53,0.12)",
                boxShadow: imgHov
                  ? `0 45px 95px -20px rgba(0,0,0,0.9),
                     0 0 55px -10px rgba(163,230,53,0.24),
                     inset 0 1px 0 rgba(255,255,255,0.08),
                     inset 0 0 24px rgba(163,230,53,0.07)`
                  : `0 35px 80px -15px rgba(0,0,0,0.78),
                     0 0 30px -15px rgba(163,230,53,0.08),
                     inset 0 1px 0 rgba(255,255,255,0.04)`,
                transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Floating shadow depth layer */}
              <div style={{
                position: "absolute",
                bottom: "-18px",
                left: "8%",
                right: "8%",
                height: "40px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
                filter: "blur(16px)",
                pointerEvents: "none",
                zIndex: -1,
                transition: "all 0.5s ease",
                opacity: imgHov ? 0.85 : 0.5,
              }} />

              {/* Project Image */}
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "530px",
                  objectFit: "cover",
                  display: "block",
                  transform: imgHov ? "scale(1.025)" : "scale(1)",
                  transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onError={e => { e.target.style.display = "none"; }}
              />

              {/* Subtle edge vignette */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: `
                  linear-gradient(to top, rgba(5,5,5,0.45) 0%, transparent 40%),
                  linear-gradient(to bottom, rgba(5,5,5,0.15) 0%, transparent 15%)
                `,
                pointerEvents: "none",
              }} />

              {/* Subtle lime light sweep sheen */}
              <motion.div
                animate={{
                  x: ["-130%", "220%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 4.5,
                  duration: 2.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(110deg, transparent 32%, rgba(163,230,53,0.06) 44%, rgba(255,255,255,0.16) 50%, rgba(163,230,53,0.06) 56%, transparent 68%)",
                  pointerEvents: "none",
                  mixBlendMode: "screen",
                  zIndex: 4,
                }}
              />

              {/* Top edge lime glow accent */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "15%",
                right: "15%",
                height: "1.5px",
                background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.75), transparent)",
                opacity: imgHov ? 1 : 0.45,
                transition: "opacity 0.4s ease",
                boxShadow: "0 0 12px #a3e635",
                pointerEvents: "none",
                zIndex: 5,
              }} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════
// MOBILE CARD — Clean, editorial
// ═══════════════════════════════════════════════════════
const MobileCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, margin: "-40px" }}
    style={{
      marginBottom: "28px",
      borderRadius: "16px",
      overflow: "hidden",
      background: "linear-gradient(165deg, #0a0a0e 0%, #050507 100%)",
      border: "1px solid rgba(163,230,53,0.1)",
    }}
  >
    {/* Top accent */}
    <div style={{
      height: "1.5px",
      background: `linear-gradient(90deg, transparent, ${LIME}, transparent)`,
      opacity: 0.5,
    }} />

    {/* Screenshot */}
    <div style={{ position: "relative" }}>
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "190px",
          objectFit: "cover",
          display: "block",
        }}
        onError={e => { e.target.style.display = "none"; }}
      />
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "60px",
        background: "linear-gradient(to top, #050507, transparent)",
        pointerEvents: "none",
      }} />
    </div>

    {/* Content */}
    <div style={{ padding: "18px 20px 22px" }}>
      <h3 style={{
        fontFamily: "'Syne', 'Arial Black', sans-serif",
        fontSize: "clamp(1.3rem, 5.5vw, 1.8rem)",
        fontWeight: 900,
        color: "#fff",
        margin: "0 0 4px",
        letterSpacing: "-0.5px",
        lineHeight: 1.1,
      }}>{project.name}</h3>

      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "8.5px",
        fontWeight: 700,
        color: LIME,
        letterSpacing: "2px",
        margin: "0 0 14px",
        textTransform: "uppercase",
        opacity: 0.8,
      }}>{project.subtitle}</p>

      <p style={{
        fontSize: "12px",
        lineHeight: 1.7,
        color: "#94a3b8",
        margin: "0 0 16px",
        fontFamily: "'Inter', sans-serif",
      }}>
        {project.description.length > 130
          ? project.description.slice(0, 130) + "…"
          : project.description}
      </p>

      {/* Highlights */}
      <div style={{ marginBottom: "16px" }}>
        {project.highlights.slice(0, 3).map((h, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            marginBottom: "5px",
          }}>
            <span style={{
              width: 3.5, height: 3.5, borderRadius: "50%",
              backgroundColor: LIME,
              boxShadow: `0 0 5px ${LIME}`,
              marginTop: 6, flexShrink: 0,
            }} />
            <span style={{
              color: "#cbd5e1",
              fontSize: "11px",
              lineHeight: 1.5,
            }}>{h}</span>
          </div>
        ))}
      </div>

      {/* Tech */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        marginBottom: "18px",
      }}>
        {project.tech.map(t => renderTechBadge(t, true))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "8px" }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "10px",
            borderRadius: "100px",
            backgroundColor: LIME,
            color: "#000",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            fontWeight: 800,
            letterSpacing: "1px",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          View Project →
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          <FaGithub size={14} />
        </a>
      </div>
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════
const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [browseHov, setBrowseHov] = useState(false);
  const [paused, setPaused] = useState(false);
  const autoRef = useRef(null);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Auto-advance every 8s on desktop — pauses while hovered
  useEffect(() => {
    if (isMobile || paused) return;
    autoRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex(prev => (prev + 1) % PROJECTS.length);
    }, 8000);
    return () => clearInterval(autoRef.current);
  }, [isMobile, activeIndex, paused]);

  const goNext = useCallback(() => {
    clearInterval(autoRef.current);
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % PROJECTS.length);
  }, []);

  const goPrev = useCallback(() => {
    clearInterval(autoRef.current);
    setDirection(-1);
    setActiveIndex(prev => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }, []);

  // Keyboard navigation (Arrow keys to slide)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const active = PROJECTS[activeIndex];

  return (
    <section
      id="projects"
      style={{
        backgroundColor: "transparent",
        color: "#fff",
        position: "relative",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
        padding: isMobile ? "60px 14px 40px" : "0",
      }}
    >
      {/* ═══════ DESKTOP ═══════ */}
      {!isMobile && (
        <>
          {/* Header */}
          <div style={{
            padding: "clamp(80px, 10vw, 130px) clamp(20px, 5vw, 80px) 0",
            position: "relative",
            zIndex: 20,
            width: "100%",
            boxSizing: "border-box",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
              gap: "40px",
            }}>
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
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
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    backgroundColor: LIME, boxShadow: `0 0 8px ${LIME}`,
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: LIME,
                    fontSize: "11px",
                    letterSpacing: "3px",
                    fontWeight: 800,
                  }}>SELECTED_WORK</span>
                </div>
                <h2 style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontSize: "clamp(2.4rem,9vw,5.5rem)",
                  fontWeight: 900,
                  color: "#fff",
                  margin: 0,
                  lineHeight: 0.88,
                  letterSpacing: "-2px",
                }}>
                  FEATURED<br />
                  <span style={{ color: LIME }}>PROJECTS</span>
                </h2>
              </motion.div>

              {/* Header Right: Gallery Button */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "12px",
                flexShrink: 0,
              }}>
                {/* Gallery Button */}
                <motion.button
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  onClick={() => { window.location.hash = "#gallery"; }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "11px 24px",
                    borderRadius: "100px",
                    background: "linear-gradient(135deg, rgba(163,230,53,0.12) 0%, rgba(163,230,53,0.03) 100%)",
                    border: "1.5px solid #a3e635",
                    color: "#ffffff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "1.2px",
                    cursor: "pointer",
                    boxShadow: "0 0 20px rgba(163,230,53,0.22)",
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    whiteSpace: "nowrap",
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
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%",
                    backgroundColor: LIME, boxShadow: `0 0 8px ${LIME}`,
                  }} />
                  <span>PROJECT GALLERY</span>
                  <span style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "2px 7px",
                    borderRadius: "100px",
                    fontSize: "10px",
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}>
                    {String(PROJECTS.length).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "14px" }}>↗</span>
                </motion.button>
              </div>
            </div>

            <div style={{
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, rgba(163,230,53,0.3), #1a1a1a, transparent)",
            }} />
          </div>

          {/* Cinematic Slidable Viewport */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(620px, 76vh, 800px)",
              overflow: "hidden",
            }}
          >
            {/* Fine background grid */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(163,230,53,0.015) 1px, transparent 1px),
                linear-gradient(90deg, rgba(163,230,53,0.015) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              pointerEvents: "none",
              zIndex: 0,
              mask: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
              WebkitMask: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
            }} />

            {/* Left Floating Arrow Button */}
            <button
              onClick={goPrev}
              aria-label="Previous project slide"
              style={{
                position: "absolute",
                left: "clamp(12px, 2vw, 28px)",
                top: "50%",
                transform: "translateY(-50%)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(10,10,14,0.65)",
                backdropFilter: "blur(12px)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 35,
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = LIME;
                e.currentTarget.style.color = LIME;
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(163,230,53,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
              }}
            >
              <FaChevronLeft size={14} />
            </button>

            {/* Right Floating Arrow Button */}
            <button
              onClick={goNext}
              aria-label="Next project slide"
              style={{
                position: "absolute",
                right: "clamp(12px, 2vw, 28px)",
                top: "50%",
                transform: "translateY(-50%)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(10,10,14,0.65)",
                backdropFilter: "blur(12px)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 35,
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = LIME;
                e.currentTarget.style.color = LIME;
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(163,230,53,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
              }}
            >
              <FaChevronRight size={14} />
            </button>

            <AnimatePresence mode="wait" custom={direction}>
              <CinematicSlide
                key={active.id}
                project={active}
                direction={direction}
                goNext={goNext}
                goPrev={goPrev}
              />
            </AnimatePresence>
          </div>
        </>
      )}

      {/* ═══════ MOBILE ═══════ */}
      {isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: "24px" }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
              padding: "4px 12px",
              borderRadius: "100px",
              background: "rgba(163,230,53,0.08)",
              border: "1px solid rgba(163,230,53,0.25)",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                backgroundColor: LIME, boxShadow: `0 0 6px ${LIME}`,
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: LIME,
                fontSize: "9px",
                letterSpacing: "2.5px",
                fontWeight: 800,
              }}>SELECTED_WORK</span>
            </div>
            <h2 style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: "clamp(2rem, 10vw, 3.5rem)",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              lineHeight: 0.9,
              letterSpacing: "-1.5px",
            }}>
              FEATURED<br />
              <span style={{ color: LIME }}>PROJECTS</span>
            </h2>
          </motion.div>

          <div style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, rgba(163,230,53,0.3), #1a1a1a, transparent)",
            marginBottom: "24px",
          }} />

          {PROJECTS.map((p) => (
            <MobileCard key={p.id} project={p} />
          ))}
        </>
      )}

      {/* Browse All */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: isMobile ? "16px" : "56px",
          paddingBottom: isMobile ? "0" : "clamp(60px,8vw,100px)",
          position: "relative",
          zIndex: 1,
        }}
      >
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
            border: `1.5px solid ${LIME}`,
            borderRadius: "100px",
            padding: isMobile ? "13px 26px" : "15px 48px",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "2px",
            textDecoration: "none",
            textTransform: "uppercase",
            color: browseHov ? "#000" : LIME,
            transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: browseHov
              ? "0 0 35px rgba(163,230,53,0.4)"
              : "0 0 16px rgba(163,230,53,0.15)",
            cursor: "pointer",
            whiteSpace: "nowrap",
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          <span style={{
            position: "absolute",
            inset: 0,
            backgroundColor: LIME,
            transform: browseHov ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "bottom",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          }} />
          <FaGithub size={15} style={{ position: "relative", zIndex: 1, flexShrink: 0 }} />
          <span style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "'JetBrains Mono', monospace",
          }}>Browse All Projects</span>
          <span style={{ position: "relative", zIndex: 1, fontSize: "16px", flexShrink: 0 }}>→</span>
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;