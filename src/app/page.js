"use client";
import { useState, useEffect } from 'react';
import './style.css';
// Importing React hooks for state management and side effects
// Importing styles for the component

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [experience, setExperience] = useState([]);
  const [showHero, setShowHero] = useState(true);

  // State variables to hold projects, loading state, and error state
  // useState is used to manage state in functional components
  // useEffect is used to fetch data when the component mounts

useEffect(() => {
  Promise.all([
    fetch('/api/github-projects')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok for GitHub projects');
        }
        return res.json();
      }),
      // Fetching GitHub projects from the API
    // If the response is not OK, throw an error
    // If the response is OK, parse the JSON data 
    fetch('/api/notion-experience')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok for Notion experience');
        }
        return res.json();
      })
      // Fetching Notion experience from the API
  ])
  .then(([projectsData, experienceData]) => {
    setProjects(projectsData);
    setExperience(experienceData);
    setLoading(false);
    // Setting the projects and experience data to state
    // Setting loading to false to indicate data has been fetched
  })
  .catch(err => {
    setError(err.message);
    setLoading(false);
    // If there's an error, set the error message and loading to false
  });
}, []);

  const scrollToSection = (id) => {
    setShowHero(false); // Hide hero when navigating
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Wait for hero to hide
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // If loading, display a loading message
  // If there's an error, display the error message

  console.log('Experience data:', experience);
return (
  <div>
    {/* HERO OVERLAY: Only visible when showHero is true */}
    {showHero && (
      <div className="hero-overlay">
        <section className="hero-box">
          <div style={{ fontSize: "5rem", textAlign: "center", marginBottom: "1rem" }}>
        👨🏾‍💻
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Olushola Olateju</h1>
          <p style={{ marginBottom: 24 }}>
            Computer Science student at the University of West London, currently on track to graduate with First Class Honours
          </p>
          <div className="hero-icons">
            {/* ...your icons here... */}
          </div>
          <div className="hero-contact">
            <div>📞 (+44)7764879835</div>
            <div>✉️ olusholaolatejuuu@gmail.com</div>
          </div>
          <button style={{ marginTop: 32 }} onClick={() => setShowHero(false)}>
            Find out more
          </button>
        </section>
      </div>
    )}

    {/* MAIN CONTENT: Only visible when showHero is false */}
    {!showHero && (
      <>
        <header>
          <nav>
            <button onClick={() => scrollToSection('About Me')}>info</button>
            <button onClick={() => scrollToSection('Education')}>Education</button>
            <button onClick={() => scrollToSection('experience')}>Experience</button>
            <button onClick={() => scrollToSection('projects')}>Projects</button>
            <button onClick={() => scrollToSection('skills')}>Skills</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </nav>
        </header>
        <div className="fullpage-container">
          {/* ABOUT ME */}
          <section id="About Me">
            <div className="about-me-card">
              <h1>Olushola Olateju</h1>
              <h2>About Me</h2>
              <p>
                I am a Computer Science student at the University of West London, currently on track to graduate with First Class Honours.<br />
                I’m entering my second year and actively seeking internship or placement year opportunities where I can apply my technical skills, learn from experienced teams, and contribute to real-world projects.<br />
                I’ve built a range of personal and academic projects, including this self-updating portfolio site using Next.js, GitHub API, and Notion API.<br />
                I enjoy working across both frontend and backend systems, and beyond coding, I’m passionate about continuous learning and exploring new technologies, from building tools that solve everyday problems to understanding how low-level systems work.<br />
                I thrive in collaborative environments and bring strong communication skills from past experience in customer-facing roles.<br />
                <br />
                <a href="#skills">My skillset</a>
                <br />
                📌 Currently open to internship and placement opportunities in software development, web development, or related tech roles.
              </p>
              <div className="hero-icons">
                {/* ...your icons here... */}
              </div>
            </div>
          </section>

          {/* EDUCATION */}
          <section id="Education">
            <h2>Education</h2>
            <div className="edu-exp-grid">
              <div className="edu-exp-card">
                <strong>University of West London</strong>
                <br />
                <span>BSc (Hons) Computer Science</span>
                <br />
                <span>Currently Studying; Expected Graduation: 2027 (28 with placement)</span>
                <br />
                <span>Relevant Coursework: Data Structures, Algorithms, Web Development, Database Management</span>
              </div>
              <div className="edu-exp-card">
                <strong>Just IT, Software Engineering Bootcamp</strong>
                <br />
                <span>Completed: 2023</span>
                <br />
                <span>Skills Acquired: Full Stack Development, Agile Methodologies, Version Control with Git</span>
              </div>
              <div className="edu-exp-card">
                <strong>Haringey Sixth Form College</strong>
                <br />
                <span>A-Levels in Mathematics, Physics, and Computer Science</span>
                <br />
                <span>Graduated: 2021</span>
                <br />
                <span>Participated in coding competitions (TeenTech Awards)</span>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience">
            <h2>Work Experience</h2>
            <div className="edu-exp-grid">
              {experience.map(exp => {
                const props = exp.properties || {};
                const title = props.Project?.title?.[0]?.plain_text || 'No Title';
                const description = props.description?.rich_text?.[0]?.plain_text || 'No Description';
                const companyLink = props.link?.rich_text?.find(rt => rt.href)?.href;

                return (
                  <div className="edu-exp-card" key={exp.id}>
                    <strong>{title}</strong>
                    {companyLink && (
                      <div>
                        <a href={companyLink} target="_blank" rel="noopener noreferrer">{companyLink}</a>
                      </div>
                    )}
                    <p>{description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects">
            <h2>Projects</h2>
            <div className="projects-grid">
              {projects.map(project => (
                <div className="project-card" key={project.id}>
                  <h3>{project.name}</h3>
                  <p>{project.description || "No description provided."}</p>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-btn"
                  >
                    View on GitHub
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills">
            <h2>Skills</h2>
            <div className="skills-grid">
              {[
                "JavaScript", "React", "Node.js", "Python", "HTML & CSS", "Git & GitHub",
                "SQL & NoSQL Databases", "Agile Methodologies", "Problem Solving",
                "Communication & Teamwork", "Web Development", "API Utilisation",
                "Responsive Design", "Version Control"
              ].map(skill => (
                <div className="skill-card" key={skill}>{skill}</div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact">
            <h2>Contact</h2>
            <div className="contact-info">
              <p>If you would like to get in touch, feel free to reach out via email or connect with me on <a href="https://www.linkedin.com/in/olushola-olateju/" target="_blank" >LinkedIn.</a></p>
              <p>Email: <a href="mailto:olusholaolatejuuu@gmail.com" target='blank'>olusholaolatejuuu@gmail.com</a></p>
              <p>Phone: (+44)7764879835</p>
            </div>
          </section>
        </div>
      </>
    )}
  </div>
);
}

// This code fetches GitHub projects and Notion experience data, displays them in sections, and includes navigation buttons to scroll to each section.
// It handles loading and error states, ensuring a smooth user experience.