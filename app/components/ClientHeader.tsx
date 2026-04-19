'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function ClientHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black text-white">
        <div className="flex items-center justify-between px-4 py-3">
          
          {/* Logo */}
          <div className="text-lg font-semibold">
             <Image
                                src={"/images/admin-logo.jpeg"}
                                alt="Banner"
                                width={20}
                                height={20}
                                className="w-20 h-10"
                            />
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1.5"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-6 bg-white"></span>
            <span className="h-0.5 w-6 bg-white"></span>
            <span className="h-0.5 w-6 bg-white"></span>
          </button>
        </div>
      </header>

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
                                src={"/images/white-logo.jpeg"}
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