import { NextResponse } from "next/server";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function POST(req: Request) {
 try {
    const body = await req.json();
    const { email, password } = body;

    const backendRes = await fetch(`${BACKEND_API_URL}/users/login`, {
        method: "POST",
         credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await backendRes.json();

    //  const data = {
    //      UserId : "1",
    //      Token: createDummyJWT(),
    //      UserName: "Ravikanth Tallam",
    //      ResponseCode : "TEXT_RESPONSE",
    //  }

    console.log({data})

    if (!backendRes.ok) {
        return NextResponse.json(
        { message: data.message || "Invalid credentials" },
        { status: 400 }
        );
    }

    // SUCCESS
    return NextResponse.json(
      {
        // token: data.token,
        user: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
