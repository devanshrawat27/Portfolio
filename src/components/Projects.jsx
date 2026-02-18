import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PROJECTS = [
  {
    id: 1, number: "01", name: "ConvoX Meet",
    subtitle: "Real-Time Video Conferencing Platform",
    tag: "Full Stack", year: "2026", image: "/project1.png",
    description: "Full-stack real-time video conferencing app using WebRTC for peer-to-peer communication. No third-party SDK dependency — pure WebRTC, Socket.io signaling, and live chat.",
    highlights: ["Real-time video & audio via WebRTC", "Secure room creation & joining", "Live in-meeting chat", "Responsive modern UI"],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "WebRTC"],
    github: "https://github.com/devanshrawat27/Convox-Meet",
    accent: "#00D4FF",
    num: "01",
  },
  {
    id: 2, number: "02", name: "Homigo",
    subtitle: "Stay Booking & Property Listing Platform",
    tag: "Full Stack", year: "2026", image: "/project2.png",
    description: "Accommodation booking platform — explore, list, and manage unique stays. Full MVC architecture with bookings, reviews, and user authentication.",
    highlights: ["Browse & explore listings", "Add, manage & book properties", "User auth system", "Review & rating functionality"],
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
    github: "https://github.com/devanshrawat27/Project_Homigo",
    accent: "#FFB800",
    num: "02",
  },
  {
    id: 3, number: "03", name: "Smart Task Manager",
    subtitle: "AI-Powered System Monitor & Security Analyzer",
    tag: "AI / Python", year: "2025", image: "/project3.png",
    description: "Advanced system monitoring tool with ML-based anomaly detection. Tracks processes in real-time and flags suspicious behavior via web dashboard.",
    highlights: ["Real-time process monitoring", "ML-based threat detection", "Security risk analysis", "Interactive analytics dashboard"],
    tech: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy", "Chart.js"],
    github: "https://github.com/devanshrawat27/Smart-Task-Manager",
    accent: "#FF4D6D",
    num: "03",
  },
  {
    id: 4, number: "04", name: "SkillSync",
    subtitle: "Student Collaboration & Networking Platform",
    tag: "Networking", year: "2025", image: "/project4.png",
    description: "Platform for students to connect with project partners by skill & interest. Build teams for hackathons, projects, and learning opportunities.",
    highlights: ["Profile creation with skill tags", "Find collaborators by skill match", "Team building for hackathons", "Clean responsive UI"],
    tech: ["TypeScript", "Supabase", "PostgreSQL"],
    github: "https://github.com/devanshrawat27/SkillSync-Networking-Platform",
    accent: "#A78BFA",
    num: "04",
  },
  {
    id: 5, number: "05", name: "AI Health Assistant",
    subtitle: "Agentic AI System for Medical Report Analysis",
    tag: "Agentic AI", year: "2026", image: "/project5.png",
    description: "Multi-agent AI architecture with parallel LLM specialists analyzing medical reports. Each agent provides domain-specific insights, aggregated into actionable health analysis.",
    highlights: ["Multi-agent AI with parallel execution", "Medical report analysis", "LLM-based specialist agents", "Advanced Agentic AI concepts"],
    tech: ["Python", "OpenAI API", "LLMs", "Multithreading"],
    github: "https://github.com/devanshrawat27/AI-Health-Assistant",
    accent: "#00FF94",
    num: "05",
  },
  {
    id: 6, number: "06", name: "Finova",
    subtitle: "Trading Platform",
    tag: "FinTech", year: "2026", image: "/project6.png",
    description: "Real-time trading & financial platform with stock insights, portfolio tracking, and analytics. Interactive charts to make informed trading decisions.",
    highlights: ["Real-time stock data monitoring", "Portfolio tracking & metrics", "Trading analytics dashboard", "Interactive financial charts"],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/devanshrawat27/Finova-Trading-Platform/tree/master",
    accent: "#a3e635",
    num: "06",
  },
];

