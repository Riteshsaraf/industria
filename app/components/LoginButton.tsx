"use client";

import { useAuth } from "@/context/AdminAuthContext";
import logo from "@/public/next.svg";
import { LoginRequest } from "@/app/types/userAuth";
import { useState } from "react";
import Image from "next/image";


export default function LoginButton() {
    // const { login } = useAuth();

    //State to hold input values
      const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: ""
      });
    
      //Handlers
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
      
        setFormData((prev) => ({
            ...prev,
            [name]:  value,
        }));
    };

    const handleLogin = async () => {
        // call your ASP.NET API
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        })
        const data = await response.json()

        console.log({ data });

      window.location.href = "/home";
    }

    //return <button className="btn bg-white text-[blue] cursor-pointer underline" onClick={handleLogin}>Login</button>

    return (
        <div className="w-full max-w-[400px] mx-auto w-1/2 flex flex-col space-y-5 shrink-0 justify-center  items-center p-10 rounded-lg border border-gray-300 shadow-lg">
          {/* WELCOME TEXT */}
          <div className="space-y-5">
            <Image
                                  src={"/images/sticker.png"}
                                  alt="branch sticker"
                                  width={100}
                                  height={100}
                                  className=""
                                />
          </div>

          {/* LOGIN SECTION */}
          <div className="space-y-6">
            <h2 className="text-2xl font-medium">Log in to admin panel</h2>

            <form onSubmit={handleLogin} className="space-y-6">
                {/* EMAIL FIELD */}
              <div className="space-y-1">
                <label htmlFor="userId" className="block text-sm font-medium">
                  Email <span className="text-[#d90d2b]">*</span>
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  title="Enter and email"
                  autoFocus
                  
                  required
                  className="block w-full h-12 px-4 rounded-lg border border-[#8c8c8c] placeholder-gray-400 focus:border-[#13499F] focus:ring-2 focus:ring-opacity-20 focus:ring-[#13499F] transition-colors disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                />
              </div>

              {/* PASSWORD FIELD */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password <span className="text-[#d90d2b]">*</span>
                  </label>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  title="Enter Password"
                  required
                 
                  className="block w-full h-12 px-4 rounded-lg border border-[#8c8c8c] placeholder-gray-400 focus:border-[#13499F] focus:ring-2 focus:ring-opacity-20 focus:ring-[#13499F] transition-colors disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                />
                <div className="flex justify-start pt-1">
                  {/*Forgot Password*/}
                  <a
                    href="https://auth.on.excelleris.com/forgotpassword.aspx"
                    className="text-sm font-semibold text-[#13499F] underline hover:no-underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="button"
                onClick={handleLogin}
                className={`w-full flex justify-center bg-[#13499f] text-white text-[14px] font-semibold border-2 border-[#13499f]-300 px-4 py-3 rounded-lg hover:bg-white hover:text-[#13499f] duration-200 cursor-pointer text-lg focus:outline-none focus:ring-offset-2 focus:ring-[#13499F] disabled:opacity-70 disabled:cursor-not-allowed transition-all`}
              >
               Login
              </button>
              <div className="w-8 h-0.5 bg-gray-400 my-5 mx-auto rounded-full" />
            </form>

            <div className="flex flex-col gap-2">
              
            </div>
          </div>
        </div>
    )
}
