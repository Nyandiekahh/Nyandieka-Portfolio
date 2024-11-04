// src/components/Skills/Skills.js
import React, { useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const skillsRef = useRef(null);

  const skillCategories = {
    "Frontend Development": {
      icon: "🎨",
      skills: [
        { name: "React.js", level: 90 },
        { name: "HTML5/CSS3", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "Responsive Design", level: 85 },
        { name: "UI/UX Principles", level: 80 }
      ]
    },
    "Backend Development": {
      icon: "⚙️",
      skills: [
        { name: "Python", level: 85 },
        { name: "Django", level: 80 },
        { name: "Flask", level: 75 },
        { name: "Express.js", level: 85 },
        { name: "RESTful APIs", level: 90 }
      ]
    },
    "Data Science & ML": {
      icon: "🤖",
      skills: [
        { name: "Machine Learning", level: 75 },
        { name: "Data Analysis", level: 85 },
        { name: "Python Libraries", level: 80 },
        { name: "Statistical Analysis", level: 75 },
        { name: "Data Visualization", level: 85 }
      ]
    },
    "Engineering": {
      icon: "🔧",
      skills: [
        { name: "Mechatronics", level: 90 },
        { name: "Robotics", level: 85 },
        { name: "CAD Design", level: 80 },
        { name: "IoT Systems", level: 75 },
        { name: "Control Systems", level: 85 }
      ]
    },
    "Other Technologies": {
      icon: "🛠️",
      skills: [
        { name: "Git & Version Control", level: 90 },
        { name: "AWS Cloud Services", level: 80 },
        { name: "Docker", level: 75 },
        { name: "Database Management", level: 85 },
        { name: "System Architecture", level: 80 }
      ]
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillElements = document.querySelectorAll('.skill-category, .skill-progress');
    skillElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Radar Chart Data for Overall Skills
  const radarPoints = [
    { name: "Frontend", value: 88 },
    { name: "Backend", value: 83 },
    { name: "Data Science", value: 78 },
    { name: "Engineering", value: 85 },
    { name: "DevOps", value: 80 }
  ];

  // Calculate radar chart coordinates
  const getRadarCoordinates = (points, radius) => {
    const coordinates = [];
    const angleStep = (Math.PI * 2) / points.length;

    points.forEach((point, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const value = point.value / 100;
      coordinates.push({
        x: radius + Math.cos(angle) * radius * value,
        y: radius + Math.sin(angle) * radius * value,
        label: point.name,
        value: point.value
      });
    });

    return coordinates;
  };

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="skills-container">
        <h2 className="section-title">
          <span className="tech-text">Technical</span> Skills
        </h2>

        {/* Radar Chart */}
        <div className="radar-chart-container">
          <div className="radar-chart">
            {[...Array(5)].map((_, i) => (
              <div 
                key={`ring-${i}`} 
                className="radar-ring"
                style={{ opacity: (i + 1) * 0.2 }}
              />
            ))}
            <svg 
              viewBox="0 0 200 200" 
              className="radar-svg"
            >
              {getRadarCoordinates(radarPoints, 100).map((point, index, arr) => (
                <React.Fragment key={`radar-${index}`}>
                  <line 
                    x1="100" 
                    y1="100" 
                    x2={point.x} 
                    y2={point.y} 
                    className="radar-line"
                  />
                  {index < arr.length - 1 && (
                    <line 
                      x1={point.x} 
                      y1={point.y} 
                      x2={arr[index + 1].x} 
                      y2={arr[index + 1].y} 
                      className="radar-line"
                    />
                  )}
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="4" 
                    className="radar-point" 
                  />
                  <text 
                    x={point.x} 
                    y={point.y} 
                    dy="-10"
                    className="radar-label"
                  >
                    {point.label}
                  </text>
                </React.Fragment>
              ))}
            </svg>
          </div>
        </div>

        {/* Detailed Skills */}
        <div className="skills-grid">
          {Object.entries(skillCategories).map(([category, { icon, skills }]) => (
            <div key={category} className="skill-category">
              <div className="category-header">
                <span className="category-icon">{icon}</span>
                <h3>{category}</h3>
              </div>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-progress-bg">
                      <div 
                        className="skill-progress"
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <div className="progress-glow"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <div className="tech-stack-grid">
          {Object.keys(skillCategories).map((category) => (
            <div key={category} className="tech-card">
              <div className="card-content">
                <div className="card-front">
                  <span className="card-icon">{skillCategories[category].icon}</span>
                  <h4>{category}</h4>
                </div>
                <div className="card-back">
                  <ul>
                    {skillCategories[category].skills.map(skill => (
                      <li key={skill.name}>{skill.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="skills-decoration">
        <div className="floating-circles">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="floating-circle" />
          ))}
        </div>
        <div className="tech-lines">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="tech-line" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;