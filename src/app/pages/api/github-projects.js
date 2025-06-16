export default async function handler(req, res) {
  const response = await fetch(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`);
  const projects = await response.json();
  res.status(200).json(projects);
}