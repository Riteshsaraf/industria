"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {  } from "@/context/UserAuthContext";
import { userAuthService } from "@/app/services/userAuthService";
import { useUserAuth } from "@/context/UserAuthContext";
import { LoginRequest } from "@/app/types/userAuth";
import Footer from "@/app/components/Footer";
import logo from "@/public/next.svg";
import { ApiError } from "@/app/utils/CustomApiErrors";
import toast from "react-hot-toast";

function UserLoginPage() {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const errorType = searchParams.get("error");
  const messageType = searchParams.get("message");
  const router = useRouter();
  const {user, isLoading} = useUserAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/user");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setIsMounted(true);

    if (messageType === "logout_success") {
      toast.success("You have been successfully logged out.", {
        icon: "➜]",
        duration: 5000,
        id: "logout-toast",
      });
      router.replace("/", { scroll: false });
    }

    if (errorType) {
      const errorMessages: Record<string, string> = {
        expired:
          "Your session has expired due to inactivity. Please log in again.",
        concurrent:
          "You have been logged out because you signed in on another device.",
        server_offline:
          "SRT is currently unreachable. Please try again in a few moments.",
        inaccessible: "Please login to continue.",
      };

      const message =
        errorMessages[errorType] || "An unexpected error occurred.";

      toast.error(message, {
        duration: 5000,
        icon: "⚠️",
        id: "login-toast",
      });

      router.replace("/", { scroll: false });
    }
  }, [errorType, messageType, router]);

  // 1. Hook into External User Context
  const { login } = useUserAuth();

  //State to hold input values
  const [formData, setFormData] = useState<LoginRequest & { agreed: boolean }>({
    userId: "",
    password: "",
    province: "ON",
    agreed: false,
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  //Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));

    if (isCheckbox && checked) {
      setStatus("idle");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!formData.agreed) {
      setErrorMessage("You must agree to the Terms & Conditions.");
      setStatus("error");
      return;
    }

    try {
      const sessionData = await userAuthService.login(formData);

      login(sessionData);
      setStatus("success");

      console.log(JSON.stringify(sessionData));
      console.log("Login Successful, token stored.");

      router.push("/patient-form-requisition");
    } catch (error: unknown) {
      setStatus("error");

      // Check if custom error
      if (error instanceof ApiError) {
        // Registered but not authorized
        if (error.status === 403 || error.code === "APP_UNAUTHORIZED") {
          setErrorMessage("You do not have the permissions to access SRT.");

          setTimeout(() => {
            router.push("/forbidden");
          }, 2000);
        }

        // Not Registered / bad credentials
        else if (error.status === 401 || error.code === "USER_NOT_FOUND") {
          setErrorMessage("Account not found or invalid credentials.");

          setTimeout(() => {
            router.push("/unauthorized");
          }, 2000);
        } else {
          setErrorMessage(
            error.message || "An unexpected server error occurred.",
          );
          router.push("/maintenance");
        }
      } else {
        setErrorMessage("An unexpected application error occurred.");
        router.push("/maintenance");
        console.error(error);
      }
    }

    // If not mounted yet, return null
    if (!isMounted) return null;
  };
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-black">
      {/* LEFT SIDE */}
      <header className="w-full h-20 border-b border-gray-200 flex items-center px-6 md:px-10 shrink-0">
        <a href="#">
          <img
            className="absolute w-[148px] h-20 object-cover left-10 top-0"
            src={logo.src}
            alt="Smart Req Icon"
          />
        </a>
      </header>

      <main className="w-full overflow-x-hidden flex-1 flex flex-row pt-14 pb-14 pl-[158px] min-w-max">
        <div className="w-full max-w-[314px] flex flex-col space-y-5 shrink-0">
          {/* WELCOME TEXT */}
          <div className="space-y-5">
            <h1 className="text-3xl leading-tight tracking-tight">
              Welcome to the next tool by next tool
            </h1>
            
          </div>

          {/* LOGIN SECTION */}
          <div className="space-y-6">
            <h2 className="text-2xl font-medium">Log in</h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* USER ID FIELD */}
              <div className="space-y-1">
                <label htmlFor="userId" className="block text-sm font-medium">
                  User ID <span className="text-[#d90d2b]">*</span>
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  title="Enter User ID"
                  autoFocus
                  required
                  disabled={status === "loading"}
                  aria-invalid={status === "error"}
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
                  disabled={status === "loading"}
                  aria-invalid={status === "error"}
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

              {/* ERROR MESSAGE ALERT */}
              {status === "error" && (
                <div
                  role="alert"
                  className="p-3 bg-red-50 text-[#d32f2f] text-sm rounded-md border border-red-100"
                >
                  {errorMessage || "An error occurred."}
                </div>
              )}

              {/* TERMS CHECKBOX */}
              <div className="flex items-start px-2 py-1 bg-transparent">
                <div className="shrink-0">
                  <input
                    type="checkbox"
                    id="agreed"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="h-6 w-6 rounded border-[#8c8c8c] text-[#13499F] focus:ring-[#13499F] transition-all cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-base leading-5">
                  <label htmlFor="agreed" className="text-black select-none">
                    I agree to the next tool <br />
                    Tool{" "}
                  </label>
                  <a
                    href="#"
                    onClick={(e) => e.stopPropagation()}
                    className="font-semibold text-[#13499F] underline hover:no-underline"
                  >
                    Terms & Conditions
                  </a>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full flex justify-center bg-[#13499f] text-white text-[14px] font-semibold border-2 border-[#13499f]-300 px-4 py-3 rounded-lg hover:bg-white hover:text-[#13499f] duration-200 cursor-pointer text-lg focus:outline-none focus:ring-offset-2 focus:ring-[#13499F] disabled:opacity-70 disabled:cursor-not-allowed transition-all`}
              >
                {status === "loading"
                  ? "Authenticating..."
                  : status === "success"
                    ? "Redirecting..."
                    : "Login"}
              </button>
              <div className="w-8 h-0.5 bg-gray-400 my-5 mx-auto rounded-full" />
            </form>

            <div className="flex flex-col gap-2">
              
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: IMAGE CONTAINER */}
        <div className="ml-40 pt-[84px] shrink-0">
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <img
              src={logo.src}
              alt="Login Image"
              className="w-full h-full object-cover"
            ></img>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={<div className="loading">Loading Authentication...</div>}
    >
      <UserLoginPage />
    </Suspense>
  );
}
