'use client';

import { useState } from 'react';

type Category = {
  id: number;
  name: string;
};

type Props = {
  gridLayout?: boolean; // 👈 optional
};

export default function CategoriesLayout({ gridLayout = false }: Props) {
  const categories: Category[] = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Mobile Apps' },
    { id: 3, name: 'UI/UX Design' },
    { id: 4, name: 'Branding' },
  ];

  const [active, setActive] = useState<number>(1);

  return (
    <section className="bg-black text-white py-16">
      <div className="mx-auto max-w-7xl px-4">

        {/* 🔁 Conditional Layout */}
        <div className={gridLayout ? 'grid md:grid-cols-4 gap-8' : ''}>

          {/* LEFT (only if gridLayout) */}
          {gridLayout && (
            <div className="md:col-span-1 border-r border-gray-800 pr-4">
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActive(cat.id)}
                    className={`text-left px-4 py-2 rounded-md border transition
                      ${
                        active === cat.id
                          ? 'border-white text-white'
                          : 'border-transparent text-gray-400 hover:border-gray-600 hover:text-white'
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RIGHT / MAIN CONTENT */}
          <div className={gridLayout ? 'md:col-span-3' : 'text-center'}>
            <div className="p-6 border border-gray-800 rounded-lg">
              
              <h2 className="text-2xl font-semibold mb-4">
                {categories.find((c) => c.id === active)?.name}
              </h2>

              <p className="text-gray-400">
                Content for selected category goes here.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}