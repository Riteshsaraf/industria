import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_API_URL;

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('User_Session');

    if (!sessionCookie){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const url = `${backendUrl}/api/UserLogin/providers`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `User_Session=${sessionCookie.value}`
      },
      cache:'no-store'
    });

    if (!response.ok){
        const errorData = await response.text();
        console.error('Backend Provider Error:', errorData);

        return NextResponse.json(
            {error: 'Failed to fetch providers from backend'},
            {status: response.status}
        );
    }

    const providers = await response.json();

    return NextResponse.json(providers);
  } catch (error) {
    console.error('Route Handler Error:', error);
    return NextResponse.json(
      { message: "Internal Server Error When getting Providers." },
      { status: 500 },
    );
  }
}
