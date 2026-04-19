export default function BranchesSection() {
  const branches = [
    {
      city: 'LONDON',
      email: 'london@example.com',
      phone: '+44 123 456 789',
      address: '221B Baker Street, London, UK',
      address1: '221B Baker Street, London, UK',
      map: 'https://www.google.com/maps?q=London&output=embed',
    },
    {
      city: 'NEW YORK',
      email: 'newyork@example.com',
      phone: '+1 987 654 321',
      address: '5th Avenue, New York, NY, USA',
       address1: '5th Avenue, New York, NY, USA',
      map: 'https://www.google.com/maps?q=New+York&output=embed',
    },
  ];

  return (
    <section className="bg-black text-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        
       
        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="rounded-lg bg-black p-6 shadow-md"
            >
              {/* City */}
              <h3 className="text-xl font-bold mb-4">
                {branch.city}
              </h3>

              {/* Contact Info */}
              <div className="space-y-2 text-gray-300 mb-4">
                <p>
                  📧 {branch.email}
                </p>
                <p>
                  📞 {branch.phone}
                </p>
              </div>

              {/* Address */}
              <p className="text-gray-400 mb-4">
                {branch.address}
                <br/>
                {branch.address1}
              </p>
              
              {/* Map */}
              <div className="w-full h-84 overflow-hidden rounded-md border border-gray-800">
                <iframe
                  src={branch.map}
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