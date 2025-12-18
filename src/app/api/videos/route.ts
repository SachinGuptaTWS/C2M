import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = 'SELECT * FROM videos ORDER BY created_at DESC';
    let params: any[] = [];

    if (category) {
      query = 'SELECT * FROM videos WHERE category = $1 ORDER BY created_at DESC';
      params = [category];
    }

    const result = await db.query(query, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
