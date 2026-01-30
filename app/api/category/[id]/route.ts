import { CategoryController } from "@/backend/controllers/category.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const GET = asyncHandler(CategoryController.getCategoryById);
export const PUT = asyncHandler(CategoryController.updateCategory);
export const DELETE = asyncHandler(CategoryController.deleteCategory);
