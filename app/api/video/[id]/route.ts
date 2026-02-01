import '@/backend/models';
import { VideoController } from "@/backend/controllers/video.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const GET = asyncHandler(VideoController.getVideoById);
export const PUT = asyncHandler(VideoController.updateVideo);
export const DELETE = asyncHandler(VideoController.deleteVideo);
