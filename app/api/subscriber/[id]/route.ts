import { deleteSubscriber } from "@/backend/controllers/subscriber.controller";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteSubscriber(id);
    return NextResponse.json({ success: true, message: "Subscriber deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json({ success: false, error: "Failed to delete subscriber" }, { status: 500 });
  }
}
