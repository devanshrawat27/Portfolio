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
    <footer style={{
      backgroundColor: "#000000",
      backgroundImage: "linear-gradient(180deg, #050505 0%, #000000 100%)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top ambient glowing light beam */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(163,230,53,0.3) 25%, rgba(255,255,255,0.7) 50%, rgba(163,230,53,0.3) 75%, transparent 100%)",
        boxShadow: "0 0 24px rgba(163,230,53,0.3)",
      }} />
      
      {/* Soft background radial glow */}
      <div style={{
        position: "absolute",
        bottom: "-20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "900px",
        height: "320px",
        background: "radial-gradient(ellipse at 50% 100%, rgba(163,230,53,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(60px,8vw,90px) clamp(24px,5vw,80px) clamp(36px,4vw,56px)", position: "relative", zIndex: 1 }}>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(40px,6vw,64px)", marginBottom: "clamp(48px,6vw,72px)" }}>

          {/* Column 1: Brand & Role */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "2rem", fontWeight: 900, letterSpacing: "-1.5px", color: "#ffffff", marginBottom: "6px" }}>
              DEVANSH<span style={{ color: "#a3e635", textShadow: "0 0 12px rgba(163,230,53,0.6)" }}>.</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: "11px", color: "#a3e635", letterSpacing: "3px", fontWeight: 700, lineHeight: 1.6 }}>
              AI ENGINEER &amp; FULL STACK DEVELOPER
            </div>
            <div style={{
              width: "48px",
              height: "2px",
              background: "linear-gradient(90deg, #a3e635, transparent)",
              marginTop: "16px",
              borderRadius: "2px",
            }} />
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#a3e635",
              fontSize: "11px",
              letterSpacing: "3px",
              fontWeight: 800,
              margin: "0 0 22px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 6px #a3e635" }} />
              NAVIGATION
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                      color: isHovered ? "#ffffff" : "rgba(255,255,255,0.55)", 
                      fontSize: "14px", 
                      fontWeight: 500, 
                      textDecoration: "none", 
                      transform: isHovered ? "translateX(6px)" : "translateX(0)", 
                      transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <span style={{ 
                      width: isHovered ? 14 : 5, 
                      height: 1.5, 
                      background: isHovered ? "#a3e635" : "rgba(255,255,255,0.2)", 
                      borderRadius: "1px",
                      boxShadow: isHovered ? "0 0 8px #a3e635" : "none",
                      transition: "all 0.25s ease", 
                      flexShrink: 0,
                    }} />
                    <span style={{ color: isHovered ? "#a3e635" : "inherit", transition: "color 0.25s" }}>{label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#a3e635",
              fontSize: "11px",
              letterSpacing: "3px",
              fontWeight: 800,
              margin: "0 0 22px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 6px #a3e635" }} />
              GET IN TOUCH
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {[
                { label: "Email", value: "devanshdevr@gmail.com", href: "mailto:devanshdevr@gmail.com" },
                { label: "Location", value: "Dehradun, India" },
                { label: "University", value: "Graphic Era Hill University" },
              ].map(({ label, value, href }) => {
                const isHovered = hoveredContact === label;
                return (
                  <div key={label}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#64748b", fontSize: "9.5px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "5px" }}>{label}</div>
                    {href ? (
                      <a 
                        href={href} 
                        onMouseEnter={() => setHoveredContact(label)} 
                        onMouseLeave={() => setHoveredContact(null)} 
                        style={{ 
                          color: isHovered ? "#a3e635" : "#e2e8f0", 
                          fontSize: "14px", 
                          fontWeight: 600, 
                          textDecoration: "none", 
                          transition: "all 0.2s ease", 
                          borderBottom: isHovered ? "1px solid rgba(163,230,53,0.6)" : "1px solid transparent",
                          paddingBottom: "2px",
                          display: "inline-block",
                        }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>{value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Clean subtle divider */}
        <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(163,230,53,0.2) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)", marginBottom: "32px" }} />

        {/* Bottom Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          
          {/* Copyright */}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#64748b", letterSpacing: "0.2px" }}>
            © {year} <span style={{ color: "#94a3b8", fontWeight: 600 }}>Devansh Rawat</span>. Crafted with ❤️ &amp; ☕
          </div>

          {/* Social Icons - Frosted Glass Squircles */}
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
                    width: 40, 
                    height: 40, 
                    borderRadius: "12px", 
                    border: `1px solid ${isHovered ? "rgba(163,230,53,0.45)" : "rgba(255,255,255,0.08)"}`, 
                    background: isHovered 
                      ? "linear-gradient(135deg, rgba(163,230,53,0.12) 0%, rgba(163,230,53,0.02) 100%)" 
                      : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", 
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: isHovered ? "#a3e635" : "#94a3b8", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    textDecoration: "none", 
                    transform: isHovered ? "translateY(-3px)" : "translateY(0)", 
                    boxShadow: isHovered ? "0 0 20px rgba(163,230,53,0.2), inset 0 1px 1px rgba(255,255,255,0.2)" : "none",
                    transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {icon}
                </a>
              );
            })}
          </div>

          {/* Back to Top button - Ultra-Premium Frosted Capsule */}
          <a 
            href="#home" 
            onClick={(e) => {
              if (window.__lenis) {
                e.preventDefault();
                window.__lenis.scrollTo(0, { duration: 1.4 });
              }
            }}
            onMouseEnter={() => setHoveredBackToTop(true)} 
            onMouseLeave={() => setHoveredBackToTop(false)}
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "10px", 
              fontFamily: "'JetBrains Mono', monospace", 
              fontSize: "10.5px", 
              fontWeight: 700,
              letterSpacing: "1.5px", 
              color: hoveredBackToTop ? "#a3e635" : "#94a3b8", 
              textDecoration: "none", 
              padding: "7px 18px",
              borderRadius: "100px",
              background: hoveredBackToTop
                ? "linear-gradient(135deg, rgba(163,230,53,0.12) 0%, rgba(163,230,53,0.02) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${hoveredBackToTop ? "rgba(163,230,53,0.4)" : "rgba(255,255,255,0.1)"}`,
              boxShadow: hoveredBackToTop ? "0 0 20px rgba(163,230,53,0.2)" : "0 2px 8px rgba(0,0,0,0.3)",
              transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <span>BACK TO TOP</span>
            <span style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center", 
              width: 22, 
              height: 22, 
              borderRadius: "50%", 
              background: hoveredBackToTop ? "#a3e635" : "rgba(255,255,255,0.08)",
              color: hoveredBackToTop ? "#000" : "#fff",
              fontSize: "12px", 
              fontWeight: 800,
              transform: hoveredBackToTop ? "translateY(-2px)" : "translateY(0)", 
              transition: "all 0.25s ease",
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