// ── Single Project Card ──────────────────────────────────────────────────────
const ProjectCard = ({ project, index, total, containerProgress }) => {
  const [hov, setHov] = useState(false);
  const stickyTop = 80 + index * 16;

  const rawScale = useTransform(
    containerProgress,
    [index / total, Math.min((index + 1) / total, 1)],
    [1, 0.93]
  );
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  const rgb = hexToRgb(project.accent);

  return (
    <motion.div
      style={{ position: "sticky", top: stickyTop, zIndex: 10 + index, scale }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        marginBottom: "20px",
        minHeight: "460px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#080808",
        border: `1px solid ${hov ? project.accent + "88" : "#161616"}`,
        boxShadow: hov
          ? `0 0 0 1px ${project.accent}33, 0 32px 80px rgba(${rgb},0.15), 0 8px 32px rgba(0,0,0,0.8)`
          : "0 8px 40px rgba(0,0,0,0.7)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}>

        {/* ── Accent top bar ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: hov ? 1 : 0.3,
          transition: "opacity 0.4s",
          zIndex: 10,
        }} />

        {/* ── LEFT: Image panel ── */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          background: "#050505",
        }}>
          {/* Project number — giant watermark */}
          <div style={{
            position: "absolute",
            bottom: "-20px", right: "-10px",
            fontSize: "160px", fontWeight: 900,
            fontFamily: "'Arial Black', sans-serif",
            color: project.accent,
            opacity: hov ? 0.07 : 0.03,
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
            transition: "opacity 0.4s",
            zIndex: 1,
          }}>{project.num}</div>

          <img
            src={project.image}
            alt={project.name}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", display: "block",
              minHeight: "460px",
              transform: hov ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
              position: "relative", zIndex: 2,
            }}
            onError={(e) => { e.target.style.display = "none"; }}
          />

          {/* Overlays */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 3,
            background: `linear-gradient(to right, transparent 50%, #080808 100%)`,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: 0, zIndex: 4,
            background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)`,
            pointerEvents: "none",
          }} />

          {/* TAG chip */}
          <div style={{
            position: "absolute", top: 20, left: 20, zIndex: 5,
            backgroundColor: project.accent,
            color: "#000",
            fontSize: "9px", fontWeight: 900,
            padding: "5px 14px", borderRadius: "100px",
            letterSpacing: "2px", textTransform: "uppercase",
            boxShadow: `0 4px 16px rgba(${rgb},0.5)`,
          }}>{project.tag}</div>

          {/* Year */}
          <div style={{
            position: "absolute", bottom: 20, left: 20, zIndex: 5,
            color: project.accent + "99",
            fontFamily: "'Courier New', monospace",
            fontSize: "11px", letterSpacing: "3px",
          }}>{project.year}</div>

          {/* GitHub arrow button */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            animate={{
              opacity: hov ? 1 : 0,
              y: hov ? 0 : 12,
              scale: hov ? 1 : 0.7,
            }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute", bottom: 18, right: 18, zIndex: 6,
              width: 48, height: 48, borderRadius: "50%",
              backgroundColor: project.accent,
              color: "#000",
              fontSize: "18px", fontWeight: 900,
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none",
              boxShadow: `0 8px 24px rgba(${rgb},0.6)`,
            }}
          >↗</motion.a>
        </div>

        {/* ── RIGHT: Content panel ── */}
        <div style={{
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}>

          {/* Background number faint */}
          <div style={{
            position: "absolute", top: "50%", right: "-30px",
            transform: "translateY(-50%)",
            fontSize: "220px", fontWeight: 900,
            fontFamily: "'Arial Black', sans-serif",
            color: "#fff",
            opacity: 0.012,
            lineHeight: 1,
            pointerEvents: "none", userSelect: "none",
          }}>{project.num}</div>

          <div>
            {/* Index line */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "20px",
            }}>
              <div style={{
                width: 28, height: 2,
                backgroundColor: project.accent,
                boxShadow: `0 0 8px ${project.accent}`,
                transition: "width 0.3s",
                ...(hov ? { width: 44 } : {}),
              }} />
              <span style={{
                fontFamily: "'Courier New', monospace",
                color: project.accent,
                fontSize: "11px", letterSpacing: "3px",
              }}>PROJECT_{project.num}</span>
            </div>

            {/* Name */}
            <h3 style={{
              fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)",
              fontWeight: 900,
              fontFamily: "'Arial Black', sans-serif",
              color: hov ? "#fff" : "#ccc",
              margin: "0 0 6px",
              letterSpacing: "-0.5px",
              lineHeight: 1.05,
              transition: "color 0.3s",
              textShadow: hov ? `0 0 40px rgba(${rgb},0.3)` : "none",
            }}>{project.name}</h3>

            {/* Subtitle */}
            <p style={{
              color: project.accent,
              fontSize: "11px", fontWeight: 700,
              margin: "0 0 18px",
              letterSpacing: "0.5px",
              opacity: hov ? 1 : 0.7,
              transition: "opacity 0.3s",
            }}>{project.subtitle}</p>

            {/* Description */}
            <p style={{
              fontSize: "13px", color: "#4a4a4a",
              lineHeight: "1.85", margin: "0 0 20px",
              color: hov ? "#666" : "#404040",
              transition: "color 0.3s",
            }}>{project.description}</p>

            {/* Highlights */}
            <div style={{ marginBottom: "24px" }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  marginBottom: "6px",
                  opacity: hov ? 1 : 0.6,
                  transform: hov ? "translateX(0)" : "translateX(-4px)",
                  transition: `opacity 0.3s ${i * 60}ms, transform 0.3s ${i * 60}ms`,
                }}>
                  <span style={{ color: project.accent, fontSize: "10px", marginTop: "5px", flexShrink: 0 }}>▸</span>
                  <span style={{ color: "#666", fontSize: "12.5px", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Tech chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "22px" }}>
              {project.tech.map((t) => (
                <span key={t} style={{
                  backgroundColor: `rgba(${rgb},0.07)`,
                  border: `1px solid ${project.accent}30`,
                  color: project.accent,
                  fontSize: "9px", fontWeight: 800,
                  padding: "4px 11px", borderRadius: "100px",
                  letterSpacing: "0.5px",
                  transition: "background 0.3s, border-color 0.3s",
                  ...(hov ? {
                    backgroundColor: `rgba(${rgb},0.14)`,
                    borderColor: project.accent + "66",
                  } : {}),
                }}>{t}</span>
              ))}
            </div>

            {/* GitHub button */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: "#888",
                border: "1px solid #222",
                background: "transparent",
                padding: "9px 20px", borderRadius: "100px",
                fontSize: "10px", fontWeight: 800,
                textDecoration: "none", letterSpacing: "1.5px",
                textTransform: "uppercase",
                transition: "all 0.25s", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.accent;
                e.currentTarget.style.color = project.accent;
                e.currentTarget.style.boxShadow = `0 0 16px rgba(${rgb},0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#222";
                e.currentTarget.style.color = "#888";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Hex to RGB helper ────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

// ── Main Section ─────────────────────────────────────────────────────────────
const Projects = () => {
  const containerRef = useRef(null);
  const [browseHov, setBrowseHov] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" ref={containerRef} style={{
      backgroundColor: "transparent",
      padding: "130px 60px 100px",
      color: "#fff",
      position: "relative",
    }}>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "60px",
        gap: "60px",
        flexWrap: "wrap",
      }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            marginBottom: "16px",
          }}>
            <div style={{ width: 28, height: 1, background: "#a3e635" }} />
            <span style={{
              fontFamily: "'Courier New', monospace",
              color: "#a3e635", fontSize: "10px",
              letterSpacing: "4px", fontWeight: 700,
            }}>SELECTED_WORK</span>
          </div>
          <h2 style={{
            fontFamily: "'Arial Black', sans-serif",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 900, color: "#fff",
            margin: 0, lineHeight: 0.88,
            letterSpacing: "-2px",
          }}>
            FEATURED<br />
            <span style={{ color: "#a3e635", WebkitTextStroke: "0" }}>PROJECTS</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ maxWidth: 400 }}
        >
          <p style={{
            fontSize: "14px", color: "#444",
            lineHeight: "1.9", margin: "0 0 20px",
          }}>
            Real-world projects built with performance and purpose — from live video conferencing and AI health tools to fintech dashboards and student networking platforms.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[["06", "Projects"], ["3+", "Years"], ["10K+", "Lines"]].map(([n, l]) => (
              <div key={l}>
                <div style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontSize: "1.6rem", color: "#a3e635",
                  fontWeight: 900, lineHeight: 1,
                  textShadow: "0 0 20px rgba(163,230,53,0.4)",
                }}>{n}</div>
                <div style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "9px", color: "#333",
                  letterSpacing: "2px", marginTop: "4px",
                }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{
        width: "100%", height: "1px",
        background: "linear-gradient(90deg, #a3e63533, #1a1a1a, transparent)",
        marginBottom: "48px",
      }} />

      {/* ── STACKING CARDS ── */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={PROJECTS.length}
            containerProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* ── BROWSE ALL ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ display: "flex", justifyContent: "center", paddingTop: "80px" }}
      >
        <a
          href="https://github.com/devanshrawat27"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setBrowseHov(true)}
          onMouseLeave={() => setBrowseHov(false)}
          style={{
            position: "relative", overflow: "hidden",
            display: "inline-flex", alignItems: "center", gap: "12px",
            border: "1.5px solid #a3e635", borderRadius: "100px",
            padding: "16px 52px",
            fontSize: "11px", fontWeight: 800,
            letterSpacing: "3px", textDecoration: "none",
            textTransform: "uppercase",
            color: browseHov ? "#000" : "#a3e635",
            transition: "color 0.35s",
            cursor: "pointer",
          }}
        >
          <span style={{
            position: "absolute", inset: 0,
            backgroundColor: "#a3e635",
            transform: browseHov ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "bottom",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          }} />
          <span style={{ position: "relative", zIndex: 1 }}>Browse All Projects</span>
          <span style={{ position: "relative", zIndex: 1, fontSize: "16px" }}>→</span>
        </a>
      </motion.div>

    </section>
  );
};

export default Projects;