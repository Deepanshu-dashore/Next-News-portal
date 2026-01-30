import { NextResponse } from "next/server";

//for consistent API responses
export function success<T>(
  data: T,
  status: number = 200,
  message: string = "Success"
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

//for consistent API error responses
export function error(
  message: string = "Something went wrong",
  status: number = 500,
  details?: unknown
) {
  const body: Record<string, unknown> = {
    success: false,
    message,
    status
  };

  if (details !== undefined) {
    body.details = details;
  }

  return NextResponse.json(body, { status });
}
