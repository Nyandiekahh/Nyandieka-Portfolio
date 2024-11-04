import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const particlesRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const particlesArray = useRef([]);

  useEffect(() => {
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = `rgba(255, 255, 255, ${this.opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        const dx = this.x - cursorRef.current.x;
        const dy = this.y - cursorRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * 1;
          this.y += Math.sin(angle) * 1;
          this.opacity = Math.min(0.8, this.opacity + 0.1);
          this.color = `rgba(255, 255, 255, ${this.opacity})`;
        } else {
          this.opacity = Math.max(0.1, this.opacity - 0.02);
          this.color = `rgba(255, 255, 255, ${this.opacity})`;
        }
      }

      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      for (let i = 0; i < 150; i++) {
        particlesArray.current.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesArray.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      cursorRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    initParticles();
    animate();
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCV = () => {
    window.open('https://nyandiekahh.github.io/Nyandieka%20Updated%20CV.pdf', '_blank');
  };

  return (
    <section className="hero">
      <canvas ref={particlesRef} className="particles-canvas" />
      
      <div className="hero-content">
        <div className="intro-text">
          <span className="greeting">Hello, I'm</span>
          <h1 className="glitch-name" data-text="Einstein Nyandieka">
            Einstein Nyandieka
          </h1>
          <div className="title-container">
            <div className="sliding-titles">
              <span>Mechatronics Engineer</span>
              <span>Full Stack Developer</span>
              <span>ML Enthusiast</span>
              <span>Problem Solver</span>
            </div>
          </div>
        </div>

        <p className="bio-text">
          Crafting digital experiences & engineering solutions
          <span className="highlight-dot">.</span>
          <span className="highlight-dot">.</span>
          <span className="highlight-dot">.</span>
        </p>

        <div className="cta-container">
          <button className="cta-button primary" onClick={handleViewProjects}>
            <span className="button-text">View Projects</span>
            <span className="button-icon">→</span>
          </button>
          <button className="cta-button secondary" onClick={handleOpenCV}>
            <span className="button-text">View CV</span>
            <span className="button-icon">↓</span>
          </button>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </div>

      <div className="hero-decoration">
        <div className="floating-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
        </div>
        <div className="tech-line">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="tech-dot"></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;