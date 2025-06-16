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
  // State variables to hold projects, loading state, and error state
  // useState is used to manage state in functional components
  // useEffect is used to perform side effects in functional components
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Function to scroll to a specific section by ID
    // Uses smooth scrolling for a better user experience
  };
const [experience, setExperience] = useState([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // If loading, display a loading message
  // If there's an error, display the error message

  console.log('Experience data:', experience);
  return (
  <div>
      <header>
        <nav>
          <button onClick={() => scrollToSection('projects')}>Projects</button>
          <button onClick={() => scrollToSection('experience')}>Experience</button>
        </nav>
      </header>
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
    </div>
  );
  

}
// This code fetches GitHub projects and Notion experience data, displays them in sections, and includes navigation buttons to scroll to each section.
// It handles loading and error states, ensuring a smooth user experience.