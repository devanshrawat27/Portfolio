import React, { useState } from 'react';

import Preloader from "./components/preloader";

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/contact';
import Footer from "./components/footer";


function App() {

  const [loading, setLoading] = useState(true);

  return (
    <>

      {/* PRELOADER */}
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}


      {/* MAIN PORTFOLIO */}
      {!loading && (

        <div style={{ background: '#050505', minHeight: '300vh' }}>

          <Cursor />
          <Navbar />

          <main style={{ overflow: 'visible' }}>

            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <Footer />

          </main>

        </div>

      )}

    </>
  );
}

export default App;
