import Image from 'next/image';

const clients = [
  { id: 1, src: 'https://picsum.photos/200/100?1', alt: 'Client 1' },
  { id: 2, src: 'https://picsum.photos/200/100?2', alt: 'Client 2' },
  { id: 3, src: 'https://picsum.photos/200/100?3', alt: 'Client 3' },
  { id: 4, src: 'https://picsum.photos/200/100?4', alt: 'Client 4' },
  { id: 5, src: 'https://picsum.photos/200/100?5', alt: 'Client 5' },
  { id: 6, src: 'https://picsum.photos/200/100?6', alt: 'Client 6' },
];

export default function ClientsSection() {
  return (
    <section className="bg-black text-white py-16 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 text-center">
        

        {/* Description */}
        <p className="mx-auto mb-10 max-w-2xl text-gray-400">
          We’ve had the privilege of working with a diverse range of clients,
          delivering high-quality solutions tailored to their needs. Our focus
          is on building long-term relationships and creating impactful results.
        </p>

        {/* Logos grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center"
            >
              <Image
                src={client.src}
                alt={client.alt}
                width={120}
                height={60}
                className="object-contain opacity-70 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}