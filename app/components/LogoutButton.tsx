"use client";

import { useUserAuth } from "@/context/UserAuthContext";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const { logout } = useUserAuth();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);

    await logout("manual");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-w rounded-md px-4 py-2 text-sm font-medium text-white bg-[#13499F] hover:bg-[#0f3a80] disabled:opacity-50 transition-colors"
    >
      <LogOut size={18} />
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
