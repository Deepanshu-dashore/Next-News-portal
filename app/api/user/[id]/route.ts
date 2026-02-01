import '@/backend/models';
import { UserController } from "@/backend/controllers/user.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";

export const GET = asyncHandler((req: Request, context: { params: Promise<{ id: string }> }) =>
  UserController.getUserById(req, context)
);

export const PUT = asyncHandler((req: Request, context: { params: Promise<{ id: string }> }) =>
  UserController.updateUser(req, context)
);

export const DELETE = asyncHandler((req: Request, context: { params: Promise<{ id: string }> }) =>
  UserController.deleteUser(req, context)
);

export const PATCH = asyncHandler((req: Request, context: { params: Promise<{ id: string }> }) =>
  UserController.deactivateUser(req, context)
);
