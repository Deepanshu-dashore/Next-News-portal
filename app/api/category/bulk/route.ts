import '@/backend/models';
import { CategoryController } from "@/backend/controllers/category.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const POST = asyncHandler(CategoryController.createBulkCategories);
