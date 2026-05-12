'use client';

import Sidebar from '@/app/components/Sidebar';
import { useEffect, useState } from 'react';
import { useLoader } from "@/context/LoaderContext"; 

type Branch = {
  name: string;
  address1: string;
  address2: string;
  email: string;
  contact: string;
};

type SocialLink = {
  type: string;
  link: string;
};

export default function CompanyForm() {
  // -------- Basic Info --------
  const { setLoading } = useLoader();
  const [loading, setLoadingState] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  // -------- Dynamic Fields --------
  const [branches, setBranches] = useState<Branch[]>([
    { name: '', address1: '', address2: '', contact: '', email: '' },
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { type: '', link: '' },
  ]);

  // -------- Image Handler (Base64) --------
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // -------- Branch Handlers --------
  const addBranch = () => {
    setBranches([...branches, { name: '', address1: '', address2:'', contact: '', email: '' }]);
  };

  const removeBranch = (index: number) => {
    setBranches(branches.filter((_, i) => i !== index));
  };

  const handleBranchChange = (
    index: number,
    field: keyof Branch,
    value: string
  ) => {
    const updated = [...branches];
    updated[index][field] = value;
    setBranches(updated);
  };

  // -------- Social Handlers --------
  const addSocial = () => {
    setSocialLinks([...socialLinks, { type: '', link: '' }]);
  };

  const removeSocial = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSocialChange = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  // -------- Submit --------
  const handleSubmit = async () => {
    const payload = {
      name,
      description,
      bannerImage,
      branches,
      socialLinks,
    };

    console.log(payload);

    const res = await fetch("/api/company", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
    }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // hide after 3s
  };


  const loadCompanyInfo = async()=>{
     const res = await fetch("/api/company", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const {data:result} = await res.json();

   setName(result.name);
   setDescription(result.description);
   if(result.branches)
   setBranches(result.branches);

   if(result.socialLinks)
   setSocialLinks(result.socialLinks);
  }


  useEffect(()=>{

    
   loadCompanyInfo();

  },[])
  return (
    <div className="flex min-h-screen h-screen">
        
              {/* Sidebar */}
              <Sidebar />

              {success && (
                  <div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded shadow-md">
                      ✔ Data updated successfully!
                  </div>
              )}
    
              {error && errorMessage && (
                  <div className="fixed top-4 right-4 bg-red-100 border border-red-200 text-red-800 px-4 py-2 rounded shadow-md">
                      {errorMessage}
                  </div>
              )}
        
              {/* Main Content */}
              <main className="flex-1 bg-gray-100 p-6 overflow-y-auto h-[calc(100vh-3.5rem)]">
                  <div className="p-6 bg-white rounded shadow">

      {/* -------- Basic Info -------- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Company Info</h2>

        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              
        />

        {/* bannerImage Upload */}
        <input type="file" accept="image/*" onChange={handleImage} />

        {bannerImage && (
          <img
            src={bannerImage}
            alt="bannerImage Preview"
            className="w-full h-48 object-cover rounded mt-2"
          />
        )}
      </div>

      {/* -------- Branches -------- */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Branches</h2>

        {branches.map((branch, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded mb-4 space-y-2">
            <input
              type="text"
              placeholder="Branch Name"
              value={branch.name}
              onChange={(e) =>
                handleBranchChange(index, 'name', e.target.value)
              }
              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              
            />

            <input
              type="text"
              placeholder="Address"
              value={branch.address1}
              onChange={(e) =>
                handleBranchChange(index, 'address1', e.target.value)
              }
             className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              
            />

             <input
              type="text"
              placeholder="Address"
              value={branch.address2}
              onChange={(e) =>
                handleBranchChange(index, 'address2', e.target.value)
              }
             className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              
            />


<input
              type="text"
              placeholder="Email"
              value={branch.email}
              onChange={(e) =>
                handleBranchChange(index, 'email', e.target.value)
              }
             className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              
            />

            <input
              type="text"
              placeholder="Contact Number"
              value={branch.contact}
              onChange={(e) =>
                handleBranchChange(index, 'contact', e.target.value)
              }
              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              
            />

            <button
              onClick={() => removeBranch(index)}
              className="text-red-500 text-sm"
            >
              Remove Branch
            </button>
          </div>
        ))}

        <button
          onClick={addBranch}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
        >
          + Add Branch
        </button>
      </div>

      {/* -------- Social Links -------- */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Social Links</h2>

        {socialLinks.map((social, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded mb-4 space-y-2">
            <select
        value={social.type}
        onChange={(e) => handleSocialChange(index, 'type', e.target.value)}
         className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
             >
        <option value="" selected disabled>Select platform</option>
        <option value="instagram">Instagram</option>
        <option value="facebook">Facebook</option>
        <option value="twitter">Twitter</option>
        <option value="linkedin">LinkedIn</option>
        <option value="youtube">YouTube</option>
      </select>

            <input
              type="text"
              placeholder="Link"
              value={social.link}
              onChange={(e) =>
                handleSocialChange(index, 'link', e.target.value)
              }
              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              
            />

            <button
              onClick={() => removeSocial(index)}
              className="text-red-500 text-sm"
            >
              Remove Social
            </button>
          </div>
        ))}

        <button
          onClick={addSocial}
          className="bg-green-500 text-white px-4 py-2 rounded mb-5"
        >
          + Add Social Link
        </button>
      </div>

      {/* -------- Submit -------- */}
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-3 rounded"
      >
        Submit Company
      </button>
    </div>
              </main>
        
            </div>
    

  );
}