import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
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
  
  // Track hover states at the top level to avoid React Hook rule violations in loops
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredBackToTop, setHoveredBackToTop] = useState(false);

  return (
    <footer style={{ backgroundColor: "#000", borderTop: "1px solid #111", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes pulse-dot { 
          0%, 100% { opacity: 1; transform: scale(1); } 
          50% { opacity: 0.4; transform: scale(1.4); } 
        }
      `}</style>

      {/* Top glowing line */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "70%", height: 1, background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.4), transparent)", opacity: 0.8 }} />
      
      {/* Soft background radial glow */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 250, background: "radial-gradient(ellipse, rgba(163,230,53,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(50px,7vw,80px) clamp(20px,5vw,80px) clamp(30px,4vw,50px)", position: "relative", zIndex: 1 }}>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "clamp(40px,6vw,60px)", marginBottom: "clamp(40px,6vw,70px)" }}>

          {/* Column 1: Brand & Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-1.5px", color: "#fff", marginBottom: "4px" }}>
              DEVANSH<span style={{ color: "#a3e635" }}>.</span>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: "10.5px", color: "#a3e635", letterSpacing: "3.5px", fontWeight: 700 }}>
              AI ENGINEER &amp; FULL STACK DEVELOPER
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "'Courier New', monospace", color: "#444", fontSize: "10px", letterSpacing: "3px", fontWeight: 700, margin: "0 0 24px" }}>NAVIGATION</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {navLinks.map(({ label, href }) => {
                const isHovered = hoveredNav === label;
                return (
                  <a
                    key={label}
                    href={href}
                    onMouseEnter={() => setHoveredNav(label)}
                    onMouseLeave={() => setHoveredNav(null)}
                    style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "10px", 
                      color: isHovered ? "#a3e635" : "#888", 
                      fontSize: "14px", 
                      fontWeight: 500, 
                      textDecoration: "none", 
                      transform: isHovered ? "translateX(6px)" : "translateX(0)", 
                      transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)" 
                    }}
                  >
                    <span style={{ 
                      width: isHovered ? 16 : 6, 
                      height: 1.5, 
                      background: isHovered ? "#a3e635" : "#333", 
                      transition: "all 0.25s", 
                      flexShrink: 0 
                    }} />
                    {label}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "'Courier New', monospace", color: "#444", fontSize: "10px", letterSpacing: "3px", fontWeight: 700, margin: "0 0 24px" }}>GET IN TOUCH</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { label: "Email", value: "devanshdevr@gmail.com", href: "mailto:devanshdevr@gmail.com" },
                { label: "Location", value: "Dehradun, India" },
                { label: "University", value: "Graphic Era Hill University" },
              ].map(({ label, value, href }) => {
                const isHovered = hoveredContact === label;
                return (
                  <div key={label}>
                    <div style={{ fontFamily: "'Courier New', monospace", color: "#555", fontSize: "9px", letterSpacing: "2px", marginBottom: "6px" }}>{label}</div>
                    {href ? (
                      <a 
                        href={href} 
                        onMouseEnter={() => setHoveredContact(label)} 
                        onMouseLeave={() => setHoveredContact(null)} 
                        style={{ 
                          color: isHovered ? "#a3e635" : "#ccc", 
                          fontSize: "14px", 
                          fontWeight: 600, 
                          textDecoration: "none", 
                          transition: "color 0.2s", 
                          borderBottom: isHovered ? "1px solid rgba(163,230,53,0.5)" : "1px solid transparent",
                          paddingBottom: "2px"
                        }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ color: "#eee", fontSize: "14px", fontWeight: 600 }}>{value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Clean subtle divider */}
        <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, rgba(163,230,53,0.15), #222, transparent)", marginBottom: "30px" }} />

        {/* Bottom Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          
          {/* Copyright */}
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", color: "#555" }}>
            © {year} <span style={{ color: "#888", fontWeight: 600 }}>Devansh Rawat</span>. Crafted with ❤️ &amp; ☕
          </div>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map(({ href, icon, label }) => {
              const isHovered = hoveredSocial === label;
              return (
                <a 
                  key={label} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={label}
                  onMouseEnter={() => setHoveredSocial(label)} 
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{ 
                    width: 38, 
                    height: 38, 
                    borderRadius: "10px", 
                    border: `1px solid ${isHovered ? "rgba(163,230,53,0.4)" : "#1c1c1c"}`, 
                    background: isHovered ? "rgba(163,230,53,0.06)" : "rgba(10,10,10,0.4)", 
                    color: isHovered ? "#a3e635" : "#777", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    textDecoration: "none", 
                    transform: isHovered ? "translateY(-3px)" : "translateY(0)", 
                    boxShadow: isHovered ? "0 5px 15px rgba(163,230,53,0.15)" : "none",
                    transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)" 
                  }}
                >
                  {icon}
                </a>
              );
            })}
          </div>

          {/* Back to Top button */}
          <a 
            href="#home" 
            onMouseEnter={() => setHoveredBackToTop(true)} 
            onMouseLeave={() => setHoveredBackToTop(false)}
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "10px", 
              fontFamily: "'Courier New', monospace", 
              fontSize: "10px", 
              letterSpacing: "2.5px", 
              color: hoveredBackToTop ? "#a3e635" : "#777", 
              textDecoration: "none", 
              transition: "color 0.25s" 
            }}
          >
            BACK TO TOP
            <span style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center", 
              width: 32, 
              height: 32, 
              borderRadius: "10px", 
              border: `1px solid ${hoveredBackToTop ? "rgba(163,230,53,0.4)" : "#1c1c1c"}`, 
              background: hoveredBackToTop ? "rgba(163,230,53,0.06)" : "transparent", 
              fontSize: "14px", 
              fontWeight: 800,
              transform: hoveredBackToTop ? "translateY(-3px)" : "translateY(0)", 
              boxShadow: hoveredBackToTop ? "0 5px 15px rgba(163,230,53,0.15)" : "none",
              transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)" 
            }}>
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
