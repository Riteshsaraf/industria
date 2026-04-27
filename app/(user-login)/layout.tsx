"use client";

import { UserAuthProvider, useUserAuth } from "@/context/UserAuthContext";
import { UserAuthShield } from "@/app/components/UserAuthShield";
import { LoaderProvider } from "@/context/LoaderContext";

export default function ExternalUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoaderProvider>
        <div>{children}</div>
         </LoaderProvider>
  );
}
