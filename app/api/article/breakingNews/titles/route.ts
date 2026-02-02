import '@/backend/models';
import { ArticalController } from "@/backend/controllers/artical.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";

export const GET = asyncHandler(ArticalController.getBreakingNewsTitles);
