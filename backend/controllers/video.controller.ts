import { VideoService } from "../services/video.services";
import { success, error } from "../utlis/response.utlis";
import { authMiddleware } from "../middleware/auth.middleware";
import { generateVideoSlug, generateSlug, toSlug } from "../utlis/slug.utlis";

export class VideoController {

    // Video controller methods 

    // Helper function to extract YouTube video ID and validate URL
    private static extractYouTubeId(url: string): string | null {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }
        return null;
    }

    static async createVideo(req: Request) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        const body = await req.json();

        // Validate required fields
        if (!body.title || !body.description || !body.CategoryId || !body.videoUrl || !body.uploadedBy) {
            return error("Title, Description, Category, Video URL and Uploaded By are required", 400);
        }

        // Auto-generate slug if not provided
        if (!body.slug) {
            body.slug = generateVideoSlug(body.title);
        } else {
            // Ensure provided slug is properly formatted
            body.slug = toSlug(body.slug);
        }

        // Check if slug already exists
        const existingVideo = await VideoService.getVideoBySlug(body.slug);
        if (existingVideo) {
            // Make slug unique by adding timestamp
            body.slug = generateSlug(body.title, {
                addTimestamp: true,
                timestampFormat: 'timestamp',
                maxLength: 80
            });
        }

        // Validate YouTube URL
        const youtubeId = VideoController.extractYouTubeId(body.videoUrl);
        if (!youtubeId) {
            return error("Invalid YouTube URL. Please provide a valid YouTube video URL", 400);
        }

        // Optionally normalize the URL to embed format
        body.videoUrl = `https://www.youtube.com/embed/${youtubeId}`;

        const video = await VideoService.createVideo(body);
        return success(video, 201, "Video created successfully");
    }

    static async getAllVideos(req: Request) {
        const videos = await VideoService.getAllVideos();
        return success(videos, 200, "Videos fetched successfully");
    }

    static async getVideoById(req: Request, { params }: { params: Promise<{ slug: string }>  }) {
        const video = await VideoService.getVideoById((await params).slug);
        if (!video) {
            return error("Video not found", 404);
        }
        return success(video, 200, "Video fetched successfully");
    }

    static async getVideoBySlug(req: Request, { params }: { params: Promise<{ slug: string }> }) {
        const video = await VideoService.getVideoBySlug((await params).slug);
        if (!video) {
            return error("Video not found", 404);
        }
        return success(video, 200, "Video fetched successfully");
    }

    static async getVideosByCategory(req: Request, { params }: { params: Promise<{ categoryId: string }> }) {
        const videos = await VideoService.getVideosByCategory((await params).categoryId);
        return success(videos, 200, "Videos fetched successfully");
    }

    static async updateVideo(req: Request, { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        const body = await req.json();

        // If videoUrl is being updated, validate it
        if (body.videoUrl) {
            const youtubeId = VideoController.extractYouTubeId(body.videoUrl);
            if (!youtubeId) {
                return error("Invalid YouTube URL. Please provide a valid YouTube video URL", 400);
            }
            body.videoUrl = `https://www.youtube.com/embed/${youtubeId}`;
        }

        const updatedVideo = await VideoService.updateVideo((await params).id, body);
        if (!updatedVideo) {
            return error("Video not found", 404);
        }
        return success(updatedVideo, 200, "Video updated successfully");
    }

    static async deleteVideo(req: Request, { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        const deletedVideo = await VideoService.deleteVideo((await params).id);
        if (!deletedVideo) {
            return error("Video not found", 404);
        }
        return success(deletedVideo, 200, "Video deleted successfully");
    }

    static async getPublishedVideos(req: Request) {
        const videos = await VideoService.getPublishedVideos();
        return success(videos, 200, "Published videos fetched successfully");
    }

    static async searchVideos(req: Request) {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q');

        if (!query) {
            return error("Search query is required", 400);
        }

        const videos = await VideoService.searchVideos(query);
        return success(videos, 200, "Search results fetched successfully");
    }
}
