import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = ["Home", "About", "Projects", "Skills"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsExpanded(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showStatus = isScrolled && !isExpanded;

  return (
    <nav style={styles.navWrapper}>
      <motion.div
        layout
        onClick={() => isScrolled && setIsExpanded(!isExpanded)}
        style={styles.pillContainer}
        animate={{
          width: showStatus ? "280px" : "auto", // Width thodi badhayi hai
          padding: showStatus ? "10px 16px" : "12px 18px", // Padding boost
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Profile Box - Thoda bada kiya hai */}
        <div style={styles.profileBox}>
          <img src="/pass.jpg" alt="me" style={styles.profileImg} />
        </div>

        <AnimatePresence mode="wait">
          {!showStatus ? (
            <motion.div
              key="full-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.contentRow}
            >
              <div style={styles.linksContainer}>
                {navItems.map((item) => (
                  <div key={item} style={styles.linkWrapper}>
                    <motion.a
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActive(item);
                      }}
                      style={styles.link}
                      whileHover={{ color: "#a3e635" }} 
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.a>
                    {active === item && (
                      <motion.div layoutId="indicator" style={styles.activeDot} />
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Button - Bigger and bolder */}
              <motion.button 
                style={styles.contactBtn}
                whileHover={{ 
                  backgroundColor: "#a3e635", 
                  color: "#000",
                  scale: 1.05 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.hash = "#contact";
                }}
              >
                Contact
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="status-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.statusRow}
            >
              <span style={styles.statusText}>Available for work</span>
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                style={styles.blinkDot}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

const styles = {
  navWrapper: {
    position: 'fixed',
    top: '30px', // Thoda niche kiya hai top se
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 9999,
  },
  pillContainer: {
    backgroundColor: 'rgba(13, 13, 13, 0.92)',
    backdropFilter: 'blur(15px)',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    border: '1.5px solid #222',
    cursor: 'pointer',
    boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
  },
  profileBox: { 
    width: '42px', // Size up from 34px
    height: '42px', 
    borderRadius: '50%', 
    overflow: 'hidden', 
    flexShrink: 0,
    border: '1px solid #333'
  },
  profileImg: { width: '100%', height: '100%', objectFit: 'cover' },
  contentRow: { display: 'flex', alignItems: 'center', gap: '30px' }, // Gap badhaya
  linksContainer: { display: 'flex', gap: '10px' },
  linkWrapper: { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  link: { 
    color: '#999', 
    textDecoration: 'none', 
    fontSize: '17px', // Size up from 14px
    fontWeight: '600', // Bolder
    padding: '10px 15px',
  },
  activeDot: { 
    width: '6px', 
    height: '6px', 
    backgroundColor: '#a3e635', 
    borderRadius: '50%', 
    position: 'absolute', 
    bottom: '0px' 
  },
  contactBtn: { 
    backgroundColor: '#fff', 
    color: '#000', 
    border: 'none', 
    padding: '12px 28px', // Padding boost
    borderRadius: '100px', 
    fontSize: '16px', // Size up from 14px
    fontWeight: '700', // Extra Bold
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  statusRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  statusText: { 
    color: '#fff', 
    fontSize: '16px', // Bigger status text
    fontWeight: '500' 
  },
  blinkDot: { 
    width: '10px', 
    height: '10px', 
    backgroundColor: '#00ff88', 
    borderRadius: '50%', 
    boxShadow: '0 0 15px #00ff88' 
  }
};

export default Navbar;