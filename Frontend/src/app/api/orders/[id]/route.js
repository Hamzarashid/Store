
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
    const { id } = params;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orderList/${id}`
      );
  
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      return NextResponse.json(data);  
    } catch (error) {
      return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });  
    }
  }