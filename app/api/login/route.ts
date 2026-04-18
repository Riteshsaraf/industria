import { NextResponse } from "next/server";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:4000";

const payload = {
    sub: "1",
    name: "Ravikanth Tallam",
    email: "ravi.tallum@next tool.com",
    role: "Admin",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
}

function createDummyJWT() {
    const header = {
        alg: "HS256",
        typ: "JWT",
    }

    
    const base64Encode = (obj: object) =>
        btoa(JSON.stringify(obj))

    const encodedHeader = base64Encode(header)
    const encodedPayload = base64Encode(payload)

    const fakeSignature = "dummy_signature"

    return `${encodedHeader}.${encodedPayload}.${fakeSignature}`
}

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

export async function GET(req: Request) {
    try {
       
        const data = {
            UserId: "1",
            UserName: "Ravikanth Tallam",
            ResponseCode: "TEXT_RESPONSE",
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