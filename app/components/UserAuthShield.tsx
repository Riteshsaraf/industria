"use client";

import { useUserAuth } from "@/context/UserAuthContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function UserAuthShield({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useUserAuth();
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();
  const isPublicRoute = pathname === "/";

  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true);
      const timer = setTimeout(() => setIsExiting(false), 300);
      return () => clearTimeout(timer);
    }
  });

  if (isLoading && pathname !== "/") {
    return (
      <div
        className={`fixed inset-0 z-9999 flex items-center justify-center bg-white ${isExiting ? "fade-out" : ""}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="animate=spin rounded-full h-12 w-12 border-b-2 border-[#003b95]"></div>
          <p className="text-sm text-black font-medium">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isPublicRoute && !user) {
    return null;
  }

  return <>{children}</>;
}
