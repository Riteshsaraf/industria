"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyClass() {
    const pathname = usePathname();
    const adminPaths = ["/home", "/form-builder", "/form-list", "/form-requisition",  "/patient-form-requisition", "/link-form", "/link-form-list", "/provider-types", "/provinces", "/test-catalogue", "/test-catalogue-list", "/test-list", "/tests"];

    console.log({ pathname });

  useEffect(() => {
    // remove old class
      document.body.className = "";

      const isAdminPath = adminPaths.some(path => pathname.startsWith(path));

    // add new class
      if (isAdminPath) {
        document.body.classList.add("dashboard-body");
        document.body.classList.add("overflow-hidden");

        //document.body.classList.add(poppins.className);
    } else {
      document.body.classList.add("px-20");
    }
  }, [pathname]);

  return null;
}