import '@/backend/models';
import { UserController } from "@/backend/controllers/user.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";


export const POST = asyncHandler(UserController.login);