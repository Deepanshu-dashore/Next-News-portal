import '@/backend/models';
import { VideoController } from "@/backend/controllers/video.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";
import "@/backend/models/catergory.model";
import "@/backend/models/user.model";
import "@/backend/models/videos.model";


export const POST = asyncHandler(VideoController.createVideo);
export const GET = asyncHandler(VideoController.getAllVideos);
