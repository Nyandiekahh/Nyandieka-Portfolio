// src/App.js
import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader/Preloader';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds loading time - adjust as needed
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </>
      )}
    </div>
  );
}

export default App;