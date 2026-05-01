import { useEffect, useState } from "react";
import ClientHeader from "./ClientHeader";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";


type Category = {
  id: number;
  name: string;
  subCategories?: Category[],
  open?: boolean
  slug: string;
};

type Props = {
  activeId?: string; // 👈 optional,
  categories?: Category[]
};


export default function CategorySection({ activeId = "1", categories }: Props) {
    const [allCategories, setAllCategories] = useState<Category[]>(categories ?? []);
    const [activeCategory, setActiveCategory] = useState<Category | undefined>(categories?.[0]);
   
    const setOpen = (index:number, open:boolean)=>{
          setAllCategories((prev)=>
              prev.map((item, i) =>
                i === index ? { ...item, open } : item
            )
          );
    }

    useEffect(() => {
        setAllCategories(categories ?? []);
        setActiveCategory(categories?.[0]);
    }, [categories]);
     
  return (
    <section className="bg-black text-white pb-10 ">

      <ClientHeader/>

      <div className="mx-auto max-w-7xl px-4 text-center">
        
        {/* Category list */}
        <div className="flex flex-col items-center gap-0 font-bold">
          {allCategories.map((item, index) => (
            <>
              <div
              key={index}
              onClick={(e)=>{
                setActiveCategory(item);
                setOpen(index, !item.open)
              }}
              className={!activeId ?  `text-lg md:text-xl text-gray-300 border border-transparent text-gray-300 transition rounded-md cursor-pointer` : `text-lg md:text-xl text-gray-300 border border-transparent hover:text-white hover:border-white transition rounded-md cursor-pointer`}
            >
              {item.name}
            </div>
            {
                   item.open &&  item.subCategories && item?.subCategories.map((item, index) => (
                       <Link key={index} href={`/work/${item.slug}`} 
                       className="text-sm md:text-sm text-gray-300 border border-transparent hover:text-white hover:border-white transition rounded-md cursor-pointer">
                         {item.name}
                          
                       </Link>
                  ))
            }
            </>
          ))}
        </div>
      </div>
    </section>
  );
}