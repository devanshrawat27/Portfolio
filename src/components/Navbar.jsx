import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = ["Home", "About", "Experience", "Projects", "Skills"];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      if (window.scrollY <= 80) { setIsExpanded(false); setMenuOpen(false); }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("resize", handleResize); };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (window.__lenis) {
      if (el) {
        window.__lenis.scrollTo(el, { offset: -30, duration: 1.2 });
      } else if (id === 'home') {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      }
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showStatus = isScrolled && !isExpanded;

  // ─── MOBILE NAV ──────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <nav style={{
          position: "fixed", top: "16px", left: 0, right: 0,
          display: "flex", justifyContent: "center", zIndex: 9999,
          pointerEvents: "none",
        }}>
          <div style={{
            pointerEvents: "auto",
            backgroundColor: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            borderRadius: "100px",
            display: "flex", alignItems: "center",
            gap: "10px", padding: "8px 14px",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
              <img src="/pass.png" alt="me" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <AnimatePresence mode="wait">
              {showStatus ? (
                <motion.div key="status" initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.3 }}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.5px" }}>Available for work</span>
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px rgba(163,230,53,0.6)" }} />
                </motion.div>
              ) : (
                <motion.div key="brand" initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.3 }}
                  style={{ color: "#fff", fontSize: "13px", fontWeight: 600, letterSpacing: "2px", fontFamily: "'Inter', sans-serif" }}>
                  DEVANSH<span style={{ color: "#a3e635" }}>.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: menuOpen ? "#a3e635" : "rgba(255,255,255,0.06)",
              border: "none", borderRadius: "50%",
              width: "36px", height: "36px",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "4px",
              cursor: "pointer", transition: "background 0.3s ease",
            }}>
              <span style={{ width: 14, height: 1.5, background: menuOpen ? "#000" : "rgba(255,255,255,0.7)", borderRadius: 1, transition: "all 0.3s cubic-bezier(0.76,0,0.24,1)", transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none" }} />
              <span style={{ width: 14, height: 1.5, background: menuOpen ? "#000" : "rgba(255,255,255,0.7)", borderRadius: 1, transition: "all 0.3s cubic-bezier(0.76,0,0.24,1)", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: 14, height: 1.5, background: menuOpen ? "#000" : "rgba(255,255,255,0.7)", borderRadius: 1, transition: "all 0.3s cubic-bezier(0.76,0,0.24,1)", transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none" }} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: "fixed", top: "72px", left: "14px", right: "14px",
                maxWidth: "calc(100vw - 28px)",
                margin: "0 auto",
                backgroundColor: "rgba(10,10,10,0.96)",
                backdropFilter: "blur(30px) saturate(180%)",
                WebkitBackdropFilter: "blur(30px) saturate(180%)",
                borderRadius: "24px", padding: "8px",
                border: "1px solid rgba(255,255,255,0.08)", zIndex: 9998,
                boxShadow: "0 24px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {navItems.map((item, i) => (
                <motion.a key={item} href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.76, 0, 0.24, 1] }}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(item);
                    setMenuOpen(false);
                    scrollToSection(item.toLowerCase());
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "16px 16px",
                    borderRadius: "16px",
                    textDecoration: "none",
                    color: active === item ? "#fff" : "rgba(255,255,255,0.45)",
                    fontSize: "15px", fontWeight: 500,
                    letterSpacing: "0.3px",
                    background: active === item ? "rgba(255,255,255,0.04)" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: active === item ? "#a3e635" : "rgba(255,255,255,0.15)",
                    boxShadow: active === item ? "0 0 8px rgba(163,230,53,0.4)" : "none",
                    flexShrink: 0, transition: "all 0.3s ease",
                  }} />
                  {item}
                </motion.a>
              ))}
              <a href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  scrollToSection('contact');
                }}
                style={{
                  display: "block", marginTop: "8px",
                  background: "#a3e635", color: "#000",
                  textAlign: "center", padding: "14px",
                  borderRadius: "16px", fontSize: "13px", fontWeight: 700,
                  textDecoration: "none", letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}>
                Get in Touch
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ─── DESKTOP NAV ─────────────────────────────────────────
  return (
    <nav style={{ position: "fixed", top: "24px", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 9999 }}>
      <motion.div
        layout
        onClick={() => isScrolled && setIsExpanded(!isExpanded)}
        style={{
          backgroundColor: "rgba(10,10,10,0.6)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderRadius: "100px",
          display: "flex", alignItems: "center",
          gap: "8px",
          border: "1px solid rgba(255,255,255,0.06)",
          cursor: isScrolled ? "pointer" : "default",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        animate={{
          padding: showStatus ? "6px 10px 6px 6px" : "8px 8px 8px 8px",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        {/* Avatar */}
        <motion.div
          layout
          style={{
            width: "38px", height: "38px", borderRadius: "50%",
            overflow: "hidden", flexShrink: 0,
            border: "1.5px solid rgba(255,255,255,0.08)",
          }}
        >
          <img src="/pass.png" alt="me" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>

        <AnimatePresence mode="wait">
          {!showStatus ? (
            <motion.div
              key="full"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              {/* Nav Links */}
              <div style={{ display: "flex", alignItems: "center", gap: "0px", position: "relative" }}>
                {navItems.map(item => {
                  const isActive = active === item;
                  const isHovered = hoveredItem === item;
                  return (
                    <div
                      key={item}
                      style={{ position: "relative" }}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* Hover background pill */}
                      {isHovered && (
                        <motion.div
                          layoutId="navHoverBg"
                          style={{
                            position: "absolute",
                            inset: "4px 0",
                            borderRadius: "100px",
                            background: "rgba(255,255,255,0.06)",
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      <motion.a
                        href={`#${item.toLowerCase()}`}
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActive(item);
                          scrollToSection(item.toLowerCase());
                        }}
                        style={{
                          color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                          textDecoration: "none",
                          fontSize: "14px",
                          fontWeight: 500,
                          padding: "10px 18px",
                          position: "relative",
                          zIndex: 1,
                          letterSpacing: "0.2px",
                          transition: "color 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                        whileHover={{ color: "#fff" }}
                      >
                        {item}
                        {/* Active dot */}
                        {isActive && (
                          <motion.div
                            layoutId="activeDot"
                            style={{
                              width: 4, height: 4,
                              backgroundColor: "#a3e635",
                              borderRadius: "50%",
                              boxShadow: "0 0 6px rgba(163,230,53,0.5)",
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                      </motion.a>
                    </div>
                  );
                })}
              </div>

              {/* Separator line */}
              <div style={{
                width: "1px", height: "20px",
                background: "rgba(255,255,255,0.08)",
                margin: "0 4px",
                flexShrink: 0,
              }} />

              {/* Contact button */}
              <motion.button
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "10px 24px",
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.18)",
                  transition: "all 0.3s ease",
                }}
                whileHover={{
                  background: "#a3e635",
                  color: "#000",
                  border: "1px solid #a3e635",
                  boxShadow: "0 0 24px rgba(163,230,53,0.45)",
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToSection('contact');
                }}
              >
                Contact
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="status"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", alignItems: "center", gap: "12px", paddingRight: "4px" }}
            >
              {/* Name / Brand */}
              <span style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "1.5px",
                fontFamily: "'Inter', sans-serif",
              }}>DR<span style={{ color: "#a3e635" }}>.</span></span>

              {/* Separator */}
              <div style={{
                width: "1px", height: "16px",
                background: "rgba(255,255,255,0.1)",
              }} />

              {/* Status badge - Ultra Premium Live Beacon Pill */}
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, rgba(163,230,53,0.14) 0%, rgba(163,230,53,0.03) 100%)",
                padding: "6px 14px 6px 11px",
                borderRadius: "100px",
                border: "1px solid rgba(163,230,53,0.38)",
                boxShadow: "0 0 20px rgba(163,230,53,0.15), inset 0 1px 1px rgba(255,255,255,0.25)",
                backdropFilter: "blur(14px)",
              }}>
                {/* Pulsing ring dot */}
                <div style={{ position: "relative", width: "8px", height: "8px", flexShrink: 0 }}>
                  <motion.div
                    animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{
                      position: "absolute", inset: "-3px",
                      borderRadius: "50%",
                      backgroundColor: "#a3e635",
                    }}
                  />
                  <div style={{
                    width: "8px", height: "8px",
                    backgroundColor: "#a3e635",
                    borderRadius: "50%",
                    boxShadow: "0 0 10px #a3e635",
                  }} />
                </div>
                <span style={{
                  color: "#c6f567",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.6px",
                  whiteSpace: "nowrap",
                  fontFamily: "'JetBrains Mono', 'Inter', monospace",
                }}>Open to work</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;