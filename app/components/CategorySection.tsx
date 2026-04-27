import { useState } from "react";
import ClientHeader from "./ClientHeader";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";


type Category = {
  id: number;
  name: string;
  subCategories?: Category[],
  open?: boolean
};

type Props = {
  activeId?: string; // 👈 optional
};

  const categories = [
    {
        "id" :1,
        "name": "PRODUCTION",
        "subCategories" : [
            {"id": 1, "name" : "BTS"},
            {"id": 2, "name" : "CONTENT DAYS"},
            {"id": 3, "name" : "JUNKETS"},
            {"id": 4, "name" : "EVENTS"},
            {"id": 5, "name" : "PODCASTS"}
        ],
        open: false
    },
    {
         "id" :2,
        "name": "DIGITAL/SOCIAL",
        "subCategories": [],
        open: false
    },
   {
     "id" :3,
         "name" : "CREATORS",
         "subCategories": [],
         open: false
   },
   {
     "id" :4,
        "name" : "TRAILERS",
        "subCategories": [],
        open: false
   },
   {
        "id" :5,
        "name" : "PHYSICAL MEDIA",
        "subCategories": [],
        open: false
   },
   {
        "id" :6,
        "name" : "ORIGINALS",
        "subCategories": [],
        open: false
   },
  ]

export default function CategorySection({ activeId = "1" }: Props) {
    const [allCategories, setAllCategories] = useState<Category[]>(categories);
    const [activeCategory, setActiveCategory] =  useState<Category>(categories[0]);
   
    const setOpen = (index:number, open:boolean)=>{
          setAllCategories((prev)=>
              prev.map((item, i) =>
                i === index ? { ...item, open } : item
            )
          );
    }
     
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
                       <Link key={index} href={`/work/${item.id}`} 
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