import { Search } from "lucide-react";
import { NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_API_URL;

// Simulate backend API or database fetch
async function fetchFormFromDB(id: string) {
    // Replace with your actual DB call

    console.log({ idParam: id });
    if (id !== "new") {

        const backendRes = await fetch(`${backendUrl}/category/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await backendRes.json();

        return data;
    }
    return null;
}


export async function GET(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
    try {

        // If params is a Promise, unwrap it
        const params = "then" in context.params ? await context.params : context.params;
        const { id } = params;

        const { searchParams } = new URL(req.url);

        const page = Number(searchParams.get("page")) || 1;
        const pageSize = Number(searchParams.get("pageSize")) || 10;
        const search = searchParams.get("search") || 10;

        if (id && id !== 'list' && id!=='search' && id !== 'new') {
            const data = await fetchFormFromDB(id);

            return NextResponse.json(
                {
                    data
                },
                { status: 200 }
            );
        }

        const url = id ==='search' ? `${backendUrl}/category?search=${search}page=${page}&limit=${pageSize}` : `${backendUrl}/category?page=${page}&limit=${pageSize}`;

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
                data : data.data
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


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, parentId, description, slug } = body;

        const backendRes = await fetch(`${backendUrl}/category`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                parentId,
                name,
                description,
                slug
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

export async function PATCH(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
    try {
        const body = await req.json();

        // If params is a Promise, unwrap it
        const params = "then" in context.params ? await context.params : context.params;
        const { id } = params;

        const { parentId,name, description,slug } = body;

        const backendRes = await fetch(`${backendUrl}/category/`+id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                parentId,
                name,
                description,
                slug
            }),
        });
        const raw = await backendRes.text();

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
            { message: "Failed to update tests", error },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
    try {
        
        // If params is a Promise, unwrap it
        const params = "then" in context.params ? await context.params : context.params;
        const { id } = params;

        const backendRes = await fetch(`${backendUrl}/category/`+ id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
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
            { message: "Failed to delete test", error },
            { status: 500 }
        );
    }
}