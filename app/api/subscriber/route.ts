import { NextRequest, NextResponse } from "next/server";
import { getAllSubscribers, createSubscriber } from "@/backend/controllers/subscriber.controller";

export async function GET() {
  try {
    const subscribers = await getAllSubscribers();
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error: any) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch subscribers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const subscriber = await createSubscriber({ email, name });
    return NextResponse.json({ success: true, data: subscriber });
  } catch (error: any) {
    console.error("Error creating subscriber:", error);
    return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
