import { NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_API_URL;

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const url = `${backendUrl}/api/UserLogin/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    const res = NextResponse.json(data, { status: response.status });

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }
    return res;
  } catch (error) {
    return NextResponse.json({ message: "Login Failed" }, { status: 500 });
  }
}
