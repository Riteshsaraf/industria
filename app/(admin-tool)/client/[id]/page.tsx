"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "@/app/components/Sidebar";
import { useLoader } from "@/context/LoaderContext";
import { useParams } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
// import { X } from "lucide-react";

type Params = {
    id: string
}

export default function ClientPage() {

    const { setLoading } = useLoader();
    const [loading, setLoadingState] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const params = useParams<Params>();
    const id = params.id as string;
    const inputRef = useRef<HTMLInputElement>(null);

      const [form, setForm] = useState({
            title: "",
            link: "",
            image: "" as string | null
      });
     const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);




    // Fetch user if edit
    useEffect(() => {
        if (id.toLowerCase() !== 'new') {

            const fetchDetail = async () => {
                const res = await fetch(`/api/client/${id}`);

                console.log({ res });

                const resData = await res.json();
                const data = resData.data;

                setForm({
                    title: data.title,
                    link: data.link,
                    image: data.image
                });

                setThumbnailPreview(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${data.image}`);
            }

            fetchDetail();
        }
    }, [id]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);


     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
        setForm((prev)=>({
            ...prev, image : reader.result as string
        }));
        setThumbnailPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
  };

  // Create User
  async function handleSubmit(e: any) {
      e.preventDefault();
      
      try {
          setLoading(true);
          setLoadingState(true);

          const formData = JSON.stringify(form);
          const parsedData = JSON.parse(formData);

          if (id.toLowerCase() === 'new') {
              const res = await fetch("/api/client/new", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(parsedData),
              });

              const result = await res.json();

              if (!res.ok) {
                  throw new Error(result.message || "Something went wrong");
              }

              setForm({
                  title: "",
                  link: "",
                  image: ""
              });

          }
          else {
              //Call an Update api

              const res = await fetch("/api/client/" + params.id, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(parsedData),
              });

              const result = await res.json();

              if (!res.ok) {
                  throw new Error(result.message || "Something went wrong");
              }
          }


          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000); // hide after 3s
      }
      catch (error: any) {
          setError(true);
          setErrorMessage(error.message);
          setTimeout(() => setError(false), 3000); // hide after 3s
      }
      finally {
          setLoading(false);
          setLoadingState(false);
      }
  }
    
  return (

    <div className="flex min-h-screen h-screen">
    
          {/* Sidebar */}
          <Sidebar />

          {success && params.id?.toLowerCase() === 'new' && (
              <div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded shadow-md">
                  ✔ Data saved successfully!
              </div>
          )}

          {success && params.id?.toLowerCase() !== 'NEW' && (
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
             <div className="flex items-center justify-between">
                  <h1 className="text-[18px] font-semibold mb-4">
                      {id !== 'new' ? 'Update Client' : 'Create Client' }
                  </h1>
             </div>
            
            <div className="p-6 bg-white rounded shadow">
                  <form
                      onSubmit={handleSubmit}
                      className=" w-full max-w-md"
                  >
                      <div className="flex flex-col gap-3">
                          <div>
                              <label className="text-sm block mb-1">Title</label>
                                <input
                                    ref={inputRef}
                                    name="title"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({ ...form, title: e.target.value })
                                    }
                                    className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Title"
                                    required
                                    />
                          </div>

                          <div>
                              <label className="text-sm block mb-1">Link</label>
                            <input
                                ref={inputRef}
                                name="link"
                                value={form.link}
                                onChange={(e) =>
                                    setForm({ ...form, link: e.target.value })
                                }
                                className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Link"
                                required
                                />
                          </div>

                        <div>
                              <label className="text-sm block mb-1">thumbail</label>
                              <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                <div className="flex justify-end gap-2 pt-3">
                                    {thumbnailPreview && <Image src={thumbnailPreview}  alt="image Preview" width={150} height={140} className="mt-2 bg-black" />}
                                        {thumbnailPreview && <X className="cursor-pointer top-0 right-0 relative text-red-500" onClick={()=>{
                                            setForm((prev)=>({...prev, image: null}));
                                            setThumbnailPreview(null);  
                                        }} />}
                                </div>
                          </div>

                          
                          <div className="flex justify-end gap-2 pt-3">
                              
                              <button
                                  type="submit"
                                  disabled={loading}
                                  className={`bg-white text-[#13499f] text-[14px] font-semibold border-2 border-[#13499f]-300
                                                 px-4 py-2 rounded-lg 
                                                 hover:bg-[#13499f] hover:text-white
                                                 transition duration-200 cursor-pointer text-sm`}
                              >
                                  {
                                      id == 'new' ? (
                                           loading ? "Creating..." : "Create"
                                      ) : (
                                              loading ? "Updating..." : "Update"
                                      )
                                  }
                              </button>
                          </div>
                      </div>
                  </form>
                 
            </div>
          </main>
    
        </div>
  );
}