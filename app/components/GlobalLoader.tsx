"use client";

import { useLoader } from "@/context/LoaderContext";
import { Loader2 } from "lucide-react";

export default function GlobalLoader() {
    const { loading } = useLoader();

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
    );
}