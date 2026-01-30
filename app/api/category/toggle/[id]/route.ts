import { CategoryController } from "@/backend/controllers/category.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const PATCH = asyncHandler(CategoryController.toggleCategoryStatus);
