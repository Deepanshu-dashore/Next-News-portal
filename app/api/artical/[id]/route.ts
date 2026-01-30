import { ArticalController } from "@/backend/controllers/artical.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";

export const GET = asyncHandler(ArticalController.getArticalById);
export const PUT = asyncHandler(ArticalController.updateArtical);
export const DELETE = asyncHandler(ArticalController.deleteArtical);
