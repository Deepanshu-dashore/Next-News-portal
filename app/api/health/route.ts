import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'news-portal',
      status: 'healthy',
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
