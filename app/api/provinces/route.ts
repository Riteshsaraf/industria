import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request) {
  try {

    const backendRes = await fetch(`${backendUrl}/api/province/list`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Invalid credentials" },
        { status: 400 },
      );
    }

    // SUCCESS
    return NextResponse.json(
      {
        provinces: data,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    const backendRes = await fetch(`${backendUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Invalid requests" },
        { status: 400 },
      );
    }

    // SUCCESS
    return NextResponse.json(
      {
        user: data,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 },
    );
  }
}
