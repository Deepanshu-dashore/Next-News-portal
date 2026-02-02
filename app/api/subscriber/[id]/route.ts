import { NextRequest, NextResponse } from "next/server";
import { deleteSubscriber } from "@/backend/controllers/subscriber.controller";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await deleteSubscriber(id);
    return NextResponse.json({ success: true, message: "Subscriber deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json({ success: false, error: "Failed to delete subscriber" }, { status: 500 });
  }
}
