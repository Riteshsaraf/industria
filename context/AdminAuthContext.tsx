"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type User = {
    id: number
    name: string
    email: string
}

type AuthContextType = {
    user: User | null
    token: string | null
    login: (user: User, token: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const AdminAuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    // Restore session from localStorage on refresh
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/login", {
                    credentials: "include",
                })

                console.log({ res });

                if (res.ok) {

                    
                    const data = await res.json();
                    console.log({ loginResponse: data });
                    setUser(data.user)

                    const jwtToken = localStorage.getItem("token");
                    setToken(jwtToken);
                    
                }
            } catch (error) {
                setUser(null)
            } finally {
            }
        }

        fetchUser()
    }, [])

    const login = (userData: User, jwtToken: string) => {
        setUser(userData)
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken);
        // after login success
        document.cookie = `AdminAuthSession=${jwtToken}; path=/;`
        window.location.href = "/home"
    }

    const logout = () => {
        setUser(null)
        setToken(null)

        localStorage.removeItem("user")
        localStorage.removeItem("token")

        document.cookie =
            "AdminAuthSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"

        window.location.href = "/admin-login"
    }

    return (
        <AdminAuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AdminAuthContext)
   if (!context) throw new Error("useAuth must be used inside AuthProvider")
    return context
}