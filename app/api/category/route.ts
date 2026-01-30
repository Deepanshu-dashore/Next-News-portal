import { CategoryController } from "@/backend/controllers/category.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const POST = asyncHandler(CategoryController.createCategory);
export const GET = asyncHandler(CategoryController.getAllCategories);
