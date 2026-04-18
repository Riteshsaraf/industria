"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SmartReq_logo from "@/public/SmartReq_logo.png";

interface NavBarProps {
  userName?: string;
  onLogout: (reason?: any) => void;
  routeLink: string;
  children: React.ReactNode;
}

export default function NavBar({children, userName, onLogout, routeLink}: NavBarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const hideNavbarFor: string[] = ["admin-login", "login", "user"];
  
  console.log({ hideNavbarFor });

  let pathArraysInclude = false;

  let pathHide = (): boolean => {

    console.log({ pathname });
    pathname.split("/").forEach((a) => {
      if (hideNavbarFor.includes(a)) {
        pathArraysInclude = true;
      }
    });

    console.log({ pathArraysInclude });

    return pathArraysInclude;
  };

  const hideNavbar = pathHide();

  return (
    <>
      {!hideNavbar && (
              <nav className="fixed top-0 left-0  w-full h-14 px-2 py-2 bg-black flex items-center justify-between border-b border-gray-300">
          <Link href={routeLink} className="relative flex items-center">
            <img
              src={SmartReq_logo.src}
              className="h-13 w-auto object-contain"
              alt="SmartReqBynext tool"
            />
          </Link>

          <div className="relative">
            {/* Toggle button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg
               hover:bg-gray-100 transition"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 20c0-4 4-6 8-6s8 2 8 6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Name (optional) */}
              <span className="text-sm font-semibold text-[#13499f] hidden sm:block cursor-pointer">
                {userName || "Guest"}
              </span>

              {/* Arrow */}
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {open && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg
               border border-gray-200 shadow-lg"
              >
                <Link
                  href="/faq"
                  className="block px-4 py-2 text-sm
                 hover:bg-gray-50"
                >
                  FAQ
                </Link>

                <Link
                  href="#"
                  className="block px-4 py-2 text-sm 
                 hover:bg-gray-50"
                >
                  Support
                </Link>

                <Link
                  href="#"
                  className="block px-4 py-2 text-sm
                 hover:bg-gray-50"
                >
                  Configurations
                </Link>

                <a
                  onClick={() => {
                    setOpen(false);
                    onLogout();
                  }}
                  className="block px-4 py-2 mt-2 text-sm cursor-pointer 
                 hover:bg-gray-50 border-t border-gray-300"
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </nav>
      )}
      {children}
    </>
  );
}
