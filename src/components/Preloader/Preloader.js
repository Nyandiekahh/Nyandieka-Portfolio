// src/components/Preloader/Preloader.js
import React, { useEffect, useRef } from 'react';
import './Preloader.css';

const Preloader = () => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const progress = progressRef.current;
    const text = textRef.current;

    let progressValue = 0;
    const totalProgress = 100;
    const speed = 50; // Lower value = faster progress

    const updateProgress = () => {
      if (progressValue < totalProgress) {
        progressValue++;
        if (progress) progress.style.width = `${progressValue}%`;
        if (text) text.textContent = `${progressValue}%`;
        
        // Slow down near certain percentages for dramatic effect
        const timeout = progressValue === 30 || progressValue === 60 || progressValue === 85 
          ? 200 
          : speed;
        
        setTimeout(updateProgress, timeout);
      } else {
        // Add completion class for outro animation
        if (loader) loader.classList.add('complete');
      }
    };

    // Start progress after initial delay
    setTimeout(updateProgress, 500);
  }, []);

  return (
    <div className="preloader" ref={loaderRef}>
      <div className="loader-content">
        {/* Animated Logo */}
        <div className="loader-logo">
          <div className="logo-circle">
            <span className="logo-text">Nyandieka</span>
            <div className="logo-rings">
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="loader-progress">
          <div className="progress-bar">
            <div className="progress-fill" ref={progressRef}></div>
          </div>
          <div className="progress-text" ref={textRef}>0%</div>
        </div>

        {/* Loading Messages */}
        <div className="loader-messages">
          <div className="message-scroll">
            <span>Initializing Systems</span>
            <span>Loading Modules</span>
            <span>Establishing Connection</span>
            <span>Preparing Canvas</span>
            <span>Almost Ready</span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="loader-particles">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="particle"></div>
          ))}
        </div>

        {/* Corner Decorations */}
        <div className="loader-corners">
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
        </div>

        {/* Tech Lines */}
        <div className="tech-lines">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="tech-line">
              <div className="line-fill"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;