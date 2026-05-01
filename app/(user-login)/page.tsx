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
  videoLink?: string;
  categoryId?: number;
  createdAt?: string;
  updatedAt?: string;
};

const allImages = ['/images/work_1.png','/images/work_2.png','/images/work_3.png','/images/work_4.png','/images/work_5.png','/images/work_6.png']
const allVidoeName = ["THE MANDALORIAN & GROGU","UNDER SALT MARSH", "AVATAR: FIRE AND ASH","PALESTINE 36","THE TESTAMENT OF ANNE LEE","THE DEATH OF BUNNY MUNRO"];

import { useLoader } from "@/context/LoaderContext"; 
import ProjectOverlay from "../components/ProjectOverlay";
const cards: Card[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: allVidoeName[i],
  thumbnail: allImages[i],
}));

type Branch = {
  name: string;
  address: string;
  contact: string;
};

type SocialLink = {
  type: string;
  link: string;
};


export default function HomePage() {
    const [open, setOpen] = useState(false);
    const [client, setClients] = useState([]);
     const [projects, setProjects] = useState<Card[]>([]);
    const { setLoading } = useLoader();
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
     const [name, setName] = useState('');
      const [description, setDescription] = useState('');
      const [bannerImage, setBannerImage] = useState<string | null>(null);
      const [activeCard, setActiveCard] = useState<Card | null>(cards[0]);
    
      // -------- Dynamic Fields --------
      const [branches, setBranches] = useState<Branch[]>([
        { name: '', address: '', contact: '' },
      ]);
    
      const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        { type: '', link: '' },
      ]);
   
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
                const res = await fetch(`/api/client/list?page=${pg}&pageSize=30`);
    
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
                setError(true);
                setErrorMessage(error.message);
    
                setTimeout(() => setError(false), 3000);
            }
            finally {
                setLoading(false);
            }
        }
    
        const loadCompanyInfo = async()=>{
            const res = await fetch("/api/company", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

              const {data:result} = await res.json();

            setName(result.name);
            setDescription(result.description);
            setBannerImage(result.bannerImage);
            if(result.branches)
            setBranches(result.branches);

            if(result.socialLinks){
              
              setSocialLinks(result.socialLinks);
            }

            localStorage.setItem("companyInfo", JSON.stringify(result));
          }
        

      useEffect(() => {
        loadClients();
        loadProjects();
        loadCompanyInfo();
      }, []);
    
    

       const scrollToSection = () => {
          const el = document.getElementById("branches");
          el?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        };

  return (
    <main className="bg-black min-h-screen text-white">

    

      {/* Banner Section */}
      <section className="relative w-full h-700px] md:h-[700px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/uploads/${bannerImage}`}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />

          <ClientHeader/>

        {/* Optional Title */}
        <div className="absolute bottom-6 left-8 z-10">
            <Link href="/work">
          <h1 className="text-2xl md:text-4xl font-bold border border-transparent hover:border-white cursor-pointer">
            WORK
          </h1>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold border border-transparent hover:border-white cursor-pointer" onClick={scrollToSection}>
            CONTACT
          </h1>
        </div>
      </section>

      {/* Grid Section */}
      <section className="p-4 md:p-8 border-b border-gray-100">
       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {projects.map((card) => (
            <div
              key={card.id}
              onClick={(e)=>setActiveCard(card)}
              className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-95 border border-transparent hover:border-white transition-transform duration-300"
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
                <p className="text-xl font-medium line-clamp-2">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

       {/* Grid Section */}
      <ClientsSection clients={client}  description={description}/>

      {/* Branches Section */}
      <BranchesSection branches={branches} />

      {/* Footer for a social media  */}
      <ClientFooter socialLinks={socialLinks} />

      <ProjectOverlay projectInfo={activeCard} />
    </main>
  );
}

