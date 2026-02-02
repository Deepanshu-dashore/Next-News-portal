import { NextResponse } from 'next/server';
import { globalSearch } from '@/backend/services/search.service';
import '@/backend/models';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ success: true, data: { articles: [], videos: [], categories: [] } });
    }

    const results = await globalSearch(query);

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
