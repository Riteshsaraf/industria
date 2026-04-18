"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyClass() {
  const pathname = usePathname();
  const adminPaths = ["/home", "/category", "/category-list","/company","/project","/project-list"];

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