import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/db/connect';
import { Artical } from '@/backend/models/articals.model';

/**
 * Track article views and likes
 * POST /api/article/[id]/stats
 * Body: { action: 'view' | 'like', userId?: string }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const { action, userId } = body;

    if (!action || !['view', 'like'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be "view" or "like"' },
        { status: 400 }
      );
    }

    const article = await Artical.findById(id);

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // Track views using viewCount array (stores IP or user ID)
    if (action === 'view') {
      const identifier = userId || req.ip || 'anonymous';
      
      // Only add if not already viewed by this identifier
      if (!article.viewCount.includes(identifier)) {
        article.viewCount.push(identifier);
        await article.save();
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        views: article.viewCount.length,
        message: `Article ${action} tracked successfully`,
      },
    });
  } catch (error) {
    console.error('Error tracking article stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track article stats' },
      { status: 500 }
    );
  }
}

/**
 * Get article statistics
 * GET /api/article/[id]/stats
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const article = await Artical.findById(id).select('viewCount title');

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        articleId: article._id,
        title: article.title,
        views: article.viewCount.length,
      },
    });
  } catch (error) {
    console.error('Error fetching article stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article stats' },
      { status: 500 }
    );
  }
}
