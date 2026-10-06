import { useState, useEffect, useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiSocketdotio,
  SiPython,
  SiWebrtc,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiPrisma,
  SiMysql,
  SiDocker,
  SiAmazonwebservices,
  SiGit,
  SiGithub,
  SiPytorch,
} from "react-icons/si";

const SKILLS = [
  { name: "React.js",     cat: "FRONTEND", color: "#61DAFB", icon: SiReact },
  { name: "Next.js",      cat: "FRONTEND", color: "#FFFFFF", icon: SiNextdotjs },
  { name: "JavaScript",   cat: "FRONTEND", color: "#F7DF1E", icon: SiJavascript },
  { name: "TypeScript",   cat: "FRONTEND", color: "#3178C6", icon: SiTypescript },
  { name: "Tailwind CSS", cat: "FRONTEND", color: "#06B6D4", icon: SiTailwindcss },
  { name: "HTML5",        cat: "FRONTEND", color: "#E34F26", icon: SiHtml5 },
  { name: "CSS3",         cat: "FRONTEND", color: "#1572B6", icon: SiCss3 },
  { name: "Node.js",      cat: "BACKEND",  color: "#5FA04E", icon: SiNodedotjs },
  { name: "Express",      cat: "BACKEND",  color: "#E2E8F0", icon: SiExpress },
  { name: "NestJS",       cat: "BACKEND",  color: "#EA2845", icon: SiNestjs },
  { name: "Socket.io",    cat: "BACKEND",  color: "#FFFFFF", icon: SiSocketdotio },
  { name: "Python",       cat: "BACKEND",  color: "#3776AB", icon: SiPython },
  { name: "WebRTC",       cat: "BACKEND",  color: "#A3E635", icon: SiWebrtc },
  { name: "PostgreSQL",   cat: "DATABASE", color: "#4169E1", icon: SiPostgresql },
  { name: "MongoDB",      cat: "DATABASE", color: "#47A248", icon: SiMongodb },
  { name: "Firebase",     cat: "DATABASE", color: "#FFCA28", icon: SiFirebase },
  { name: "Prisma",       cat: "DATABASE", color: "#5A67D8", icon: SiPrisma },
  { name: "MySQL",        cat: "DATABASE", color: "#4479A1", icon: SiMysql },
  { name: "Docker",       cat: "DEVOPS",   color: "#2496ED", icon: SiDocker },
  { name: "AWS",          cat: "DEVOPS",   color: "#FF9900", icon: SiAmazonwebservices },
  { name: "Git",          cat: "DEVOPS",   color: "#F05032", icon: SiGit },
  { name: "GitHub",       cat: "DEVOPS",   color: "#E2E8F0", icon: SiGithub },
  { name: "PyTorch",      cat: "AI/ML",    color: "#EE4C2C", icon: SiPytorch },
];

