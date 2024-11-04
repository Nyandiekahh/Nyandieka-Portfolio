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
    const duration = 5000; // Match this with App.js setTimeout (3000ms)
    const minStepTime = 20; // Minimum time between updates
    const maxStepTime = 100; // Maximum time between updates

    const updateProgress = () => {
      // Calculate time per step to ensure we complete just before the duration
      const remainingTime = duration - (progressValue * duration / totalProgress);
      const remainingSteps = totalProgress - progressValue;
      let stepTime = remainingTime / remainingSteps;

      // Keep step time within bounds
      stepTime = Math.max(minStepTime, Math.min(stepTime, maxStepTime));

      // Add dramatic pauses
      const dramaticPauses = {
        30: 200,
        60: 200,
        85: 200
      };

      if (progressValue < totalProgress) {
        progressValue++;
        if (progress) progress.style.width = `${progressValue}%`;
        if (text) text.textContent = `${progressValue}%`;

        // Calculate next timeout
        const nextTimeout = dramaticPauses[progressValue] || stepTime;

        // If we're approaching the end, ensure we hit 100%
        if (progressValue >= 95) {
          const timeLeft = duration - (Date.now() - startTime);
          const stepsLeft = totalProgress - progressValue;
          if (stepsLeft > 0) {
            setTimeout(updateProgress, timeLeft / stepsLeft);
          }
        } else {
          setTimeout(updateProgress, nextTimeout);
        }
      }

      // Add completion class when done
      if (progressValue === totalProgress && loader) {
        loader.classList.add('complete');
      }
    };

    // Start time reference
    const startTime = Date.now();

    // Initial delay before starting
    setTimeout(updateProgress, 100);

    // Ensure we reach 100% by the end of duration
    const finalTimeout = setTimeout(() => {
      if (progressValue < totalProgress) {
        progressValue = totalProgress;
        if (progress) progress.style.width = '100%';
        if (text) text.textContent = '100%';
        if (loader) loader.classList.add('complete');
      }
    }, duration - 100); // Slightly before the App.js timeout

    return () => clearTimeout(finalTimeout);
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