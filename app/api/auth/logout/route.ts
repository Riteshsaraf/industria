import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  try {
    // Forward logout request to backend
    const url = `${backendUrl}/api/UserLogin/logout`;
    const cookieHeader = request.headers.get("cookie");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    });

    // Prepare the Next.js Response
    const res = NextResponse.json(
      { message: "Logged out" },
      { status: response.status },
    );

    // Forward the "Delete" cookie instruction to browser
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }

    return res;
  } catch (error) {
    return NextResponse.json({ message: "Logout Failed" }, { status: 500 });
  }
}
