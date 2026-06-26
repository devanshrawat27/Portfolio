import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    number: "01",
    name: "InvisiQ",
    subtitle: "AI-Powered Virtual Queue System",
    tag: "AI / Full Stack",
    year: "2026",
    image: "/project1.png",
    description: "A virtual queue system built for Indian college administration offices (Fee Cells, Admission Cells). Students join a live digital queue by scanning a QR code, while five specialized autonomous AI monitors run silently to keep the queue clean, fair, and real-time.",
    highlights: [
      "Scan QR to join live digital queue with no app/account required",
      "5 specialized autonomous AI monitors for queue integrity",
      "Interactive admin controls: call next, pause queue, nightly briefing",
      "Real-time updates via Socket.io and Firebase Realtime DB"
    ],
    tech: ["React.js", "Node.js", "Express.js", "Firebase", "Socket.io", "Gemini API"],
    github: "https://github.com/devanshrawat27/InvisiQ",
    accent: "#a3e635",
    num: "01"
  },
  {
    id: 2,
    number: "02",
    name: "CQL Compiler",
    subtitle: "SQL-to-Python Compiler for CSV Retrieval",
    tag: "Compilers / Python",
    year: "2026",
    image: "/project2.png",
    description: "A compiler-based system that allows users to query CSV files using SQL-like syntax without requiring a database. It converts queries into optimized, streaming Python code through lexical analysis, parsing, semantic checking, and code generation, enabling efficient data retrieval.",
    highlights: [
      "Translates SQL-like queries into executable, streaming Python code",
      "Hand-written recursive descent parser building a structured AST",
      "Semantic validator checking column schemas and GROUP BY constraints",
      "Zero external dependencies — pure Python streaming row-by-row"
    ],
    tech: ["Python", "Compilers", "AST Parsing", "Lexical Analysis", "Code Gen"],
    github: "https://github.com/devanshrawat27/CQL--CSV-retriever",
    accent: "#FF007F",
    num: "02"
  },
  {
    id: 3,
    number: "03",
    name: "Echo-MRI Translator",
    subtitle: "CycleGAN Unpaired Cardiac Image Translation",
    tag: "Deep Learning",
    year: "2025",
    image: "/project3.png",
    description: "CycleGAN-based unpaired image-to-image translation system that enhances low-cost, blurry echocardiography images into high-quality, MRI-like cardiac visuals. Solves diagnostic accessibility issues in rural areas by making cardiac imaging affordable and intelligent.",
    highlights: [
      "Unpaired image-to-image translation using CycleGAN & PatchGAN",
      "Cycle consistency loss ensures structural preservation of cardiac features",
      "Trained on EchoNet-Dynamic and ACDC medical datasets",
      "Interactive web app interface deployed on HuggingFace Spaces"
    ],
    tech: ["PyTorch", "CycleGAN", "Deep Learning", "Gradio", "HuggingFace"],
    github: "https://github.com/devanshrawat27/Echo-MRI-Translation",
    accent: "#00E5FF",
    num: "03"
  },
  {
    id: 4,
    number: "04",
    name: "ConvoX Meet",
    subtitle: "Real-Time Video Conferencing Platform",
    tag: "Full Stack",
    year: "2026",
    image: "/project4.png",
    description: "Full-stack real-time video conferencing app using WebRTC for peer-to-peer communication. No third-party SDK dependency — pure WebRTC, Socket.io signaling, and live chat.",
    highlights: ["Real-time video & audio via WebRTC", "Secure room creation & joining", "Live in-meeting chat", "Responsive modern UI"],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "WebRTC"],
    github: "https://github.com/devanshrawat27/Convox-Meet",
    accent: "#00D4FF",
    num: "04"
  },
  {
    id: 5,
    number: "05",
    name: "Homigo",
    subtitle: "Stay Booking & Property Listing Platform",
    tag: "Full Stack",
    year: "2026",
    image: "/project5.png",
    description: "Accommodation booking platform — explore, list, and manage unique stays. Full MVC architecture with bookings, reviews, and user authentication.",
    highlights: ["Browse & explore listings", "Add, manage & book properties", "User auth system", "Review & rating functionality"],
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
    github: "https://github.com/devanshrawat27/Project_Homigo",
    accent: "#FFB800",
    num: "05"
  },
  {
    id: 6,
    number: "06",
    name: "Smart Task Manager",
    subtitle: "AI-Powered System Monitor & Security Analyzer",
    tag: "AI / Python",
    year: "2025",
    image: "/project6.png",
    description: "Advanced system monitoring tool with ML-based anomaly detection. Tracks processes in real-time and flags suspicious behavior via web dashboard.",
    highlights: ["Real-time process monitoring", "ML-based threat detection", "Security risk analysis", "Interactive analytics dashboard"],
    tech: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy", "Chart.js"],
    github: "https://github.com/devanshrawat27/Smart-Task-Manager",
    accent: "#FF4D6D",
    num: "06"
  },
  {
    id: 7,
    number: "07",
    name: "SkillSync",
    subtitle: "Student Collaboration & Networking Platform",
    tag: "Networking",
    year: "2025",
    image: "/project7.png",
    description: "Platform for students to connect with project partners by skill & interest. Build teams for hackathons, projects, and learning opportunities.",
    highlights: ["Profile creation with skill tags", "Find collaborators by skill match", "Team building for hackathons", "Clean responsive UI"],
    tech: ["React", "Supabase", "PostgreSQL"],
    github: "https://github.com/devanshrawat27/SkillSync-Networking-Platform",
    accent: "#A78BFA",
    num: "07"
  },
  {
    id: 8,
    number: "08",
    name: "AI Health Assistant",
    subtitle: "Agentic AI System for Medical Report Analysis",
    tag: "Agentic AI",
    year: "2026",
    image: "/project8.png",
    description: "Multi-agent AI architecture with parallel LLM specialists analyzing medical reports. Each agent provides domain-specific insights, aggregated into actionable health analysis.",
    highlights: ["Multi-agent AI with parallel execution", "Medical report analysis", "LLM-based specialist agents", "Advanced Agentic AI concepts"],
    tech: ["Python", "OpenAI API", "LLMs", "Multithreading"],
    github: "https://github.com/devanshrawat27/AI-Health-Assistant",
    accent: "#00FF94",
    num: "08"
  },
];

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
      style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "16px", background: "#080808", border: `1px solid ${hov ? project.accent + "88" : "#161616"}`, boxShadow: hov ? `0 0 0 1px ${project.accent}33, 0 16px 40px rgba(${rgb},0.15)` : "0 4px 20px rgba(0,0,0,0.7)", transition: "all 0.3s", position: "relative" }}
    >
      {/* Top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`, opacity: 0.8, zIndex: 10 }} />

      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img src={project.image} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.style.display = "none"; }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, #080808 0%, transparent 60%)`, pointerEvents: "none" }} />
        {/* Tag chip */}
        <div style={{ position: "absolute", top: 12, left: 12, backgroundColor: project.accent, color: "#000", fontSize: "9px", fontWeight: 900, padding: "4px 12px", borderRadius: "100px", letterSpacing: "2px", textTransform: "uppercase", boxShadow: `0 4px 12px rgba(${rgb},0.5)` }}>{project.tag}</div>
        {/* Year */}
        <div style={{ position: "absolute", top: 12, right: 12, color: project.accent + "99", fontFamily: "'Courier New', monospace", fontSize: "10px", letterSpacing: "2px" }}>{project.year}</div>
        {/* Github button */}
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{ position: "absolute", bottom: 12, right: 12, width: 40, height: 40, borderRadius: "50%", backgroundColor: project.accent, color: "#000", fontSize: "16px", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: `0 4px 16px rgba(${rgb},0.6)` }}>↗</a>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div style={{ width: 20, height: 2, backgroundColor: project.accent, boxShadow: `0 0 6px ${project.accent}` }} />
          <span style={{ fontFamily: "'Courier New', monospace", color: project.accent, fontSize: "10px", letterSpacing: "2px" }}>PROJECT_{project.num}</span>
        </div>
        <h3 style={{ fontSize: "clamp(1.3rem,5vw,1.7rem)", fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#fff", margin: "0 0 4px", letterSpacing: "-0.5px", lineHeight: 1.05 }}>{project.name}</h3>
        <p style={{ color: project.accent, fontSize: "10px", fontWeight: 700, margin: "0 0 12px", letterSpacing: "0.5px" }}>{project.subtitle}</p>
        <p style={{ fontSize: "12px", color: "#555", lineHeight: "1.8", margin: "0 0 14px" }}>{project.description}</p>

        {/* Highlights — condensed on mobile */}
        <div style={{ marginBottom: "14px" }}>
          {project.highlights.slice(0, 3).map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
              <span style={{ color: project.accent, fontSize: "9px", marginTop: "4px", flexShrink: 0 }}>▸</span>
              <span style={{ color: "#555", fontSize: "11px", lineHeight: 1.5 }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {project.tech.map(t => (
            <span key={t} style={{ backgroundColor: `rgba(${rgb},0.08)`, border: `1px solid ${project.accent}30`, color: project.accent, fontSize: "9px", fontWeight: 800, padding: "3px 9px", borderRadius: "100px", letterSpacing: "0.5px" }}>{t}</span>
          ))}
        </div>

        {/* GitHub link */}
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#777", border: "1px solid #222", background: "transparent", padding: "8px 16px", borderRadius: "100px", fontSize: "9px", fontWeight: 800, textDecoration: "none", letterSpacing: "1.5px", textTransform: "uppercase" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
          View on GitHub
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
  const rawScale = useTransform(containerProgress, [segStart, segEnd], [1, 0.94]);
  const scale = useSpring(rawScale, { stiffness: 100, damping: 25 });
  const rawOpacity = useTransform(containerProgress, [segStart, Math.min(segEnd + 0.1, 1)], [1, index === total - 1 ? 1 : 0.3]);
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 25 });

  return (
    <motion.div ref={cardRef} style={{ scale, opacity, position: "sticky", top: stickyTop + index * 10, zIndex: index + 1, marginBottom: "20px" }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", borderRadius: "20px", overflow: "hidden", minHeight: "460px", display: "grid", gridTemplateColumns: "1fr 1fr", background: "#080808", border: `1px solid ${hov ? project.accent + "88" : "#161616"}`, boxShadow: hov ? `0 0 0 1px ${project.accent}33, 0 32px 80px rgba(${rgb},0.15), 0 8px 32px rgba(0,0,0,0.8)` : "0 8px 40px rgba(0,0,0,0.7)", transition: "border-color 0.4s, box-shadow 0.4s" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`, opacity: hov ? 1 : 0.3, transition: "opacity 0.4s", zIndex: 10 }} />
        {/* Image panel */}
        <div style={{ position: "relative", overflow: "hidden", background: "#050505" }}>
          <div style={{ position: "absolute", bottom: "-20px", right: "-10px", fontSize: "160px", fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: project.accent, opacity: hov ? 0.07 : 0.03, lineHeight: 1, pointerEvents: "none", userSelect: "none", transition: "opacity 0.4s", zIndex: 1 }}>{project.num}</div>
          <img src={project.image} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "460px", transform: hov ? "scale(1.08)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)", position: "relative", zIndex: 2 }} onError={e => { e.target.style.display = "none"; }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 3, background: `linear-gradient(to right, transparent 50%, #080808 100%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 4, background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 20, left: 20, zIndex: 5, backgroundColor: project.accent, color: "#000", fontSize: "9px", fontWeight: 900, padding: "5px 14px", borderRadius: "100px", letterSpacing: "2px", textTransform: "uppercase", boxShadow: `0 4px 16px rgba(${rgb},0.5)` }}>{project.tag}</div>
          <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 5, color: project.accent + "99", fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "3px" }}>{project.year}</div>
          <motion.a href={project.github} target="_blank" rel="noopener noreferrer" animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 12, scale: hov ? 1 : 0.7 }} transition={{ duration: 0.25 }} style={{ position: "absolute", bottom: 18, right: 18, zIndex: 6, width: 48, height: 48, borderRadius: "50%", backgroundColor: project.accent, color: "#000", fontSize: "18px", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: `0 8px 24px rgba(${rgb},0.6)` }}>↗</motion.a>
        </div>
        {/* Content panel */}
        <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", right: "-30px", transform: "translateY(-50%)", fontSize: "220px", fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#fff", opacity: 0.012, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{project.num}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: 28, height: 2, backgroundColor: project.accent, boxShadow: `0 0 8px ${project.accent}`, ...(hov ? { width: 44 } : {}), transition: "width 0.3s" }} />
              <span style={{ fontFamily: "'Courier New', monospace", color: project.accent, fontSize: "11px", letterSpacing: "3px" }}>PROJECT_{project.num}</span>
            </div>
            <h3 style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)", fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: hov ? "#fff" : "#ccc", margin: "0 0 6px", letterSpacing: "-0.5px", lineHeight: 1.05, transition: "color 0.3s", textShadow: hov ? `0 0 40px rgba(${rgb},0.3)` : "none" }}>{project.name}</h3>
            <p style={{ color: project.accent, fontSize: "11px", fontWeight: 700, margin: "0 0 18px", letterSpacing: "0.5px", opacity: hov ? 1 : 0.7, transition: "opacity 0.3s" }}>{project.subtitle}</p>
            <p style={{ fontSize: "13px", lineHeight: "1.85", margin: "0 0 20px", color: hov ? "#666" : "#404040", transition: "color 0.3s" }}>{project.description}</p>
            <div style={{ marginBottom: "24px" }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "6px", opacity: hov ? 1 : 0.6, transform: hov ? "translateX(0)" : "translateX(-4px)", transition: `opacity 0.3s ${i * 60}ms, transform 0.3s ${i * 60}ms` }}>
                  <span style={{ color: project.accent, fontSize: "10px", marginTop: "5px", flexShrink: 0 }}>▸</span>
                  <span style={{ color: "#666", fontSize: "12.5px", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "22px" }}>
              {project.tech.map(t => (
                <span key={t} style={{ backgroundColor: `rgba(${rgb},${hov ? "0.14" : "0.07"})`, border: `1px solid ${project.accent + (hov ? "66" : "30")}`, color: project.accent, fontSize: "9px", fontWeight: 800, padding: "4px 11px", borderRadius: "100px", letterSpacing: "0.5px", transition: "background 0.3s, border-color 0.3s" }}>{t}</span>
              ))}
            </div>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#888", border: "1px solid #222", background: "transparent", padding: "9px 20px", borderRadius: "100px", fontSize: "10px", fontWeight: 800, textDecoration: "none", letterSpacing: "1.5px", textTransform: "uppercase", transition: "all 0.25s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.color = project.accent; e.currentTarget.style.boxShadow = `0 0 16px rgba(${rgb},0.2)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#888"; e.currentTarget.style.boxShadow = "none"; }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
              View on GitHub
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
    <section id="projects" ref={containerRef} style={{ backgroundColor: "transparent", padding: `clamp(80px,10vw,130px) clamp(16px,4vw,60px) clamp(60px,8vw,100px)`, color: "#fff", position: "relative" }}>
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: isMobile ? "32px" : "60px", gap: isMobile ? "20px" : "60px", flexWrap: "wrap" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: 28, height: 1, background: "#a3e635" }} />
            <span style={{ fontFamily: "'Courier New', monospace", color: "#a3e635", fontSize: "10px", letterSpacing: "4px", fontWeight: 700 }}>SELECTED_WORK</span>
          </div>
          <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(2.4rem,9vw,5.5rem)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 0.88, letterSpacing: "-2px" }}>
            FEATURED<br /><span style={{ color: "#a3e635" }}>PROJECTS</span>
          </h2>
        </motion.div>
      </div>



      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, #a3e63533, #1a1a1a, transparent)", marginBottom: isMobile ? "24px" : "48px" }} />

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {PROJECTS.map((project, index) =>
          isMobile ? (
            <MobileProjectCard key={project.id} project={project} />
          ) : (
            <DesktopProjectCard key={project.id} project={project} index={index} total={PROJECTS.length} containerProgress={scrollYProgress} />
          )
        )}
      </div>

      {/* Browse all */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ display: "flex", justifyContent: "center", paddingTop: isMobile ? "40px" : "80px" }}>
        <a href="https://github.com/devanshrawat27" target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => setBrowseHov(true)} onMouseLeave={() => setBrowseHov(false)}
          style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: "12px", border: "1.5px solid #a3e635", borderRadius: "100px", padding: isMobile ? "13px 32px" : "16px 52px", fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textDecoration: "none", textTransform: "uppercase", color: browseHov ? "#000" : "#a3e635", transition: "color 0.35s", cursor: "pointer" }}>
          <span style={{ position: "absolute", inset: 0, backgroundColor: "#a3e635", transform: browseHov ? "scaleY(1)" : "scaleY(0)", transformOrigin: "bottom", transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)" }} />
          <span style={{ position: "relative", zIndex: 1 }}>Browse All Projects</span>
          <span style={{ position: "relative", zIndex: 1, fontSize: "16px" }}>→</span>
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;