import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Preloader from "./components/preloader";

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/contact';
import Footer from "./components/footer";
import SectionTransition from "./components/SectionTransition";
import ProjectGallery from "./components/ProjectGallery";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState(() =>
    typeof window !== 'undefined' && window.location.hash === '#gallery' ? 'gallery' : 'home'
  );

  // Initialize Lenis ultra-smooth inertial scrolling
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false,
    });

    window.__lenis = lenis;

    if (!window.location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Sync resize when loading completes or view changes
  useEffect(() => {
    if (!loading && window.__lenis) {
      const timer = setTimeout(() => {
        window.__lenis?.resize();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [loading, currentView]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#gallery') {
        setCurrentView('gallery');
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else {
        setCurrentView('home');
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              if (window.__lenis) {
                window.__lenis.scrollTo(el, { offset: -30, duration: 1.2 });
              } else {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 150);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleReturnToPortfolio = () => {
    window.location.hash = '#projects';
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -30, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 150);
  };

  return (
    <>
      {/* PRELOADER: Curved SVG curtain overlay that physically reveals the site */}
      <AnimatePresence>
        {loading && (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* MAIN VIEW: Pre-rendered underneath the curtain */}
      <AnimatePresence mode="wait">
        {currentView === 'gallery' ? (
          <motion.div
            key="gallery-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            style={{ background: '#050505', minHeight: '100vh' }}
          >
            <CursorGlow />
            <Cursor />
            <Navbar />
            <ProjectGallery onBack={handleReturnToPortfolio} />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio-view"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ background: '#050505', minHeight: '100vh' }}
          >
            <CursorGlow />
            <Cursor />
            <Navbar />

            <main style={{ overflow: 'visible' }}>
              <Hero />

              <SectionTransition offset={70} index={1}>
                <About />
              </SectionTransition>

              <SectionTransition offset={75} index={2}>
                <Experience />
              </SectionTransition>

              <SectionTransition offset={80} index={3}>
                <Projects />
              </SectionTransition>

              <SectionTransition offset={70} index={4}>
                <Skills />
              </SectionTransition>

              <SectionTransition offset={60} index={4}>
                <Contact />
              </SectionTransition>

              <SectionTransition offset={40} index={5}>
                <Footer />
              </SectionTransition>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
