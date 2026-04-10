"use client"

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

// Types
type AccordionContextType = {
  openItems: string[];
  toggleItem: (value: string) => void;
};

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
  allowMultiple?: boolean; // Setting to false as dont want multiple sections open at once
};

type AccordionItemProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
};

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

type AccordionContentProps = {
  children: React.ReactNode;
  className?: string;
};

// Context
const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);
const AccordionItemContext = createContext<{ value: string } | undefined>(
  undefined,
);

// Components
// 1. Root Component
export function Accordion({
  children,
  className,
  allowMultiple = false,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return allowMultiple ? [...prev, value] : [value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div
        className={cn(
          "w-full divide-y divide-gainsboro-200 border-t border-b border-gainsboro-200",
          className,
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// 2. Item Component (row)

export function AccordionItem({
  children,
  value,
  className,
}: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn("group overflow-hidden", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

// 3. Trigger Component (clickable header)
export function AccordionTrigger({
  children,
  className,
}: AccordionTriggerProps) {
  const { openItems, toggleItem } = useContext(AccordionContext)!;
  const { value } = useContext(AccordionItemContext)!;
  const isOpen = openItems.includes(value);

  return (
    <button
      onClick={() => toggleItem(value)}
      className={cn(
        "flex w-full items-center justify-between px-4 py-5 text-left text-md font-semibold text-grey-900 transition-colors hover:bg-gray-100 focus:outline-none",
        className,
      )}
      aria-expanded={isOpen}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "h-4 w-4 shrink-0 text-gray-500 transition-transform duration-300 ease-in-out",
          isOpen ? "-rotate-180" : "rotate-0",
        )}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

// 4. Content Component (expandable body)
export function AccordionContent({
  children,
  className,
}: AccordionContentProps) {
  const { openItems } = useContext(AccordionContext)!;
  const { value } = useContext(AccordionItemContext)!;
  const isOpen = openItems.includes(value);

  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "px-4 pb-5 pt-1 text-base text-gray-600 font-normal leading-relaxed transition-transform duration-300 ease-in-out",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
