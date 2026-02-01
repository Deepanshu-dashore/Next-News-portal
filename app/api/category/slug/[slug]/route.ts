import '@/backend/models';
import { CategoryController } from "@/backend/controllers/category.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const GET = asyncHandler((req: Request, context: { params: Promise<{ slug: string }> }) => 
  CategoryController.getCategoryBySlug(req, context)
);
