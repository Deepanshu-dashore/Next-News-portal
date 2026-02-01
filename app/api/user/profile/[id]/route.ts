import { UserController } from "@/backend/controllers/user.controller";
import { asyncHandler } from "@/backend/utlis/asyncHandler.utlis";
import '@/backend/models';



export const GET = asyncHandler(async (request: Request, { params }: { params: { id: string } }) => {
  return UserController.profile(request, { params: Promise.resolve({ id: params.id }) });
})