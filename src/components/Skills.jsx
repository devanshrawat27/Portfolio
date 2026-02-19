import { useState, useEffect, useRef, useCallback } from "react";

const SKILLS = [
  { name: "React.js",    cat: "FRONTEND", color: "#61DAFB", power: 95, rarity: "LEGENDARY",
    logo: <svg viewBox="-11.5 -10.232 23 20.463" width="34" height="34"><circle r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg> },
  { name: "JavaScript",  cat: "FRONTEND", color: "#F7DF1E", power: 90, rarity: "LEGENDARY",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><rect width="32" height="32" rx="3" fill="#F7DF1E"/><path d="M9.5 24.5l2.1-1.3c.4.7.8 1.3 1.7 1.3.8 0 1.4-.3 1.4-1.6V15h2.6v8c0 2.6-1.5 3.8-3.8 3.8-2 0-3.2-1-3.8-2.3zM18.5 24.2l2.1-1.2c.5.9 1.2 1.5 2.5 1.5 1 0 1.7-.5 1.7-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.7-3-3.7 0-1.8 1.4-3.2 3.6-3.2 1.5 0 2.6.5 3.4 1.9l-1.9 1.2c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.5l.6.3c2.1.9 3.3 1.8 3.3 3.9 0 2.2-1.7 3.4-4 3.4-2.2 0-3.7-1-4.4-2.5z" fill="#000"/></svg> },
  { name: "TypeScript",  cat: "FRONTEND", color: "#3178C6", power: 85, rarity: "EPIC",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><rect width="32" height="32" rx="3" fill="#3178C6"/><path d="M18.5 20.5V23c.7.4 1.6.6 2.5.6 2.8 0 4.5-1.4 4.5-3.7 0-1.8-1-2.9-3.1-3.7-1.5-.6-2-.9-2-1.6 0-.6.5-1 1.3-1 .9 0 1.7.3 2.5.9l1.2-2.1c-.9-.7-2.1-1-3.5-1-2.6 0-4.3 1.5-4.3 3.6 0 1.9 1.1 3 3.3 3.7 1.4.5 1.8.9 1.8 1.6 0 .7-.6 1.1-1.6 1.1-1 0-2-.4-2.6-.9zM9 15.5H6V13h9.5v2.5H12.5V24H9z" fill="#fff"/></svg> },
  { name: "HTML5",       cat: "FRONTEND", color: "#E44D26", power: 80, rarity: "RARE",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><path d="M4 0l2.5 28L16 31l9.5-3L28 0z" fill="#E44D26"/><path d="M16 2.5v26.2l7.7-2.1L25.7 2.5z" fill="#F16529"/><path d="M9.9 9h6.1v3.1H13.2l.2 2.1H16v3.1H10.4zm.3 10.3H16v3.1l-3.5 1-.1-.1-3.1-.8z" fill="#fff"/><path d="M16 9h6.1l-.5 5.2H16v-3.1h2.6l.2-2.1H16zm0 10.3v3.1l3.5-1 .5-5.3H16v3.1h2.9l-.3 2.3z" fill="#EBEBEB"/></svg> },
  { name: "CSS3",        cat: "FRONTEND", color: "#1572B6", power: 78, rarity: "RARE",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><path d="M4 0l2.5 28L16 31l9.5-3L28 0z" fill="#1572B6"/><path d="M16 2.5v26.2l7.7-2.1L25.7 2.5z" fill="#33A9DC"/><path d="M10 9h12l-.4 4H13.8l.2 2.2H21.3l-1.1 10.4-4.2 1.2-4.2-1.2-.3-3h3l.1 1.3 1.4.4 1.4-.4.4-4.3H9.7z" fill="#fff"/></svg> },
  { name: "Tailwind",    cat: "FRONTEND", color: "#38BDF8", power: 88, rarity: "EPIC",
    logo: <svg viewBox="0 0 54 33" width="44" height="26"><path fillRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.672 33.808 15.8 40.5 15.8c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.128 33.692 0 27 0zM13.5 15.8C6.3 15.8 1.8 19.4 0 26.6c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 28.472 20.308 31.6 27 31.6c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 18.928 20.192 15.8 13.5 15.8z" fill="#38BDF8"/></svg> },
  { name: "Node.js",     cat: "BACKEND",  color: "#6BCB4C", power: 92, rarity: "LEGENDARY",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><path d="M16 2L2 9.5v13L16 30l14-7.5v-13z" fill="#6BCB4C"/><text x="16" y="21" textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff">js</text></svg> },
  { name: "Express",     cat: "BACKEND",  color: "#bbbbbb", power: 80, rarity: "RARE",
    logo: <svg viewBox="0 0 128 128" width="40" height="40"><path fill="#bbb" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.93-.92-1.26-1.78-2.58-2.82-4.14-9.26 12.61-18.31 24.37-27 36.39-2.26 3.14-4.85 4.43-8.78 3.43l35.49-48.2-33.16-43.55c4.46-.56 7.25.45 9.77 4.13 5.51 7.99 11.57 15.63 17.39 23.43 1.11 1.49 2.16 3.01 3.28 4.58 9.71-13.2 19.28-26.08 27.05-40.36 2.21 1.41 4.38 2.72 6.41 4.17.56.39.85 1.48 1.03 2.29z"/></svg> },
  { name: "Python",      cat: "BACKEND",  color: "#FFD43B", power: 83, rarity: "EPIC",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><path d="M15.9 2C11.2 2 8 4 8 7.3V10h8v1H5.5C3 11 1 13.5 1 17s2 6.3 4.5 6.3H7V20c0-2.6 2.5-4.7 5.5-4.7h7c2.6 0 4.5-1.7 4.5-4.3V7.3C24 4 20.6 2 15.9 2zm-3.4 3.5c.8 0 1.5.6 1.5 1.4s-.7 1.4-1.5 1.4-1.5-.6-1.5-1.4.7-1.4 1.5-1.4z" fill="#3776AB"/><path d="M16.1 30c4.7 0 7.9-2 7.9-5.3V22h-8v-1h10.5c2.5 0 4.5-2.5 4.5-6s-2-6.3-4.5-6.3H25v3.3c0 2.6-2.5 4.7-5.5 4.7h-7c-2.6 0-4.5 1.7-4.5 4.3v6.7C8 28 11.4 30 16.1 30zm3.4-3.5c-.8 0-1.5-.6-1.5-1.4s.7-1.4 1.5-1.4 1.5.6 1.5 1.4-.7 1.4-1.5 1.4z" fill="#FFD43B"/></svg> },
  { name: "MongoDB",     cat: "DATABASE", color: "#47A248", power: 87, rarity: "EPIC",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><path d="M16 2C9 2 4 8 4 15c0 5.5 3 10 7.5 12.5L16 30l4.5-2.5C25 25 28 20.5 28 15c0-7-5-13-12-13zm0 24l-2-1.2C10.5 22.7 8 19 8 15c0-4.4 3.1-8 7.5-8.4V26z" fill="#47A248"/></svg> },
  { name: "PostgreSQL",  cat: "DATABASE", color: "#336791", power: 82, rarity: "RARE",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><ellipse cx="16" cy="14" rx="10" ry="11" fill="none" stroke="#336791" strokeWidth="2"/><path d="M6 14h20M16 3v22" stroke="#336791" strokeWidth="1" opacity=".5"/><circle cx="16" cy="14" r="4" fill="#336791" opacity=".4"/></svg> },
  { name: "MySQL",       cat: "DATABASE", color: "#F29111", power: 78, rarity: "RARE",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><path d="M6 10c1-2 3-3 5-3s4 1 5 3" stroke="#F29111" strokeWidth="1.5" fill="none"/><path d="M6 10v12M16 10v12M26 7v15" stroke="#F29111" strokeWidth="1.5"/><path d="M6 22c1 2 3 3 5 3s4-1 5-3" stroke="#F29111" strokeWidth="1.5" fill="none"/></svg> },
  { name: "Git",         cat: "DEVOPS",   color: "#F05032", power: 91, rarity: "LEGENDARY",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><path d="M29.6 14.6L17.4 2.4a2 2 0 00-2.8 0L12 5l3.5 3.5a2.5 2.5 0 013.1 3.1L22 15a2.5 2.5 0 110 3.5l-3.5-3.5v9a2.5 2.5 0 11-2 0v-9.1l-3.5-3.5a2.5 2.5 0 01-3.2-3.1L6.3 4.5 2.4 8.4a2 2 0 000 2.8l12.2 12.2 14.7-14.7z" fill="#F05032" fillRule="evenodd"/></svg> },
  { name: "GitHub",      cat: "DEVOPS",   color: "#e2e2e2", power: 89, rarity: "EPIC",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><path d="M16 2C8.3 2 2 8.3 2 16c0 6.2 4 11.4 9.5 13.3.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 3.9 1.1.1-.9.5-1.5.9-1.8-3-.3-6.2-1.5-6.2-6.8 0-1.5.5-2.7 1.4-3.7-.1-.3-.6-1.7.1-3.6 0 0 1.1-.4 3.7 1.4 1.1-.3 2.2-.4 3.3-.4s2.2.1 3.3.4c2.6-1.8 3.7-1.4 3.7-1.4.7 1.9.3 3.3.1 3.6.9 1 1.4 2.2 1.4 3.7 0 5.3-3.2 6.4-6.3 6.8.5.4.9 1.2.9 2.5v3.7c0 .4.3.8 1 .7C26 27.4 30 22.2 30 16c0-7.7-6.3-14-14-14z" fill="#e2e2e2"/></svg> },
  { name: "Docker",      cat: "DEVOPS",   color: "#2496ED", power: 84, rarity: "EPIC",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><rect x="2" y="14" width="5" height="4" rx="1" fill="#2496ED"/><rect x="9" y="14" width="5" height="4" rx="1" fill="#2496ED"/><rect x="16" y="14" width="5" height="4" rx="1" fill="#2496ED"/><rect x="9" y="8" width="5" height="4" rx="1" fill="#2496ED"/><rect x="16" y="8" width="5" height="4" rx="1" fill="#2496ED"/><path d="M3 20c0 4 3 6 7 6h10c5 0 8-3 8-7 0 0 2-1 2-4H3" stroke="#2496ED" strokeWidth="1" fill="none"/></svg> },
  { name: "AWS",         cat: "DEVOPS",   color: "#FF9900", power: 86, rarity: "EPIC",
    logo: <svg viewBox="0 0 80 50" width="44" height="28"><text x="40" y="20" textAnchor="middle" fontSize="16" fill="#FF9900" fontWeight="800" fontFamily="monospace">AWS</text><path d="M10 35c-4 2-6 4-6 6 0 4 5 6 12 6s12-2 12-6" fill="none" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round"/><path d="M12 26h8l4 12h3l4-12h8" fill="none" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: "OpenAI",      cat: "AI/ML",    color: "#10a37f", power: 97, rarity: "LEGENDARY",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><path d="M28.8 14.5a7.7 7.7 0 00-.7-6.4 8 8 0 00-8.5-3.8A7.7 7.7 0 0014 2a8 8 0 00-7.6 5.5 7.7 7.7 0 00-5.1 3.7 8 8 0 001 9.3 7.7 7.7 0 00.7 6.4 8 8 0 008.5 3.8A7.7 7.7 0 0018 31a8 8 0 007.6-5.5 7.7 7.7 0 005.1-3.7 8 8 0 00-1-7.3z" fill="none" stroke="#10a37f" strokeWidth="1.5"/><circle cx="16" cy="16" r="3" fill="#10a37f"/></svg> },
  { name: "WebRTC",      cat: "BACKEND",  color: "#a3e635", power: 75, rarity: "RARE",
    logo: <svg viewBox="0 0 32 32" width="34" height="34"><circle cx="16" cy="16" r="13" fill="none" stroke="#a3e635" strokeWidth="1.5"/><circle cx="10" cy="12" r="3" fill="#a3e635" opacity=".8"/><circle cx="22" cy="12" r="3" fill="#a3e635" opacity=".8"/><circle cx="16" cy="22" r="3" fill="#a3e635"/><line x1="13" y1="12" x2="19" y2="12" stroke="#a3e635" strokeWidth="1"/><line x1="11" y1="14" x2="15" y2="20" stroke="#a3e635" strokeWidth="1"/><line x1="21" y1="14" x2="17" y2="20" stroke="#a3e635" strokeWidth="1"/></svg> },
];

const RARITY = {
  LEGENDARY: { color: "#FFD700", label: "◆ LEGENDARY" },
  EPIC:      { color: "#C084FC", label: "◈ EPIC" },
  RARE:      { color: "#60A5FA", label: "◇ RARE" },
};
const CATS = ["ALL", "FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "AI/ML"];

function hexRgb(hex) {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)}`;
}

function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref  = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let n = 0;
        const step = Math.ceil(target / 45);
        const id = setInterval(() => {
          n = Math.min(n + step, target);
          setVal(n);
          if (n >= target) clearInterval(id);
        }, 28);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function SkillCard({ skill, delay, onHover, onLeave }) {
  const [hov, setHov] = useState(false);
  const rar = RARITY[skill.rarity];
  const rgb = hexRgb(skill.color);

  return (
    <div
      onMouseEnter={() => { setHov(true); onHover(skill); }}
      onMouseLeave={() => { setHov(false); onLeave(); }}
      style={{
        position: "relative", padding: "18px 15px 15px", borderRadius: 8,
        border: `1px solid ${hov ? skill.color + "ee" : skill.color + "44"}`,
        background: hov ? `linear-gradient(145deg, rgba(${rgb},0.18) 0%, #050505 100%)` : `linear-gradient(145deg, rgba(${rgb},0.07) 0%, #0a0a0a 100%)`,
        cursor: "pointer", overflow: "hidden",
        transform: hov ? "scale(1.05) translateY(-6px)" : "scale(1) translateY(0px)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, background 0.25s, box-shadow 0.25s",
        boxShadow: hov ? `0 0 0 1px ${skill.color}88, 0 0 40px rgba(${rgb},0.35), 0 20px 40px rgba(0,0,0,0.8)` : `0 0 16px rgba(${rgb},0.12), 0 4px 16px rgba(0,0,0,0.5)`,
        animationName: "tsCardIn", animationDuration: "0.5s",
        animationTimingFunction: "ease", animationFillMode: "both",
        animationDelay: `${delay}ms`, zIndex: hov ? 10 : 1,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: rar.color, boxShadow: hov ? `0 0 20px ${rar.color}` : `0 0 8px ${rar.color}88`, borderRadius: "8px 8px 0 0", transition: "box-shadow 0.25s" }}/>
      <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${skill.color}${hov ? "bb" : "44"}, transparent)`, animationName: "tsScan", animationDuration: hov ? "1.2s" : "3s", animationTimingFunction: "linear", animationIterationCount: "infinite", pointerEvents: "none", zIndex: 5 }}/>
      {[{ top:8, left:8, borderTop:`2px solid ${skill.color}`, borderLeft:`2px solid ${skill.color}` }, { top:8, right:8, borderTop:`2px solid ${skill.color}`, borderRight:`2px solid ${skill.color}` }, { bottom:8, left:8, borderBottom:`2px solid ${skill.color}`, borderLeft:`2px solid ${skill.color}` }, { bottom:8, right:8, borderBottom:`2px solid ${skill.color}`, borderRight:`2px solid ${skill.color}` }].map((s, i) => (
        <div key={i} style={{ position:"absolute", width:11, height:11, opacity: hov ? 1 : 0.35, transition: "opacity 0.2s", pointerEvents: "none", ...s }}/>
      ))}
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, letterSpacing: "1.5px", color: rar.color, marginBottom: 6 }}>{rar.label}</div>
      <div style={{ display: "inline-block", fontFamily: "'Courier New', monospace", fontSize: 9, fontWeight: 700, letterSpacing: "1.5px", padding: "2px 8px", marginBottom: 12, borderRadius: 2, border: `1px solid ${skill.color}66`, background: `rgba(${rgb},0.18)`, color: skill.color }}>{skill.cat}</div>
      <div style={{ position:"relative", display:"flex", justifyContent:"center", marginBottom: 11 }}>
        <div style={{ width: 68, height: 68, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(${rgb},0.12)`, boxShadow: hov ? `0 0 36px rgba(${rgb},0.55)` : `0 0 18px rgba(${rgb},0.25)`, transition: "box-shadow 0.3s" }}>
          <div style={{ filter: hov ? `drop-shadow(0 0 12px ${skill.color})` : `drop-shadow(0 0 5px ${skill.color}99)`, transform: hov ? "scale(1.15)" : "scale(1)", transition: "filter 0.3s, transform 0.3s", display: "flex" }}>{skill.logo}</div>
        </div>
        <div style={{ position: "absolute", top: -7, left: "50%", marginLeft: -41, width: 82, height: 82, borderRadius: 16, border: `2px solid ${skill.color}${hov ? "66" : "22"}`, borderTopColor: skill.color, animationName: "tsSpin", animationDuration: hov ? "0.9s" : "3s", animationTimingFunction: "linear", animationIterationCount: "infinite", pointerEvents: "none", transition: "border-color 0.3s" }}/>
      </div>
      <div style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: "1.05rem", letterSpacing: "2px", textAlign: "center", marginBottom: 11, color: hov ? "#fff" : skill.color + "cc", textShadow: hov ? `0 0 22px ${skill.color}` : `0 0 10px ${skill.color}66`, transition: "color 0.25s, text-shadow 0.25s" }}>{skill.name}</div>
      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 8, letterSpacing: "2px", color: `${skill.color}bb`, flexShrink: 0 }}>PWR</span>
        <div style={{ flex:1, height:5, borderRadius:2, position:"relative", overflow:"hidden", background: "rgba(255,255,255,0.06)" }}>
          <div style={{ height:"100%", borderRadius:2, width: `${skill.power}%`, background: hov ? `linear-gradient(90deg, ${skill.color}88, ${skill.color})` : `linear-gradient(90deg, ${skill.color}44, ${skill.color}99)`, boxShadow: hov ? `0 0 10px ${skill.color}` : `0 0 4px ${skill.color}66`, transition: "background 0.3s, box-shadow 0.3s" }}/>
          {[25,50,75].map(t => <div key={t} style={{ position:"absolute", top:0, bottom:0, left:`${t}%`, width:1, background:"rgba(0,0,0,0.5)" }}/>)}
        </div>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 9, flexShrink: 0, minWidth: 22, textAlign: "right", color: skill.color, opacity: hov ? 1 : 0.7, transition: "opacity 0.25s" }}>{skill.power}</span>
      </div>
      <div style={{ position:"absolute", inset:0, borderRadius:8, pointerEvents:"none", background:"linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 55%)" }}/>
      {hov && (
        <>
          <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, borderRadius:8, pointerEvents:"none", background: `radial-gradient(ellipse at 50% 0%, rgba(${rgb},0.18) 0%, transparent 65%)` }}/>
          <div style={{ position:"absolute", bottom:-1, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${skill.color}, transparent)`, animationName:"tsBottomPulse", animationDuration:"1.5s", animationTimingFunction:"ease-in-out", animationIterationCount:"infinite" }}/>
        </>
      )}
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
    <section id="skills" ref={sectionRef} style={{ background: "#000000", minHeight: "100vh", padding: "clamp(60px,10vw,100px) 0 0", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes tsCardIn { from { opacity:0; transform: scale(0.65) translateY(28px); } to { opacity:1; transform: scale(1) translateY(0px); } }
        @keyframes tsScan { from { top: -4%; } to { top: 108%; } }
        @keyframes tsSpin { to { transform: rotate(360deg); } }
        @keyframes tsBottomPulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
      `}</style>

      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:"repeating-linear-gradient(-45deg,rgba(163,230,53,0.014) 0px,rgba(163,230,53,0.014) 1px,transparent 1px,transparent 52px)" }}/>
      <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:500, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(163,230,53,0.04) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }}/>

      {/* HEADER */}
      <div style={{ position:"relative", zIndex:2, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", padding:`0 clamp(20px,5vw,60px) clamp(28px,5vw,52px)`, gap: isMobile ? 16 : 40 }}>
        <div>
          <div style={{ fontFamily:"'Courier New',monospace", fontSize:11, color:"#a3e635", letterSpacing:"6px", marginBottom:18, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ width:28, height:1, background:"#a3e635", display:"block" }}/>
            ARSENAL_V2
            <span style={{ width:28, height:1, background:"#a3e635", display:"block" }}/>
          </div>
          <h2 style={{ fontFamily:"Impact,'Arial Black',sans-serif", fontSize:"clamp(2.8rem,10vw,7.5rem)", lineHeight:0.88, color:"#fff", margin:0, letterSpacing:"4px" }}>
            TECH<br/><span style={{ color:"#a3e635" }}>STACK</span>
          </h2>
        </div>
        {!isMobile && (
          <div style={{ maxWidth:340, borderLeft:"2px solid #1a2a0a", paddingLeft:24 }}>
            <p style={{ fontFamily:"'Courier New',monospace", fontSize:12, color:"#3a5a20", lineHeight:"2.1", margin:"0 0 18px" }}>
              {">"} Battle-tested tools.<br/>{">"} Real projects, real code.<br/>{">"} Hover a card to activate.
            </p>
            <p style={{ fontFamily:"Impact,'Arial Black',sans-serif", fontSize:"2rem", margin:0, letterSpacing:"2px", color: activeSkill ? activeSkill.color : "#1c2a10", textShadow: activeSkill ? `0 0 28px ${activeSkill.color}80` : "none", transition: "color 0.2s, text-shadow 0.2s" }}>
              {activeSkill ? `// ${activeSkill.name}` : "// SELECT SKILL"}
            </p>
          </div>
        )}
      </div>

      {/* FILTERS — horizontal scroll on mobile */}
      <div style={{ position:"relative", zIndex:2, display:"flex", gap:8, padding:`0 clamp(20px,5vw,60px) clamp(24px,4vw,44px)`, flexWrap: isMobile ? "nowrap" : "wrap", overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? "16px" : undefined, WebkitOverflowScrolling: "touch" }}>
        {CATS.map(c => {
          const on = filter === c;
          return (
            <button key={c} onClick={() => setFilter(c)} style={{ fontFamily:"'Courier New',monospace", fontSize: isMobile ? 10 : 11, letterSpacing:"2px", padding: isMobile ? "7px 14px" : "9px 22px", borderRadius:3, border:`1px solid ${on ? "#a3e635" : "rgba(255,255,255,0.1)"}`, background: on ? "#a3e635" : "transparent", color: on ? "#000" : "#3a5a3a", cursor:"pointer", fontWeight: on ? 700 : 400, boxShadow: on ? "0 0 20px rgba(163,230,53,0.35)" : "none", transition:"all 0.2s", flexShrink: 0, whiteSpace: "nowrap" }}>{c}</button>
          );
        })}
      </div>

      {/* CARD GRID — 2 cols on mobile, auto on desktop */}
      <div style={{ position:"relative", zIndex:2, display:"grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill,minmax(168px,1fr))", gap: isMobile ? 10 : 14, padding:`0 clamp(16px,4vw,60px)` }}>
        {filtered.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} delay={i * 40} onHover={setActive} onLeave={() => setActive(null)} />
        ))}
      </div>

      {/* STATS — 2x2 on mobile, 4 cols on desktop */}
      <div style={{ position:"relative", zIndex:2, display:"grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4,1fr)", borderTop:"1px solid #111", marginTop: isMobile ? 40 : 60 }}>
        {[
          { target: filtered.length, suffix:"+",    label:"TECHNOLOGIES" },
          { target: 5,               suffix:"+",    label:"PROJECTS SHIPPED" },
          { target: 3,               suffix:" YRS", label:"EXPERIENCE" },
          { target: 50,              suffix:"K+",   label:"LINES OF CODE" },
        ].map(({ target, suffix, label }, i) => (
          <div key={label} style={{ padding: isMobile ? "32px 10px" : "48px 20px", textAlign:"center", borderRight: isMobile ? (i % 2 === 0 ? "1px solid #111" : "none") : (i < 3 ? "1px solid #111" : "none"), borderBottom: isMobile && i < 2 ? "1px solid #111" : "none", background:"#000" }}>
            <span style={{ fontFamily:"Impact,'Arial Black',sans-serif", fontSize:"clamp(2rem,8vw,4.2rem)", color:"#a3e635", display:"block", lineHeight:1, textShadow:"0 0 35px rgba(163,230,53,0.4)", letterSpacing:"2px" }}>
              <Counter target={target} suffix={suffix}/>
            </span>
            <span style={{ fontFamily:"'Courier New',monospace", fontSize: isMobile ? 8 : 10, color:"#2a4a1a", letterSpacing: isMobile ? "2px" : "4px", display:"block", marginTop:8 }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}