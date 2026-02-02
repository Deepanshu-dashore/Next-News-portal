import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/backend/db/connect";
import { Category } from "@/backend/models/catergory.model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    
    let query = Category.find({ isActive: true });
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const categories = await query.exec();

    return NextResponse.json({
      success: true,
      message: "Categories fetched successfully",
      data: categories
    });
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
