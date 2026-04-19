"use client";

import { UserAuthProvider, useUserAuth } from "@/context/UserAuthContext";
import { UserAuthShield } from "@/app/components/UserAuthShield";

export default function ExternalUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
        <div>{children}</div>
  );
}
