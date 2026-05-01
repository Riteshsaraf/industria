'use client';

import Image from "next/image";

export default function BranchesSection({ branches }: { branches: any[] }) {
  // const branches = [
  //   {
  //     city: 'LONDON',
  //     email: 'london@example.com',
  //     phone: '+44 123 456 789',
  //     address: '221B Baker Street, London, UK',
  //     address1: '221B Baker Street, London, UK',
  //     map: 'https://www.google.com/maps?q=London&output=embed',
  //   },
  //   {
  //     city: 'NEW YORK',
  //     email: 'newyork@example.com',
  //     phone: '+1 987 654 321',
  //     address: '5th Avenue, New York, NY, USA',
  //      address1: '5th Avenue, New York, NY, USA',
  //     map: 'https://www.google.com/maps?q=New+York&output=embed',
  //   },
  // ];

  console.log({ branches });

  return (
    <section className="bg-black text-white py-16" id="branches">
      <div className="mx-auto max-w-7xl px-4">
        
       
        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="rounded-lg bg-black p-6 shadow-md"
            >
              {/* City */}
              <h2 className="text-2xl font-bold mb-4">
                {branch.city}

              </h2>

              {/* Contact Info */}
              <div className="relative space-y-2 text-gray-300 mb-4">
                <p>
                  📧 {branch.email}
                </p>
                <p>
                  📞 {branch.contact}

                  {
                  index==1 && (
                    <Image
                      src={"/images/sticker.png"}
                      alt="branch sticker"
                      width={100}
                      height={100}
                      className="absolute top-20 z-10 right-0"
                    />
                  ) 
                }
                </p>
              </div>

              {/* Address */}
              <p className="text-gray-400 mb-4">
                {branch.address}

                
                <br/>
                {branch.address1}

                
              </p>

              
              
              {/* Map */}
              <div className="relative w-full h-84 overflow-hidden rounded-md border border-gray-800">
                <iframe
                  src={branch.map || `https://www.google.com/maps?q=${branch.name}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />


              

               
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}