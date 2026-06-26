import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Preloader from "./components/preloader";

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/contact';
import Footer from "./components/footer";
import SectionTransition from "./components/SectionTransition";


function App() {

  const [loading, setLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">

      {/* PRELOADER */}
      {loading && (
        <Preloader key="preloader" onComplete={() => setLoading(false)} />
      )}


      {/* MAIN PORTFOLIO */}
      {!loading && (

        <motion.div
          key="portfolio"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          style={{ background: '#050505', minHeight: '300vh' }}
        >

          <Cursor />
          <Navbar />

          <main style={{ overflow: 'visible' }}>

            <Hero />

            <SectionTransition offset={70} index={1}>
              <About />
            </SectionTransition>

            <SectionTransition offset={80} index={2}>
              <Projects />
            </SectionTransition>

            <SectionTransition offset={70} index={3}>
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
  );
}

export default App;
