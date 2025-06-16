import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';


export async function GET() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    // Querying the Notion database using the ID from the environment variable
  });
  return NextResponse.json(response.results);
  // Returning the results of the query as a JSON response
}
