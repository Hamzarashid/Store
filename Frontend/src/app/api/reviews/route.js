import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviews/all`)
    const data = await response.json();
    return NextResponse.json(data);
  }