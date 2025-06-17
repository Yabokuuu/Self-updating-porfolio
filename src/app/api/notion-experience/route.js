import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET() {
  const notionApiKey = process.env.NOTION_API_KEY;
  const notionDatabaseId = process.env.NOTION_DATABASE_ID;

  console.log('Fetching Notion experience from database:', notionDatabaseId);

  const notion = new Client({ auth: notionApiKey });

  try {
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    console.log('Fetched Notion results:', response.results.length);

    return new NextResponse(JSON.stringify(response.results), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Notion API error:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch Notion data' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    });
  }
}