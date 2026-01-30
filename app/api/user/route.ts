import { UserController } from "@/backend/controllers/user.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const POST = asyncHandler(UserController.register);
export const GET = asyncHandler(UserController.getAllUsers);