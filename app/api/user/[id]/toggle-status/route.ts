import '@/backend/models';
import { UserController } from "@/backend/controllers/user.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";

export const PATCH = asyncHandler((req: Request, context: { params: Promise<{ id: string }> }) =>
  UserController.toggleUserStatus(req, context)
);
