import '@/backend/models';
import { VideoController } from "@/backend/controllers/video.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const GET = asyncHandler(VideoController.getVideoBySlug);
