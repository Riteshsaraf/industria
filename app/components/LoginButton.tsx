"use client";

import { useAuth } from "@/context/AdminAuthContext";

export default function LoginButton() {
    const { login } = useAuth()

    const handleLogin = async () => {
        // call your ASP.NET API
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "ravi.tallum@next tool.com",
                password: "123456",
            }),
        })
        const data = await response.json()

        console.log({ data });

        login(data.user, data.user.Token)
        
    }

    return <button className="btn bg-white text-[blue] cursor-pointer underline" onClick={handleLogin}>Login</button>
}
