"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AdminAuthContext";
import Image from 'next/image';


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
 const { user, logout, isAuthenticated } = useAuth()
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const hideNavbarFor: string[] = ['login'];

    console.log({ hideNavbarFor });

    let pathArraysInclude = false;
    let pathHide = (): boolean => {
        pathname.split('/').forEach(a => {
            if (hideNavbarFor.includes(a)) {
                pathArraysInclude = true;
            }
        });

        console.log({ pathArraysInclude });

        return pathArraysInclude;
    }        



    const hideNavbar = pathHide() ;

  return (
    <>
      {!hideNavbar && (<nav className="w-full h-14 px-2 py-2 bg-black text-white flex items-center justify-between">
           <Image
                    src="/images/admin-logo.jpeg"
                    alt="Banner"
                    width={20}
                    height={20}
                    className="w-20 h-10"
                />

              <div className="relative">
                  {/* Toggle button */}
                  <button
                      onClick={() => setOpen(!open)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg
               hover:bg-gray-100 hover:text-black transition"
                  >
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                              <path d="M4 20c0-4 4-6 8-6s8 2 8 6"
                                  stroke="currentColor" strokeWidth="2" />
                          </svg>
                      </div>

                      {/* Name (optional) */}
                     

                      {isAuthenticated ? (
                         <>
                             <span>Welcome {user?.name}</span>
                          </>
                      ) : (
                         <span>Not logged in</span>
                     )}

                      {/* Arrow */}
                      <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                      >
                          <path d="M6 9l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round" />
                      </svg>
                  </button>

                  {/* Dropdown */}
                  {
                      open && (
                          <div
                              className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg
               border border-gray-200 shadow-lg"
                          >
                              <a
                                  href="#"
                                  className="block px-4 py-2 text-sm
                 hover:bg-gray-50"
                              >
                                  FAQ
                              </a>
                             

                              <a
                                  href="#"

                                  onClick={logout}
                                  className="block px-4 py-2 mt-2 text-sm 
                 hover:bg-gray-50 border-t border-gray-300"
                              >
                                  Sign out
                              </a>
                          </div>
                      )
                  }
              </div>

        </nav>)}
      {children}
    </>
  );
}