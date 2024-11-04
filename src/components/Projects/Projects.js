// src/components/Projects/Projects.js
import React, { useState, useEffect } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "SACCO Management System",
      description: "A comprehensive system for managing savings and credit cooperatives with features for member management, loan processing, and financial tracking.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      category: "full-stack",
      liveLink: "#",
      githubLink: "#",
      features: [
        "User authentication and authorization",
        "Real-time transaction tracking",
        "Loan management system",
        "Financial reporting and analytics",
        "Member portal"
      ]
    },
    {
      id: 2,
      title: "Machine Learning Portfolio",
      description: "Collection of data science and machine learning projects showcasing predictive analysis and data visualization.",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
      category: "data-science",
      liveLink: "#",
      githubLink: "#",
      features: [
        "Predictive modeling",
        "Data visualization",
        "Statistical analysis",
        "Machine learning algorithms"
      ]
    },
    {
      id: 3,
      title: "IoT Home Automation",
      description: "Smart home automation system using IoT devices and sensors for remote monitoring and control.",
      image: "/api/placeholder/600/400",
      technologies: ["Arduino", "Raspberry Pi", "MQTT", "React"],
      category: "iot",
      liveLink: "#",
      githubLink: "#",
      features: [
        "Real-time monitoring",
        "Remote device control",
        "Energy consumption tracking",
        "Automated scheduling"
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'full-stack', label: 'Full Stack' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'iot', label: 'IoT' }
  ];

  useEffect(() => {
    filterProjects(activeFilter);
  }, [activeFilter]);

  const filterProjects = (category) => {
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">
          <span className="highlight">Featured</span> Projects
        </h2>

        {/* Filter Buttons */}
        <div className="filter-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
              {activeFilter === category.id && <div className="btn-background" />}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-preview">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveLink} className="project-link" target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                  <a href={project.githubLink} className="project-link" target="_blank" rel="noopener noreferrer">
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProject(null)}>×</button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="modal-info">
              <h2>{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.description}</p>
              <div className="modal-features">
                <h3>Key Features</h3>
                <ul>
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-tech">
                <h3>Technologies Used</h3>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="modal-links">
                <a href={selectedProject.liveLink} className="modal-link" target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
                <a href={selectedProject.githubLink} className="modal-link" target="_blank" rel="noopener noreferrer">
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="decoration-grid">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="decoration-cell">
            <div className="cell-content" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;