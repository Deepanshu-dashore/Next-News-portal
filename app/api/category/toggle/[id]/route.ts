import '@/backend/models';
import { CategoryController } from "@/backend/controllers/category.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const PATCH = asyncHandler((req: Request, context: { params: Promise<{ id: string }> }) => 
  CategoryController.toggleCategoryStatus(req, context)
);
