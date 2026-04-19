'use client';

import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import ClientHeader from "../components/ClientHeader";
import ClientsSection from "../components/ClientSection";
import BranchesSection from "../components/BranchesSection";
import ClientFooter from "../components/ClientFooter";


type Card = {
  id: number;
  title: string;
  thumbnail: string;
};

const cards: Card[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Video ${i + 1}`,
  thumbnail: `https://picsum.photos/400/250?random=${i + 1}`,
}));

export default function HomePage() {
    const [open, setOpen] = useState(false);

  return (
    <main className="bg-black min-h-screen text-white">

      <ClientHeader/>

      {/* Banner Section */}
      <section className="relative w-full h-700px] md:h-[700px]">
        <Image
          src="https://picsum.photos/1200/500"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Menu Icon */}
        <div className="absolute top-4 left-4 z-10 cursor-pointer">
          <Menu size={28} />
        </div>

        {/* Optional Title */}
        <div className="absolute bottom-6 left-6 z-10">
          <h1 className="text-2xl md:text-4xl font-bold border border-white">
            WORK
          </h1>
          <h1 className="text-2xl md:text-4xl font-bold">
            CONTACT
          </h1>
        </div>
      </section>

      {/* Grid Section */}
      <section className="p-4 md:p-8 border-b border-gray-100">
       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-[120px] md:h-[300px]">
                <Image
                  src={card.thumbnail}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-2">
                <p className="text-sm font-medium line-clamp-2">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

       {/* Grid Section */}
      <ClientsSection/>

      {/* Branches Section */}
      <BranchesSection/>

      {/* Footer for a social media  */}
      <ClientFooter/>
    </main>
  );
}