import '@/backend/models';
import { ArticalController } from "@/backend/controllers/artical.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";

export const POST = asyncHandler(ArticalController.createArtical);
export const GET = asyncHandler(ArticalController.getAllArticals);
