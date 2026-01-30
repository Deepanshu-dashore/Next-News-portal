import { UserController } from "@/backend/controllers/user.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const GET = asyncHandler(UserController.getUserById);
export const PUT = asyncHandler(UserController.updateUser);
export const PATCH = asyncHandler(UserController.deactivateUser);
export const DELETE = asyncHandler(UserController.deleteUser);