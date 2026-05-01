import Image from 'next/image';
import { useEffect, useState } from 'react';
// const clients = [
//   { id: 1, src: 'https://picsum.photos/200/100?1', alt: 'Client 1' },
//   { id: 2, src: 'https://picsum.photos/200/100?2', alt: 'Client 2' },
//   { id: 3, src: 'https://picsum.photos/200/100?3', alt: 'Client 3' },
//   { id: 4, src: 'https://picsum.photos/200/100?4', alt: 'Client 4' },
//   { id: 5, src: 'https://picsum.photos/200/100?5', alt: 'Client 5' },
//   { id: 6, src: 'https://picsum.photos/200/100?6', alt: 'Client 6' },
// ];

type Client = {
  id: number;
  image: string;
  link: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

interface ClientsSectionProps {
  clients: Client[];
}

export default function ClientsSection({ clients, description }: ClientsSectionProps & { description: string }) {

  const [images, setImages] = useState<Client[]>([]);

  console.log({ clients });

  useEffect(() => {
    const newClients =  clients.map(client => {
      client.image = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${client.image}`;
      return client;
    });
    setImages(newClients);
  }, [clients]);

  return (
    <section className="bg-black text-white py-16 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 text-center">
        

        {/* Description */}
        <p className="mx-auto text-xl  mb-10 max-w-2xl text-gray-400">
          {description}

          {/* {process.env.NEXT_PUBLIC_API_URL} */}
        </p>

        {/* Logos grid */}
        {/* <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 items-center">
          {images.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center"
            >
               <Image
                src={client.image}
                alt={client.title}
                width={120}
                height={60}
                className="object-contain opacity-70 hover:opacity-100 transition"
              />
              
            </div>
          ))}
        </div> */}

          <section className="bg-black py-12 px-6">
      <div
        className="
          grid 
          grid-cols-[repeat(auto-fit,minmax(120px,1fr))] 
          gap-8 
          items-center
        "
      >
        {images.map((client) => (
          <div
            key={client.id}
            className="flex justify-center items-center opacity-80 hover:opacity-100 transition"
          >
            <Image
              src={client.image}
              alt={client.title}
              width={120}
              height={60}
              className="object-contain max-h-[40px] w-auto"
            />
          </div>
        ))}
      </div>
    </section>
      </div>
    </section>
  );
}