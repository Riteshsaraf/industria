'use client';

import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import ClientsSection from "@/app/components/ClientSection";
import ClientFooter from "@/app/components/ClientFooter";
import CategorySection from "@/app/components/CategorySection";
import BranchesSection from "@/app/components/BranchesSection";
import ClientHeader from "@/app/components/ClientHeader";
import CategoriesLayout from "@/app/components/CategoriesLayout";

type Card = {
  id: number;
  title: string;
  thumbnail: string;
};

const allImages = ['/images/work_1.png','/images/work_2.png','/images/work_3.png','/images/work_4.png','/images/work_5.png','/images/work_6.png']
const allVidoeName = ["THE MANDALORIAN & GROGU","UNDER SALT MARSH", "AVATAR: FIRE AND ASH","PALESTINE 36","THE TESTAMENT OF ANNE LEE","THE DEATH OF BUNNY MUNRO"];

const cards: Card[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: allVidoeName[i],
  thumbnail: allImages[i],
}));


export default function ContentPage() {
    const [open, setOpen] = useState(false);

  return (
    <main className="bg-black min-h-screen text-white">

     <ClientHeader/>

     <CategorySection/>

      {/* Grid Section */}
      <section className="p-2 md:p-2 border-b border-gray-100">
     
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

    </main>
  );
}