"use client";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ReactNode, useState } from "react";
import { msalConfig } from "../auth/msalConfig";

export default function MsalProviderWrapper({
    children,
}: {
    children: ReactNode;
}) {
    const [msalInstance] = useState(
        () => new PublicClientApplication(msalConfig)
    );

    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
