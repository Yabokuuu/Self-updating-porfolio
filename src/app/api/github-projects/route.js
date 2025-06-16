export async function GET(request) {
  const response = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`,
    {
      // Fetching repositories for the user specified in the environment variable
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      // Using the GitHub token for authentication
    }
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'GitHub API error' }), { status: response.status });
  }
// Check if the response is OK, otherwise return an error response
  // If the response is OK, parse the JSON data
  const projects = await response.json();
  return new Response(JSON.stringify(projects), { status: 200 });
}
// Returning the projects as a JSON response with a 200 status code
