import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request) {
  try {
    const url = `${backendUrl}/api/UserLogin/me`;

    const cookie = req.headers.get("cookie") || "";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
    });

    const data = await response.json();

    const res = NextResponse.json(data, { status: response.status });

    const logoutReason = response.headers.get("X-Logout-Reason");
    if (logoutReason) {
      res.headers.set("X-Logout-Reason", logoutReason);
    }

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Session check failed." },
      { status: 500 },
    );
  }
}
