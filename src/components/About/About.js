// src/components/About/About.js
import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = aboutRef.current.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="about-container">
        <h2 className="about-title animate-on-scroll">
          <span className="tech-glitch">About</span> Me
        </h2>
        
        <div className="about-grid">
          <div className="about-text-container animate-on-scroll">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>einstein_profile.exe</p>
            </div>
            <div className="terminal-content">
              <p className="typing-effect">
                <span className="terminal-prompt">→</span> Greetings! I'm Einstein Nyandieka
              </p>
              <p>
                <span className="highlight">Mechatronics Engineer</span> & 
                <span className="highlight">Full Stack Developer</span>
              </p>
            </div>
          </div>

          <div className="skills-showcase animate-on-scroll">
            <div className="rotating-cube">
              <div className="cube-face front">Frontend</div>
              <div className="cube-face back">Backend</div>
              <div className="cube-face right">ML/AI</div>
              <div className="cube-face left">DevOps</div>
              <div className="cube-face top">Data</div>
              <div className="cube-face bottom">Cloud</div>
            </div>
          </div>
        </div>

        <div className="journey-timeline animate-on-scroll">
          <h3 className="timeline-title">My Journey</h3>
          
          <div className="timeline-grid">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Mechatronics Engineering</h4>
                <p>JKUAT | 2021 - Present</p>
                <ul>
                  <li>Specializing in robotics and automation</li>
                  <li>Research in AI-driven mechanical systems</li>
                  <li>Leading technical projects</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Software Development</h4>
                <p>Moringa School Graduate</p>
                <ul>
                  <li>Full Stack Development</li>
                  <li>MERN Stack Specialist</li>
                  <li>Python & JavaScript Expert</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Data Science & ML</h4>
                <p>JKUAT Certification</p>
                <ul>
                  <li>Machine Learning Algorithms</li>
                  <li>Data Analysis & Visualization</li>
                  <li>Statistical Modeling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="tech-stack animate-on-scroll">
          <h3>Technical Arsenal</h3>
          <div className="tech-cards">
            <div className="tech-card">
              <div className="card-icon">🌐</div>
              <h4>Web Development</h4>
              <ul>
                <li>React & Node.js</li>
                <li>Express & Django</li>
                <li>HTML5/CSS3</li>
                <li>JavaScript/TypeScript</li>
              </ul>
            </div>

            <div className="tech-card">
              <div className="card-icon">🤖</div>
              <h4>Engineering</h4>
              <ul>
                <li>Robotics</li>
                <li>Automation</li>
                <li>CAD Design</li>
                <li>IoT Systems</li>
              </ul>
            </div>

            <div className="tech-card">
              <div className="card-icon">📊</div>
              <h4>Data Science</h4>
              <ul>
                <li>Python & R</li>
                <li>Machine Learning</li>
                <li>Data Analysis</li>
                <li>Visualization</li>
              </ul>
            </div>

            <div className="tech-card">
              <div className="card-icon">☁️</div>
              <h4>Cloud & DevOps</h4>
              <ul>
                <li>AWS Services</li>
                <li>CI/CD</li>
                <li>Docker</li>
                <li>Version Control</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="achievements animate-on-scroll">
          <h3>Key Achievements</h3>
          <div className="achievement-cards">
            <div className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <p>AIESEC Leadership Experience</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">📚</div>
              <p>ICDL Certification</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🌟</div>
              <p>AWS Cloud Practitioner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;