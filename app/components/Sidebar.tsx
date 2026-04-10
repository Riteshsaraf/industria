"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState<string | null>(null);
     const [isOpen, setIsOpen] = useState(false);

    type menuItem = {
        label: string;
        href?: string;
        children?: menuItem[]
    }

  const menu : menuItem[] = [
    { label: "Home", href: "/home" },
      {
          label: "Tests",
          children: [
              { label: "Create Master Test", href: "/tests/new" },
              { label: "Update Master Test", href: "/test-list" },
          ],
      },
  ];

  return (
      <>
      
          <nav
              className={`text-white transition-all duration-300  bg-white border border-gray-300
        ${isOpen ? "text-[#13499f] w-64" : "w-0"}`}>
             
              {menu.map((item: menuItem) => {

                  const active = item?.href ?  pathname.startsWith(item?.href ?? "") : false;
                  const isOpen = openMenu === item.label;

                  return (
                      <div key={item.label}>
                          {/* Parent menu */}
                          {item.children ? (
                              <button
                                  onClick={() =>
                                      setOpenMenu(isOpen ? null : item.label)
                                  }
                                  className={cn(
                                      "w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm font-medium transition",
                                      active
                                          ? "bg-white"
                                          : "text-[#13499f] hover:bg-[#13499f] hover:text-white"
                                  )}
                              >
                                  <span>{item.label}</span>
                                  <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
                              </button>
                          ) : (
                              <Link
                                  href={item?.href ?? ""}
                                  className={cn(
                                      "block px-4 py-3 rounded-lg text-sm font-medium transition",
                                      active
                                          ? "bg-blue-100 text-[#13499f]"
                                          : "text-[#13499f] hover:bg-[#13499f] hover:text-white"
                                  )}
                              >
                                  {item.label}
                              </Link>
                          )}

                          {/* Sub menu */}
                          {item.children && isOpen && (
                              <div className="ml-4 mt-1 space-y-1">
                                  {item.children.map((sub) => {
                                      const subActive = pathname === sub.href;

                                      return (
                                          <Link
                                              key={sub.label}
                                              href={sub?.href ?? ""}
                                              className={cn(
                                                  "block px-4 py-2 rounded-md text-sm transition",
                                                  subActive
                                                      ? "bg-blue-100 text-[#13499f]"
                                                      : "text-[#13499f] hover:bg-[#13499f] hover:text-white"
                                              )}
                                          >
                                              {sub.label}
                                          </Link>
                                      );
                                  })}
                              </div>
                          )}
                      </div>
                  );
              })}
          </nav>

          {/* Circle Button */}
          <button
              onClick={() => setIsOpen(!isOpen)}
              className={`absolute  top-25 w-12 h-12 rounded-full 
        bg-blue-600 text-white flex items-center justify-center 
        shadow-lg hover:bg-blue-700 transition
        ${isOpen ? "left-58 z-50" : "left-1 z-50"}`}
          >
              {isOpen ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}
          </button>
   </>
  );
}