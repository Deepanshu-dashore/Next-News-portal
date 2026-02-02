import '@/backend/models';
import { VideoService } from "@/backend/services/video.services";
import { success } from "@/backend/utlis/response.utlis";
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    if (!categoryId) {
      return Response.json(
        { success: false, error: 'Category ID is required' },
        { status: 400 }
      );
    }

    const videos = await VideoService.getVideosByCategory(categoryId);
    return success(videos, 200, "Videos fetched successfully");
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
