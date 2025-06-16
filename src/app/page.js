"use client";
// This is a client-side component in Next.js
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
  // ...existing code...
return (
  <div>
    {showHero && (
      <div className="hero-overlay">
        <section className="hero-box">
          <h1 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Olushola Olateju</h1>
          <p style={{ marginBottom: 24 }}>
            Computer Science student at the University of West London, currently on track to graduate with First Class Honours
          </p>
          <div className="hero-icons">
            <a href="https://github.com/Yabokuuu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              {/* GitHub SVG */}
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.3 7.87 10.8.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.78 1.08.78 2.18v3.24c0 .31.21.67.8.56C20.71 21.3 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/olushola-olateju/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              {/* LinkedIn SVG */}
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.72z"/></svg>
            </a>
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
    {!showHero && (
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
    )}
    <section id="About Me">
      <h1>Olushola Olateju</h1>
      <h2>About me</h2>
      <p>
        I am a Computer Science student at the University of West London, currently on track to graduate with First Class Honours.<br /> I’m entering my second year and actively seeking internship or placement year opportunities where I can apply my technical skills, learn from experienced teams, and contribute to real-world projects.<br />
I’ve built a range of personal and academic projects, including This self-updating portfolio site using Next.js, GitHub API, and Notion API. I enjoy working across both frontend and backend systems, and beyond coding, I’m passionate about continuous learning and exploring new technologies, from building tools that solve everyday problems to understanding how low-level systems work. I thrive in collaborative environments and bring strong communication skills from past experience in customer-facing roles.
<br /><a href="#skills">My skillset</a>
<br />📌 Currently open to internship and placement opportunities in software development, web development, or related tech roles. 
      </p>
      <div className="hero-icons">
            <a href="https://github.com/Yabokuuu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              {/* GitHub SVG */}
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.3 7.87 10.8.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.78 1.08.78 2.18v3.24c0 .31.21.67.8.56C20.71 21.3 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/olushola-olateju/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              {/* LinkedIn SVG */}
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.72z"/></svg>
            </a>
          </div>
    </section>
    <section id="Education">
      <h2>Education</h2>
      <ul>
        <li>
          <strong>University of West London</strong> - BSc (Hons) Computer Science
          <br />
          <span>Currently Studying; Expected Graduation: 2027 (28 with placement)</span>
          <br />
          <span>Relevant Coursework: Data Structures, Algorithms, Web Development, Database Management</span>
        </li>
        <li>
          <strong>Just IT, Software Engineering Bootcamp</strong>
          <br />
          <span>Completed: 2023</span>
          <br />
          <span>Skills Acquired: Full Stack Development, Agile Methodologies, Version Control with Git</span>
        </li>
        <li>
          <strong>Haringey Sixth Form College</strong> - A-Levels in Mathematics, Physics, and Computer Science
          <br />
          <span>Graduated: 2021</span>
          <br />
          <span>participated in coding competitions(TeenTech Awards)</span>
        </li>
      </ul> 

    </section>
     <section id="experience">
      <h2>Work Experience</h2>
      <ul>
        {experience.map(exp => {
          const props = exp.properties || {};
          const title = props.Project?.title?.[0]?.plain_text || 'No Title';
          const description = props.description?.rich_text?.[0]?.plain_text || 'No Description';
          const companyLink = props.link?.rich_text?.find(rt => rt.href)?.href;

          return (
            <li key={exp.id}>
              <strong>{title}</strong>
              {companyLink && (
                <div>
                  <a href={companyLink} target="_blank" rel="noopener noreferrer">{companyLink}</a>
                </div>
              )}
              <p>{description}</p>
            </li>
          );
        })}
      </ul>
    </section>
    <section id="projects">
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
    <section id="skills">
      <h2>Skills</h2>
      <ul>
        <li>JavaScript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>Python</li>
        <li>HTML & CSS</li>
        <li>Git & GitHub</li>
        <li>SQL & NoSQL Databases</li>
        <li>Agile Methodologies</li>
        <li>Problem Solving</li>
        <li>Communication & Teamwork</li>
        <li>Web Development</li>
        <li>API Utilisation</li>
        <li>Responsive Design</li>
        <li>Version Control</li>
      </ul>
    </section>
    <section id="contact">
      <h2>Contact</h2>
      <p>If you would like to get in touch, feel free to reach out via email or connect with me on <a href="https://www.linkedin.com/in/olushola-olateju/" target="_blank" >LinkedIn.</a></p>
      <div className="contact-info">
        <p>Email: <a href="mailto:olusholaolatejuuu@gmail.com" target='blank'>olusholaolatejuuu@gmail.com</a></p>
        <p>Phone: (+44)7764879835</p>
      </div>
    </section>
  </div>
);
  

}

// This code fetches GitHub projects and Notion experience data, displays them in sections, and includes navigation buttons to scroll to each section.
// It handles loading and error states, ensuring a smooth user experience.