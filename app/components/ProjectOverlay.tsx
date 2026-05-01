'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function ProjectOverlay({ projectInfo }: { projectInfo: any; }) {
  const [open, setOpen] = useState(false);


  useEffect(() => {

    setOpen(true);
  }, [projectInfo]);

  return (
    <>
     
      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          
          {/* Modal Box */}
          <div className=" w-full rounded-xl p-6 text-center shadow-xl">
            
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={18} className="cursor-pointer"/>
            </button>

            {/* Menu Items */}
            <div className="relative w-full max-w-5xl h-[600px] rounded-2xl overflow-hidden group">
                  <div key={projectInfo.id}
                        className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-95 border border-transparent hover:border-white transition-transform duration-300"
                    >
                        <div className="relative w-max-300px h-[240px] md:h-[300px] px-20 py-20">
                        <Image
                           src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/uploads/${projectInfo.thumbnail}`}
                            alt={projectInfo.title}
                            fill
                        />
                        </div>
        
                        <div className="p-2">
                        <p className="text-xl font-medium line-clamp-2">
                            {projectInfo.title}
                        </p>
                        </div>
                    </div>
            </div>
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