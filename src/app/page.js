"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [experience, setExperience] = useState([])
  const [showHero, setShowHero] = useState(true)
  const [showDevZone, setShowDevZone] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [projectsData, experienceData] = await Promise.all([
        fetch("/api/github-projects").then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok for GitHub projects")
          }
          return res.json()
        }),
        fetch("/api/notion-experience").then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok for Notion experience")
          }
          return res.json()
        }),
      ])
      setProjects(projectsData)
      setExperience(experienceData)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const scrollToSection = (id) => {
    setShowHero(false)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
      }
    }, 100)
  }

  const refreshAPIs = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  // Dev zone toggle 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault()
        setShowDevZone(!showDevZone)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showDevZone])

  // Tech stack data 
  const technologies = [
    {
      category: "Frontend",
      skills: ["JavaScript", "React", "HTML & CSS", "Responsive Design"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "SQL & NoSQL Databases", "API Development"],
    },
    {
      category: "Tools & Methods",
      skills: ["Git & GitHub", "Agile Methodologies", "Version Control", "Web Development"],
    },
    {
      category: "Soft Skills",
      skills: ["Problem Solving", "Communication & Teamwork", "Continuous Learning"],
    },
  ]

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "white", fontSize: "1.25rem" }}>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#ef4444", fontSize: "1.25rem" }}>Error: {error}</div>
      </div>
    )
  }

  return (
    <div>
      {/* DEV ZONE */}
      {showDevZone && (
        <div className="dev-zone">
          <div className="dev-zone-content">
            <h3>🔧 Dev Zone</h3>
            <p>Press Ctrl+Shift+D to toggle this panel</p>
            <div className="dev-actions">
              <button className="btn btn-primary" onClick={refreshAPIs} disabled={refreshing}>
                {refreshing ? "Refreshing..." : "🔄 Refresh APIs"}
              </button>
              <div className="dev-stats">
                <p>Projects: {projects.length}</p>
                <p>Experience: {experience.length}</p>
                <p>Last Updated: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO OVERLAY */}
      {showHero && (
        <div className="hero-overlay">
          <div className="hero-card">
            <div className="hero-emoji">👨🏾‍💻</div>
            <h1 className="hero-title">Olushola Olateju</h1>
            <p className="hero-description">
              Computer Science student at the University of West London, aspiring Full Stack Developer with a passion for
              building elegant digital experiences. Proficient in modern web technologies and always eager to learn more.
            </p>
            <div className="hero-icons">
              <a href="https://github.com/olusholaolateju" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-outline btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </button>
              </a>
              <a href="https://linkedin.com/in/olushola-olateju" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-outline btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </a>
              <a href="mailto:olusholaolatejuuu@gmail.com">
                <button className="btn btn-outline btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" />
                  </svg>
                </button>
              </a>
            </div>
            <div className="hero-contact">
              <div className="hero-contact-item">
                <span>📞</span>
                <span>(+44)7764879835</span>
              </div>
              <div className="hero-contact-item">
                <span>✉️</span>
                <span>olusholaolatejuuu@gmail.com</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowHero(false)}>
              Find out more
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      {!showHero && (
        <>
          <header className="header">
            <div className="header-container">
              <nav className="nav">
                <button className="btn btn-ghost" onClick={() => scrollToSection("about")}>
                  About
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("education")}>
                  Education
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("experience")}>
                  Experience
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("projects")}>
                  Projects
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("skills")}>
                  Skills
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("contact")}>
                  Contact
                </button>
              </nav>
              <div className="nav-right">
                <a href="/cv.pdf" download="Olushola_Olateju_CV.pdf" className="btn btn-outline">
                  Resume
                </a>
              </div>
            </div>
          </header>

          <main>
            {/* ABOUT SECTION  */}
            <section id="about" className="about-section">
              <div className="about-content">
                <h1 className="about-title">Aspiring Full Stack Developer</h1>
                <p className="about-subtitle">
                  Building digital experiences with modern technologies. Computer Science student passionate about
                  creating elegant solutions to complex problems.
                </p>
                <div className="about-icons">
                  <a href="https://github.com/olusholaolateju" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-outline btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </button>
                  </a>
                  <a href="https://linkedin.com/in/olushola-olateju" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-outline btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                  </a>
                  <a href="mailto:olusholaolatejuuu@gmail.com">
                    <button className="btn btn-outline btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" />
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
            </section>

            {/* PROJECTS SECTION  */}
            <section id="projects" className="section">
              <h2 className="section-title">Projects</h2>
              <div className="grid grid-cols-1 grid-md-2 grid-lg-3">
                {projects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-image">💻</div>
                    <div className="card-content">
                      <h3
                        className="card-title"
                        style={{ color: "white", fontSize: "1.25rem", marginBottom: "0.5rem" }}
                      >
                        {project.name}
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "1rem" }}>
                        {project.description || "No description provided."}
                      </p>
                      <div className="project-tags">
                        {project.language && <span className="project-tag">{project.language}</span>}
                        <span className="project-tag">GitHub</span>
                        <span className="project-tag">Open Source</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TECH STACK SECTION */}
            <section id="skills" className="section">
              <h2 className="section-title">Tech Stack</h2>
              <div className="tech-stack-grid">
                {technologies.map((tech) => (
                  <div key={tech.category} className="tech-category">
                    <h3 className="tech-category-title">{tech.category}</h3>
                    <div className="tech-skills">
                      {tech.skills.map((skill) => (
                        <span key={skill} className="tech-skill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION SECTION */}
            <section id="education" className="section">
              <h2 className="section-title">Education</h2>
              <div className="grid grid-cols-1 grid-md-2 grid-lg-3">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">University of West London</h3>
                  </div>
                  <div className="card-content">
                    <p style={{ fontWeight: "500", marginBottom: "0.5rem", color: "white" }}>
                      BSc (Hons) Computer Science
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "0.5rem" }}>
                      Currently Studying; Expected Graduation: 2027
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)" }}>
                      Relevant Coursework: Data Structures, Algorithms, Web Development, Database Management
                    </p>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Just IT, Software Engineering Bootcamp</h3>
                  </div>
                  <div className="card-content">
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "0.5rem" }}>
                      Completed: 2023
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)" }}>
                      Skills Acquired: Full Stack Development, Agile Methodologies, Version Control with Git
                    </p>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Haringey Sixth Form College</h3>
                  </div>
                  <div className="card-content">
                    <p style={{ fontWeight: "500", marginBottom: "0.5rem", color: "white" }}>
                      A-Levels in Mathematics, Physics, and Computer Science
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "0.5rem" }}>
                      Graduated: 2021
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)" }}>
                      Participated in coding competitions (TeenTech Awards)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="section">
              <h2 className="section-title">Work Experience</h2>
              <div className="grid grid-cols-1 grid-md-2">
                {experience.map((exp) => {
                  const props = exp.properties || {}
                  const title = props.Project?.title?.[0]?.plain_text || "No Title"
                  const description = props.description?.rich_text?.[0]?.plain_text || "No Description"
                  const companyLink = props.link?.rich_text?.find((rt) => rt.href)?.href

                  return (
                    <div key={exp.id} className="card">
                      <div className="card-header">
                        <h3 className="card-title">{title}</h3>
                        {companyLink && (
                          <a
                            href={companyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                            style={{ fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
                            </svg>
                            View Company
                          </a>
                        )}
                      </div>
                      <div className="card-content">
                        <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>{description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="section">
              <h2 className="section-title">Get in Touch</h2>
              <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div className="card-content" style={{ paddingTop: "1.5rem" }}>
                  <p style={{ color: "rgba(255, 255, 255, 0.8)", marginBottom: "1rem" }}>
                    If you would like to get in touch, feel free to reach out via email or connect with me on{" "}
                    <a
                      href="https://www.linkedin.com/in/olushola-olateju/"
                      target="_blank"
                      className="contact-link"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                    .
                  </p>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <div className="contact-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--primary))">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" />
                      </svg>
                      <a href="mailto:olusholaolatejuuu@gmail.com" className="contact-link">
                        olusholaolatejuuu@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--primary))">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>(+44)7764879835</span>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="footer">
            <div className="footer-container">
              <p className="footer-text">© 2024 Olushola Olateju. All rights reserved.</p>
              <nav className="footer-nav">
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
                <a href="#" className="footer-link">
                  Privacy
                </a>
              </nav>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
