import { Search } from "lucide-react";
import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name,description, bannerImage, branches, socialLinks } = body;

        const backendRes = await fetch(`${backendUrl}/company`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,description, bannerImage, branches, socialLinks
            }),
        });

        const raw = await backendRes.text();

        console.log({ raw });

        if (!backendRes.ok) {
            return NextResponse.json(
                { message: raw || "Invalid requests" },
                { status: 400 }
            );
        }

        // SUCCESS
        return NextResponse.json(
            {
                message: raw,
            },
            { status: 200 }
        );
    } catch (error) {

        console.log({ error });

        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
}



export async function GET(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
    try {

        // If params is a Promise, unwrap it
        const url =  `${backendUrl}/company`;

        console.log({url});

        const backendRes = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await backendRes.json();

        if (!backendRes.ok) {
            return NextResponse.json(
                { message: data.message || "Invalid credentials" },
                { status: 400 }
            );
        }

        // SUCCESS
        return NextResponse.json(
            {
                data : data[0]
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