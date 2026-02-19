import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navItems = ["Home", "About", "Projects", "Skills"];

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

  const showStatus = isScrolled && !isExpanded;

  // MOBILE NAV
  if (isMobile) {
    return (
      <>
        <nav style={{
          position: "fixed", top: "16px",   left: "50%",                 
          transform: "translateX(-120%)", 
          display: "flex", justifyContent: "center", zIndex: 9999,
        }}>
          <div style={{
            backgroundColor: "rgba(13,13,13,0.95)",
            backdropFilter: "blur(15px)",
            borderRadius: "100px",
            display: "flex", alignItems: "center",
            gap: "10px", padding: "8px 14px",
            border: "1px solid #222",
            boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
          }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "1px solid #333" }}>
              <img src="/pass.jpg" alt="me" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <AnimatePresence mode="wait">
              {showStatus ? (
                <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>Available for work</span>
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}
                    style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635" }} />
                </motion.div>
              ) : (
                <motion.div key="brand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "1px" }}>
                  DEVANSH<span style={{ color: "#a3e635" }}>.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: menuOpen ? "#a3e635" : "rgba(255,255,255,0.08)",
              border: "none", borderRadius: "50%",
              width: "36px", height: "36px",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "4px",
              cursor: "pointer",
            }}>
              <span style={{ width: 16, height: 1.5, background: menuOpen ? "#000" : "#fff", borderRadius: 1, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none" }} />
              <span style={{ width: 16, height: 1.5, background: menuOpen ? "#000" : "#fff", borderRadius: 1, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: 16, height: 1.5, background: menuOpen ? "#000" : "#fff", borderRadius: 1, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none" }} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: "fixed", top: "76px", left: "16px", right: "16px",
                backgroundColor: "rgba(10,10,10,0.98)",
                backdropFilter: "blur(20px)",
                borderRadius: "20px", padding: "20px",
                border: "1px solid #222", zIndex: 9998,
                boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              }}
            >
              {navItems.map((item, i) => (
                <motion.a key={item} href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => { setActive(item); setMenuOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "14px 8px",
                    borderBottom: i < navItems.length - 1 ? "1px solid #111" : "none",
                    textDecoration: "none",
                    color: active === item ? "#a3e635" : "#aaa",
                    fontSize: "16px", fontWeight: 600,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: active === item ? "#a3e635" : "#333", flexShrink: 0 }} />
                  {item}
                </motion.a>
              ))}
              <a href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block", marginTop: "14px",
                  background: "#a3e635", color: "#000",
                  textAlign: "center", padding: "13px",
                  borderRadius: "100px", fontSize: "14px", fontWeight: 800,
                  textDecoration: "none", letterSpacing: "1px",
                }}>
                Contact →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // DESKTOP NAV
  return (
    <nav style={{ position: "fixed", top: "30px", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 9999 }}>
      <motion.div
        layout
        onClick={() => isScrolled && setIsExpanded(!isExpanded)}
        style={{
          backgroundColor: "rgba(13,13,13,0.92)", backdropFilter: "blur(15px)",
          borderRadius: "100px", display: "flex", alignItems: "center",
          gap: "15px", border: "1.5px solid #222", cursor: "pointer",
          boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
        }}
        animate={{ width: showStatus ? "280px" : "auto", padding: showStatus ? "10px 16px" : "12px 18px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div style={{ width: "42px", height: "42px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1px solid #333" }}>
          <img src="/pass.jpg" alt="me" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <AnimatePresence mode="wait">
          {!showStatus ? (
            <motion.div key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                {navItems.map(item => (
                  <div key={item} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <motion.a href={`#${item.toLowerCase()}`}
                      onClick={e => { e.stopPropagation(); setActive(item); }}
                      style={{ color: "#999", textDecoration: "none", fontSize: "17px", fontWeight: 600, padding: "10px 15px" }}
                      whileHover={{ color: "#a3e635" }}>
                      {item}
                    </motion.a>
                    {active === item && <motion.div layoutId="indicator" style={{ width: 6, height: 6, backgroundColor: "#a3e635", borderRadius: "50%", position: "absolute", bottom: 0 }} />}
                  </div>
                ))}
              </div>
              <motion.button
                style={{ backgroundColor: "#fff", color: "#000", border: "none", padding: "12px 28px", borderRadius: "100px", fontSize: "16px", fontWeight: 700, cursor: "pointer" }}
                whileHover={{ backgroundColor: "#a3e635", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={e => { e.stopPropagation(); window.location.hash = "#contact"; }}>
                Contact
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>Available for work</span>
              <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}
                style={{ width: 10, height: 10, backgroundColor: "#00ff88", borderRadius: "50%", boxShadow: "0 0 15px #00ff88" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;