const CATS = ["ALL", "FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "AI/ML"];

function hexRgb(hex) {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
}

function SkillCard({ skill, delay, onHover, onLeave }) {
  const [hov, setHov] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef(null);
  const rgb = hexRgb(skill.color);
  const Icon = skill.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Interactive 3D tilt calculation (-6deg to +6deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;
    setTilt({ rx, ry });
  };

  const handleMouseEnter = (e) => {
    setHov(true);
    onHover(skill);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setHov(false);
    setTilt({ rx: 0, ry: 0 });
    onLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        padding: "30px 18px 24px",
        borderRadius: 22,
        border: `1px solid ${hov ? `${skill.color}66` : "rgba(255, 255, 255, 0.08)"}`,
        background: hov
          ? `linear-gradient(145deg, rgba(${rgb}, 0.16) 0%, rgba(14, 14, 18, 0.98) 100%)`
          : "linear-gradient(145deg, rgba(22, 22, 26, 0.85) 0%, rgba(10, 10, 12, 0.95) 100%)",
        cursor: "pointer",
        overflow: "hidden",
        transform: hov
          ? `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-8px) scale(1.025)`
          : "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
        transition: hov
          ? "transform 0.1s ease-out, border-color 0.25s ease, box-shadow 0.25s ease"
          : "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: hov
          ? `0 22px 45px -12px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(${rgb}, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)`
          : "0 4px 20px -4px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.04)",
        zIndex: hov ? 10 : 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        minHeight: 168,
        contain: "paint",
      }}
    >
      {/* Interactive Cursor Spotlight Follower */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: 22,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.25s ease",
          background: `radial-gradient(170px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${rgb}, 0.25), transparent 75%)`,
          zIndex: 1,
        }}
      />

      {/* Ambient Top Glow Line on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s ease",
          boxShadow: `0 0 14px ${skill.color}`,
          zIndex: 2,
        }}
      />

      {/* Center: Real Official Icon Housing with Floating & Levitation Effect */}
      <div
        style={{
          position: "relative",
          width: 68,
          height: 68,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hov
            ? `radial-gradient(circle at 50% 50%, rgba(${rgb}, 0.24) 0%, rgba(255, 255, 255, 0.04) 100%)`
            : "rgba(255, 255, 255, 0.03)",
          border: `1px solid ${hov ? `${skill.color}66` : "rgba(255, 255, 255, 0.08)"}`,
          boxShadow: hov
            ? `0 0 28px rgba(${rgb}, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.25)`
            : "0 4px 14px rgba(0, 0, 0, 0.35)",
          transform: hov ? "translateY(-4px) scale(1.08)" : "translateY(0) scale(1)",
          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex: 2,
        }}
      >
        <Icon
          size={34}
          color={skill.color}
          style={{
            transform: hov ? "scale(1.1)" : "scale(1)",
            filter: hov
              ? `drop-shadow(0 0 14px ${skill.color})`
              : `drop-shadow(0 0 3px ${skill.color}55)`,
            transition: "all 0.3s ease",
          }}
        />

        {/* Ambient Orbit Dash Ring behind icon on hover */}
        {hov && (
          <div
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: 22,
              border: `1px dashed ${skill.color}44`,
              animation: "tsOrbit 7s linear infinite",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Bottom: Crisp Modern Typography for Skill Name */}
      <div
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "-0.2px",
          textAlign: "center",
          color: hov ? "#ffffff" : "#e2e8f0",
          textShadow: hov ? `0 0 18px ${skill.color}aa` : "none",
          transition: "all 0.25s ease",
          zIndex: 2,
        }}
      >
        {skill.name}
      </div>

      {/* Glass Inner Subtle Reflection Sheen */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, transparent 60%)",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default function Skills() {
  const [filter, setFilter]      = useState("ALL");
  const [activeSkill, setActive] = useState(null);
  const [isMobile, setIsMobile]  = useState(window.innerWidth < 768);
  const sectionRef               = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtered = filter === "ALL" ? SKILLS : SKILLS.filter(s => s.cat === filter);

  return (
    <section id="skills" ref={sectionRef} style={{ background: "#000000", minHeight: "100vh", padding: "clamp(60px,10vw,100px) 0 80px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes tsOrbit { to { transform: rotate(360deg); } }
      `}</style>

      {/* Ambient Backdrop Elements */}
      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:"repeating-linear-gradient(-45deg,rgba(163,230,53,0.014) 0px,rgba(163,230,53,0.014) 1px,transparent 1px,transparent 52px)" }}/>
      <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:500, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(163,230,53,0.04) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }}/>

      {/* HEADER */}
      <div style={{ position:"relative", zIndex:2, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", padding:`0 clamp(20px,5vw,60px) clamp(28px,5vw,52px)`, gap: isMobile ? 16 : 40 }}>
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "18px",
            padding: "5px 14px",
            borderRadius: "100px",
            background: "linear-gradient(135deg, rgba(163,230,53,0.1) 0%, rgba(163,230,53,0.02) 100%)",
            border: "1px solid rgba(163,230,53,0.28)",
            boxShadow: "0 0 16px rgba(163,230,53,0.08)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635" }} />
            <span style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", color: "#a3e635", fontSize: "11px", letterSpacing: "3px", fontWeight: 800 }}>
              TECH STACK
            </span>
          </div>
          <h2 style={{ fontFamily:"Impact,'Arial Black',sans-serif", fontSize:"clamp(2.8rem,10vw,7.5rem)", lineHeight:0.88, color:"#fff", margin:0, letterSpacing:"4px" }}>
            TECH<br/><span style={{ color:"#a3e635" }}>STACK</span>
          </h2>
        </div>
        {!isMobile && (
          <div style={{ maxWidth:340, borderLeft:"2px solid rgba(163,230,53,0.25)", paddingLeft:24 }}>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:"#94a3b8", lineHeight:"1.8", margin:"0 0 18px", fontWeight: 500 }}>
              Production-tested technologies and tools powering scalable web applications, robust APIs, and modern experiences.
            </p>
            <p style={{ fontFamily:"Impact,'Arial Black',sans-serif", fontSize:"1.8rem", margin:0, letterSpacing:"2px", color: activeSkill ? activeSkill.color : "#475569", textShadow: activeSkill ? `0 0 24px ${activeSkill.color}80` : "none", transition: "color 0.25s, text-shadow 0.25s" }}>
              {activeSkill ? `// ${activeSkill.name}` : "// EXPLORE STACK"}
            </p>
          </div>
        )}
      </div>

      {/* FILTERS — Ultra-Premium Frosted Capsule Pills */}
      <div style={{
        position:"relative",
        zIndex:2,
        display:"flex",
        gap:10,
        padding:`0 clamp(20px,5vw,60px)`,
        marginBottom: isMobile ? "24px" : "36px",
        flexWrap: isMobile ? "nowrap" : "wrap",
        overflowX: isMobile ? "auto" : "visible",
        paddingBottom: isMobile ? "12px" : "0px",
        WebkitOverflowScrolling: "touch",
      }}>
        {CATS.map(c => {
          const on = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontSize: isMobile ? "10.5px" : "11.5px",
                letterSpacing: "1.5px",
                padding: isMobile ? "7px 16px" : "9px 22px",
                borderRadius: "100px",
                border: on ? "1px solid #a3e635" : "1px solid rgba(255,255,255,0.1)",
                background: on
                  ? "linear-gradient(135deg, #a3e635 0%, #84cc16 100%)"
                  : "linear-gradient(135deg, rgba(30,30,36,0.9) 0%, rgba(18,18,22,0.95) 100%)",
                color: on ? "#000" : "#cbd5e1",
                cursor: "pointer",
                fontWeight: on ? 800 : 600,
                boxShadow: on
                  ? "0 0 24px rgba(163,230,53,0.4), inset 0 1px 1px rgba(255,255,255,0.4)"
                  : "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.12)",
                transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                if (!on) {
                  e.currentTarget.style.borderColor = "rgba(163,230,53,0.5)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(163,230,53,0.2)";
                }
              }}
              onMouseLeave={e => {
                if (!on) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#cbd5e1";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.12)";
                }
              }}
            >
              {on && <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", backgroundColor: "#000", marginRight: 7, verticalAlign: "middle" }} />}
              {c}
            </button>
          );
        })}
      </div>

      {/* CARD GRID — Generous row and column gaps, no sticking */}
      <div style={{
        position:"relative",
        zIndex:2,
        display:"grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(165px, 1fr))",
        rowGap: isMobile ? "20px" : "28px",
        columnGap: isMobile ? "14px" : "20px",
        padding:`0 clamp(16px,4vw,60px)`,
      }}>
        {filtered.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} delay={i * 30} onHover={setActive} onLeave={() => setActive(null)} />
        ))}
      </div>
    </section>
  );
}