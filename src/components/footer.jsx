import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#home" }, { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" }, { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
const socials = [
  { href: "https://github.com/devanshrawat27",                     icon: <FaGithub size={17} />,   label: "GitHub"    },
  { href: "https://www.linkedin.com/in/devansh-rawat-170649268/", icon: <FaLinkedin size={17} />,  label: "LinkedIn"  },
  { href: "https://x.com/Devanshrawat49",                         icon: <FaTwitter size={17} />,   label: "Twitter"   },
  { href: "https://www.instagram.com/",                            icon: <FaInstagram size={17} />, label: "Instagram" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: "#000", borderTop: "1px solid #222", position: "relative", overflow: "hidden" }}>
      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.5);} }`}</style>

      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 1, background: "linear-gradient(90deg, transparent, #a3e635, transparent)", opacity: 0.5 }} />
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 300, background: "radial-gradient(ellipse, rgba(163,230,53,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(40px,6vw,70px) clamp(20px,5vw,80px) clamp(24px,4vw,40px)", position: "relative", zIndex: 1 }}>

        {/* Top row — stacks on mobile */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(32px,5vw,48px)", marginBottom: "clamp(32px,5vw,60px)" }}>

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-1px", color: "#fff", marginBottom: "4px" }}>
              DEVANSH<span style={{ color: "#a3e635" }}>.</span>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", color: "#a3e635", letterSpacing: "3px", marginBottom: "16px" }}>FULL STACK DEVELOPER</div>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.85", margin: "0 0 20px" }}>3rd year B.Tech CSE student building fast, scalable web apps. Open to internships and collaborations.</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 16px", borderRadius: "100px", background: "rgba(163,230,53,0.07)", border: "1px solid rgba(163,230,53,0.2)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635", animation: "pulse-dot 1.8s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'Courier New', monospace", color: "#a3e635", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px" }}>AVAILABLE FOR WORK</span>
            </div>
          </motion.div>

          {/* Nav */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "'Courier New', monospace", color: "#666", fontSize: "10px", letterSpacing: "3px", margin: "0 0 20px" }}>NAVIGATION</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {navLinks.map(({ label, href }) => {
                const [hov, setHov] = useState(false);
                return (
                  <a key={label} href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                    style={{ display: "inline-flex", alignItems: "center", gap: "9px", color: hov ? "#a3e635" : "#999", fontSize: "14px", fontWeight: 600, textDecoration: "none", transform: hov ? "translateX(5px)" : "translateX(0)", transition: "all 0.22s" }}>
                    <span style={{ width: hov ? 16 : 8, height: 1, background: hov ? "#a3e635" : "#555", transition: "all 0.22s", flexShrink: 0 }} />{label}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "'Courier New', monospace", color: "#666", fontSize: "10px", letterSpacing: "3px", margin: "0 0 20px" }}>GET IN TOUCH</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Email", value: "devanshdevr@gmail.com", href: "mailto:devanshdevr@gmail.com" },
                { label: "Location", value: "Dehradun, India" },
                { label: "University", value: "Graphic Era Hill University" },
              ].map(({ label, value, href }) => {
                const [hov, setHov] = useState(false);
                return (
                  <div key={label}>
                    <div style={{ fontFamily: "'Courier New', monospace", color: "#666", fontSize: "9px", letterSpacing: "2px", marginBottom: "4px" }}>{label}</div>
                    {href ? (
                      <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ color: hov ? "#a3e635" : "#ccc", fontSize: "13px", fontWeight: 600, textDecoration: "none", transition: "color 0.2s", borderBottom: hov ? "1px solid #a3e635" : "1px solid transparent" }}>{value}</a>
                    ) : (
                      <span style={{ color: "#ccc", fontSize: "13px", fontWeight: 600 }}>{value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, #a3e63530, #333, transparent)", marginBottom: "24px" }} />

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", color: "#666" }}>
            © {year} <span style={{ color: "#aaa" }}>Devansh Rawat</span>. Crafted with ❤️ & ☕
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {socials.map(({ href, icon, label }) => {
              const [hov, setHov] = useState(false);
              return (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{ width: 34, height: 34, borderRadius: "9px", border: `1px solid ${hov ? "#a3e635" : "#2a2a2a"}`, background: hov ? "rgba(163,230,53,0.08)" : "transparent", color: hov ? "#a3e635" : "#888", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transform: hov ? "translateY(-3px)" : "translateY(0)", transition: "all 0.22s" }}
                >{icon}</a>
              );
            })}
          </div>
          {(() => {
            const [hov, setHov] = useState(false);
            return (
              <a href="#home" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'Courier New', monospace", fontSize: "10px", letterSpacing: "2px", color: hov ? "#a3e635" : "#888", textDecoration: "none", transition: "color 0.22s" }}>
                BACK TO TOP
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "8px", border: `1px solid ${hov ? "#a3e635" : "#2a2a2a"}`, background: hov ? "rgba(163,230,53,0.07)" : "transparent", fontSize: "13px", transform: hov ? "translateY(-2px)" : "translateY(0)", transition: "all 0.22s" }}>↑</span>
              </a>
            );
          })()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;