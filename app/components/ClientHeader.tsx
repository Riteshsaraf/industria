'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import Link from "next/link";

export default function ClientHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header */}
     
        <div className="flex items-center justify-between px-6">
          
          {/* Logo */}
          <div className="text-lg font-semibold relative top-0 left-0 px-6 py-2">
             <Link href="/">
             <Image className="py-6"
                                src={"/images/logo_studios_medium_cente.png"}
                                alt="Banner"
                                width={301}
                                height={59}
                            />
                            </Link>
          </div>

          {/* Hamburger */}
          <div className="relative w-62px  text-white top-0 right-0 -mt-7">
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col gap-2"
            aria-label="Open menu"
          >
            <span className="h-1 rounded-lg w-10 bg-white"></span>
            <span className="h-1 rounded-lg w-10 bg-white"></span>
            <span className="h-1 rounded-lg w-10 bg-white"></span>
          </button>
          </div>
        </div>
     
      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          
          {/* Modal Box */}
          <div className=" w-full rounded-xl p-6 text-center shadow-xl">
            
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Menu Items */}
            <nav className="flex flex-col gap-2 mt-6 font-bold">
                <a href="#" className="hover:text-gray-400 transition">
                    <Image
                                src={"/images/shadow.png"}
                                alt="Banner"
                                width={50}
                                height={50}
                            />
                </a>
              <a href="#" className="hover:text-gray-400 transition">WORK</a>
              <a href="#" className="hover:text-gray-400 transition">ABOUT</a>
              <a href="#" className="hover:text-gray-400 transition">CONTACT</a>
            </nav>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}