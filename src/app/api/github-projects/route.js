export async function GET(request) {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  console.log('Fetching GitHub projects for:', username);

  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'portfolio-app',
    },
  });

  if (!res.ok) {
    console.error('GitHub API error:', res.status, await res.text());
    return new Response(JSON.stringify({ error: 'Failed to fetch repos' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    });
  }

  const projects = await res.json();
  console.log('Fetched projects:', projects.map(p => p.name));

  return new Response(JSON.stringify(projects), {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json',
    },
  });
}