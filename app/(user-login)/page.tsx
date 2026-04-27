'use client';

import Image from "next/image";
import { Menu } from "lucide-react";
import { useState , useEffect } from "react";
import ClientHeader from "../components/ClientHeader";
import ClientsSection from "../components/ClientSection";
import BranchesSection from "../components/BranchesSection";
import ClientFooter from "../components/ClientFooter";
import Link from "next/link";



type Card = {
  id: number;
  title: string;
  thumbnail: string;
};

const allImages = ['/images/work_1.png','/images/work_2.png','/images/work_3.png','/images/work_4.png','/images/work_5.png','/images/work_6.png']
const allVidoeName = ["THE MANDALORIAN & GROGU","UNDER SALT MARSH", "AVATAR: FIRE AND ASH","PALESTINE 36","THE TESTAMENT OF ANNE LEE","THE DEATH OF BUNNY MUNRO"];

import { useLoader } from "@/context/LoaderContext"; 
const cards: Card[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: allVidoeName[i],
  thumbnail: allImages[i],
}));

export default function HomePage() {
    const [open, setOpen] = useState(false);
    const [client, setClients] = useState([]);
    const { setLoading } = useLoader();
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
   
     const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(10);
        const pageSize = 10;
    
        const handlePageChange = (page:number) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
                loadClients(page);
            }
        };
    
        // Fetch project
        async function loadClients(pg=1) {
            try {
                setLoading(true);
                const res = await fetch(`/api/client/list?page=${pg}&pageSize=${pageSize}`);
    
                console.log({ res });
    
                const data = await res.json();
                console.log({clientsdata:  data});
                setClients(data.data);
                setTotalPages(Math.ceil(data.meta.total / pageSize));
            }
            catch (error: any) {
                setError(true);
                setErrorMessage(error.message);
    
                setTimeout(() => setError(false), 3000);
            }
            finally {
                setLoading(false);
            }
        }
    
      useEffect(() => {
        loadClients();
      }, []);
    
    

  return (
    <main className="bg-black min-h-screen text-white">

    

      {/* Banner Section */}
      <section className="relative w-full h-700px] md:h-[700px]">
        <Image
          src={"/images/reel_first_scene_-_to_be_.png"}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />

          <ClientHeader/>

        {/* Optional Title */}
        <div className="absolute bottom-6 left-8 z-10">
            <Link href="/work">
          <h1 className="text-2xl md:text-4xl font-bold border border-white">
            WORK
          </h1>
          </Link>
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
              className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-95 transition-transform duration-300"
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
                <p className="text-xl font-medium line-clamp-2">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

       {/* Grid Section */}
      <ClientsSection clients={client} />

      {/* Branches Section */}
      <BranchesSection/>

      {/* Footer for a social media  */}
      <ClientFooter/>
    </main>
  );
}