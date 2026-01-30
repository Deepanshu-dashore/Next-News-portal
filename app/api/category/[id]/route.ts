import { CategoryController } from "@/backend/controllers/category.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const GET = asyncHandler((req: Request, context: { params: Promise<{ id: string }> }) => 
  CategoryController.getCategoryById(req, context)
);
export const PUT = asyncHandler((req: Request, context: { params: Promise<{ id: string }> }) => 
  CategoryController.updateCategory(req, context)
);
export const DELETE = asyncHandler((req: Request, context: { params: Promise<{ id: string }> }) => 
  CategoryController.deleteCategory(req, context)
);
