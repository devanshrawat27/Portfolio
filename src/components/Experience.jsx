import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiTypescript,
  SiFirebase,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiGithubactions,
} from "react-icons/si";

const TECH_STACK_ITEMS = [
  { name: "React.js", icon: SiReact, color: "#61DAFB", rgb: "97, 218, 251" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", rgb: "255, 255, 255" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E", rgb: "224, 35, 78" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", rgb: "49, 120, 198" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", rgb: "255, 202, 40" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", rgb: "65, 105, 225" },
  { name: "Prisma", icon: SiPrisma, color: "#16A394", rgb: "22, 163, 148" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", rgb: "36, 150, 237" },
  { name: "CI/CD", icon: SiGithubactions, color: "#a3e635", rgb: "163, 230, 53" },
];

const EXPERIENCES = [
  {
    role: "Software Development Engineer Intern",
    company: "Crux Sphere Technologies",
    period: "August 2026 – Present",
    location: "Remote",
    current: true,
    description:
      "Building and shipping production features end-to-end, collaborating with the engineering team in a remote, agile workflow — from API design and data modeling to UI integration and deployment.",
    highlights: [
      "Built and shipped production features across the frontend and backend",
      "Designed REST API endpoints and structured data models",
      "Wrote type-safe, maintainable code following established engineering conventions",
      "Worked with modern deployment pipelines as part of the development workflow"
    ],
    tech: [
      "React.js",
      "Next.js",
      "NestJS",
      "TypeScript",
      "Firebase",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "CI/CD"
    ]
  }
];

const Experience = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
    viewport: { once: true },
  });

  return (
    <section
      id="experience"
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(60px, 8vw, 120px) clamp(16px, 4vw, 100px)",
        backgroundColor: "transparent",
        position: "relative",
        zIndex: 1,
        maxWidth: "1280px",
        margin: "0 auto",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          right: "5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,230,53,0.04) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      {/* ── SECTION HEADER ── */}
      <div style={{ marginBottom: "clamp(40px, 6vw, 56px)" }}>
        <motion.div
          {...fadeUp(0)}
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
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635" }} />
          <span style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", color: "#a3e635", fontSize: "11px", letterSpacing: "3px", fontWeight: 800 }}>
            EXPERIENCE
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.05)}
          style={{
            fontFamily: "'Arial Black', sans-serif",
            fontSize: "clamp(2.4rem, 8vw, 5rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            margin: "0 0 16px",
            letterSpacing: "-2px",
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          WORK<br />
          <span style={{ color: "#a3e635" }}>EXPERIENCE.</span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          style={{
            fontSize: "clamp(14px, 2vw, 16px)",
            color: "#888",
            maxWidth: "600px",
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Production engineering experience building full-stack products, architecting APIs, and shipping scalable web systems.
        </motion.p>
      </div>

      {/* ── EXPERIENCE LIST ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
        {EXPERIENCES.map((exp, idx) => {
          const isHov = hoveredIdx === idx;

          return (
            <motion.div
              key={idx}
              {...fadeUp(0.15 + idx * 0.1)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: "relative",
                borderRadius: "24px",
                padding: "clamp(20px, 4.5vw, 44px)",
                background: isHov
                  ? "linear-gradient(145deg, rgba(24, 24, 24, 0.9) 0%, rgba(12, 12, 12, 0.98) 100%)"
                  : "linear-gradient(145deg, rgba(18, 18, 18, 0.8) 0%, rgba(9, 9, 9, 0.95) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: isHov
                  ? "1px solid rgba(163, 230, 53, 0.35)"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: isHov
                  ? "0 28px 70px rgba(0, 0, 0, 0.7), 0 0 45px rgba(163, 230, 53, 0.09)"
                  : "0 12px 40px rgba(0, 0, 0, 0.4)",
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                transform: isHov ? "translateY(-4px)" : "translateY(0)",
                overflow: "hidden",
              }}
            >
              {/* Subtle top border highlight shine */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "15%",
                  right: "15%",
                  height: "1px",
                  background: isHov
                    ? "linear-gradient(90deg, transparent, #a3e635, transparent)"
                    : "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  transition: "background 0.4s ease",
                  pointerEvents: "none",
                }}
              />

              {/* ── CARD HEADER ── */}
              <div style={{ marginBottom: "26px" }}>
                {/* Top Meta Row: Status Badge & Duration */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "18px",
                  }}
                >
                  {/* Active Status Pill - Ultra Premium Live Beacon */}
                  {exp.current ? (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "linear-gradient(135deg, rgba(163,230,53,0.14) 0%, rgba(163,230,53,0.03) 100%)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid rgba(163,230,53,0.4)",
                        borderRadius: "100px",
                        padding: "5px 14px",
                        boxShadow: "0 0 20px rgba(163,230,53,0.12), inset 0 1px 1px rgba(255,255,255,0.2)",
                        cursor: "default",
                      }}
                    >
                      {/* Live Pulsing Beacon */}
                      <span style={{ position: "relative", width: "8px", height: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <motion.span
                          animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            backgroundColor: "#a3e635",
                          }}
                        />
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "#a3e635",
                            boxShadow: "0 0 10px #a3e635",
                            position: "relative",
                            zIndex: 1,
                          }}
                        />
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
                          fontSize: "10.5px",
                          color: "#c6f567",
                          fontWeight: 800,
                          letterSpacing: "1.2px",
                        }}
                      >
                        CURRENT ROLE
                      </span>
                    </motion.div>
                  ) : <div />}

                  {/* Right: Duration Pill - Ultra Premium Frosted Capsule */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -1, borderColor: "rgba(163,230,53,0.4)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "100px",
                      padding: "6px 16px",
                      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#f8fafc",
                      letterSpacing: "0.5px",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.18)",
                      cursor: "default",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    <HiOutlineCalendar
                      size={14}
                      style={{
                        color: "#a3e635",
                        filter: "drop-shadow(0 0 6px rgba(163,230,53,0.7))",
                        flexShrink: 0,
                      }}
                    />
                    <span>{exp.period}</span>
                  </motion.div>
                </div>

                {/* Main Identity Row: Company Logo + Role Title & Company */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Company Logo Box */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: isHov
                        ? "1.5px solid rgba(163,230,53,0.5)"
                        : "1.5px solid rgba(255,255,255,0.12)",
                      flexShrink: 0,
                      boxShadow: isHov
                        ? "0 0 24px rgba(163,230,53,0.2)"
                        : "0 4px 12px rgba(0,0,0,0.3)",
                      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px",
                    }}
                  >
                    <img
                      src="/logo.png"
                      alt="Crux Sphere Technologies"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Role and Company info */}
                  <div style={{ flex: "1 1 min(100%, 320px)", minWidth: 0 }}>
                    <h3
                      style={{
                        margin: "0 0 6px",
                        fontFamily: "'Arial Black', sans-serif",
                        fontSize: "clamp(1.25rem, 2.6vw, 2.1rem)",
                        fontWeight: 900,
                        color: "#ffffff",
                        letterSpacing: "-0.5px",
                        lineHeight: 1.2,
                        wordBreak: "break-word",
                      }}
                    >
                      {exp.role}
                    </h3>

                    {/* Company Name & Location */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap",
                        fontSize: "14px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 800,
                          color: "#a3e635",
                          fontSize: "clamp(14.5px, 1.5vw, 16.5px)",
                          letterSpacing: "-0.2px",
                        }}
                      >
                        {exp.company}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "3px 10px",
                          borderRadius: "100px",
                          backgroundColor: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#94a3b8",
                          fontSize: "12px",
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: "0.2px",
                        }}
                      >
                        <HiOutlineLocationMarker size={13} color="#a3e635" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Divider */}
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  background: "linear-gradient(90deg, rgba(163,230,53,0.3) 0%, rgba(255,255,255,0.06) 60%, transparent 100%)",
                  margin: "18px 0 22px",
                }}
              />

              {/* ── DESCRIPTION ── */}
              <p
                style={{
                  fontSize: "clamp(14.5px, 1.6vw, 16px)",
                  color: "#b0b0b0",
                  lineHeight: "1.75",
                  margin: "0 0 28px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {exp.description}
              </p>

              {/* ── HIGHLIGHTS GRID ── */}
              <div style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "10.5px",
                    color: "#a3e635",
                    letterSpacing: "2.5px",
                    fontWeight: 700,
                    marginBottom: "14px",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div style={{ width: 14, height: 1, background: "#a3e635" }} />
                  KEY HIGHLIGHTS
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                    gap: "10px",
                  }}
                >
                  {exp.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "12px 14px",
                        borderRadius: "14px",
                        backgroundColor: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        transition: "all 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(163,230,53,0.05)";
                        e.currentTarget.style.borderColor = "rgba(163,230,53,0.25)";
                        e.currentTarget.style.transform = "translateX(2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <BsCheckCircleFill
                        size={15}
                        color="#a3e635"
                        style={{ marginTop: "3px", flexShrink: 0, opacity: 0.9 }}
                      />
                      <span
                        style={{
                          fontSize: "13.5px",
                          color: "#ccc",
                          lineHeight: "1.6",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── TECH STACK TAGS ── */}
              <div>
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "10.5px",
                    color: "#a3e635",
                    letterSpacing: "2.5px",
                    fontWeight: 700,
                    marginBottom: "14px",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div style={{ width: 14, height: 1, background: "#a3e635" }} />
                  TECH STACK & ECOSYSTEM
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(140px, auto))",
                  gap: isMobile ? "8px" : "10px",
                }}>
                  {TECH_STACK_ITEMS.map((tech, tIdx) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={tIdx}
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: isMobile ? "6px" : "8px",
                          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                          fontSize: isMobile ? "10px" : "11.5px",
                          fontWeight: 600,
                          padding: isMobile ? "8px 10px" : "8px 16px",
                          borderRadius: "100px",
                          backgroundColor: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#ddd",
                          letterSpacing: "0.5px",
                          cursor: "pointer",
                          overflow: "hidden",
                          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                          whiteSpace: "nowrap",
                          boxSizing: "border-box",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `rgba(${tech.rgb}, 0.12)`;
                          e.currentTarget.style.borderColor = tech.color;
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.boxShadow = `0 8px 24px rgba(${tech.rgb}, 0.32), inset 0 1px 0 rgba(255,255,255,0.2)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                          e.currentTarget.style.color = "#ddd";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {/* Shimmer sweep effect */}
                        <motion.div
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.75, ease: "easeInOut" }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(90deg, transparent, rgba(${tech.rgb}, 0.25), transparent)`,
                            pointerEvents: "none",
                          }}
                        />

                        {/* Official Tech Icon with brand color */}
                        <Icon
                          size={15}
                          color={tech.color}
                          style={{
                            flexShrink: 0,
                            filter: `drop-shadow(0 0 6px ${tech.color}66)`,
                            transition: "transform 0.3s ease",
                          }}
                        />

                        {/* Tech Name */}
                        <span style={{ position: "relative", zIndex: 1 }}>{tech.name}</span>

                        {/* Subtle colored accent indicator */}
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            backgroundColor: tech.color,
                            opacity: 0.8,
                            flexShrink: 0,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
