'use client';

import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import CategorySection from "@/app/components/CategorySection";
import { useLoader } from "@/context/LoaderContext";

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
    const [client, setClients] = useState([]);
         const [projects, setProjects] = useState<Card[]>([]);
         const [categories, setCategories] = useState([]);
    const { setLoading } = useLoader();
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    // Fetch project
        async function loadCategories(pg=1) {
            try {
                setLoading(true);
                const res = await fetch(`/api/category/list?page=${pg}&pageSize=30`);
    
                console.log({ res });
    
                const data = await res.json();
                console.log({categoriesdata:  data});

                let categoriesWithSubCategories = data.data.map((category: any) => {
                    category.subCategories = data.data.filter((subCategory: any) => subCategory.parentId === category.id) || [];
                    return category;
                });
                categoriesWithSubCategories = categoriesWithSubCategories.filter((category: any) => !category.parentId);
                console.log({categoriesWithSubCategories});
                setCategories(categoriesWithSubCategories);
            }
            catch (error: any) {
              // no error handling for now
            }
            finally {
                setLoading(false);
            }
        }
    

    // Fetch project
        async function loadProjects(pg=1) {
            try {
                setLoading(true);
                const res = await fetch(`/api/project/list?page=${pg}&pageSize=6`);
    
                console.log({ res });
    
                const data = await res.json();
                console.log({projectsdata:  data});
                setProjects(data.data);
            }
            catch (error: any) {
              // no error handling for now
            }
            finally {
                setLoading(false);
            }
        }
    

        useEffect(() => {
            loadProjects();
            loadCategories();
            
        }, []);

  return (
    <main className="bg-black min-h-screen text-white">

     
     <CategorySection categories={categories}/>

      {/* Grid Section */}
      <section className="p-2 md:p-2 border-b border-gray-100">
     
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {projects.map((card) => (
            <div
              key={card.id}
              className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative w-full h-[120px] md:h-[300px]">
                <Image
                 src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/uploads/${card.thumbnail}`}
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