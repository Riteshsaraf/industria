import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;



export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("file");

        if (!file) {
            return new Response("File missing", { status: 400 });
        }

        // Create new FormData to send to ASP.NET API
        const newFormData = new FormData();
       newFormData.append("file", file);

        const backendRes = await fetch(`${backendUrl}/api/test/import`, {
            method: "POST",
            body: newFormData
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