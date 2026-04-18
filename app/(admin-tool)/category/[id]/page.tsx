"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "@/app/components/Sidebar";
import { useLoader } from "@/context/LoaderContext";
import { useParams } from "next/navigation";

type Params = {
    id: string
}

export default function CategoryPage() {

    const { setLoading } = useLoader();
    const [loading, setLoadingState] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [parentCategory, setParentCategory] = useState([]);
    const params = useParams<Params>();
    const id = params.id as string;
    const inputRef = useRef<HTMLInputElement>(null);

      const [form, setForm] = useState({
            name: "",
            description: "",
            slug: "",
            parentId : ""
      });


    // Fetch providerTypes
    async function loadparentCategory() {
        try {
            setLoading(true);
            const res = await fetch("/api/category/list");

            console.log({ res });

            const data = await res.json();
            setParentCategory(data.data);
            // setForm((prev)=>({...prev,parentId : data.data[0].id}));
        }
        catch (error: any) {
            setError(true);
            setErrorMessage(error.message);
            setTimeout(() => setError(false), 3000); // hide after 3s
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadparentCategory();
    }, []);


    // Fetch user if edit
    useEffect(() => {
        if (id.toLowerCase() !== 'new') {

            const fetchDetail = async () => {
                const res = await fetch(`/api/category/${id}`);

                console.log({ res });

                const resData = await res.json();
                const data = resData.data;

                setForm({
                    name: data.name,
                    description: data.description,
                    slug: data.slug,
                    parentId: data.parentId
                });
            }

            fetchDetail();
        }
    }, [id]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

  // Create User
  async function handleSubmit(e: any) {
      e.preventDefault();
      
      try {
          setLoading(true);
          setLoadingState(true);

          const formData = JSON.stringify(form);
          const parsedData = JSON.parse(formData);

          if (id.toLowerCase() === 'new') {
              const res = await fetch("/api/category/new", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(parsedData),
              });

              const result = await res.json();

              if (!res.ok) {
                  throw new Error(result.message || "Something went wrong");
              }

              setForm({
                  name: "",
                  description: "",
                  slug: "",
                  parentId: ""
              });

          }
          else {
              //Call an Update api

              const res = await fetch("/api/category/" + params.id, {
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
                      {id !== 'new' ? 'Update Category' : 'Create Category' }
                  </h1>
             </div>
            
            <div className="p-6 bg-white rounded shadow">
                  <form
                      onSubmit={handleSubmit}
                      className=" w-full max-w-md"
                  >
                      <div className="flex flex-col gap-3">
                          <div>
                              <label className="text-sm block mb-1">Name</label>
                          <input
                              ref={inputRef}
                              name="categoryName"
                              value={form.name}
                              onChange={(e) =>
                                  setForm({ ...form, name: e.target.value })
                              }
                              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder="Name"
                              required
                              />
                          </div>

                          <div>
                              <label className="text-sm block mb-1">Category</label>
                                <select
                                    name="parentCategory"
                                    value={form.parentId}
                                    onChange={(e:any) =>
                                        setForm({ ...form, parentId: e.target.value })
                                    }
                                    className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                <option key="select-category" value="select-category" selected>Select category</option>
                                {
                                    parentCategory.map((p:any) => {
                                        return (<option key={p.id} value={p.id}>{p.name}</option>)
                                    })
                                }
                              </select>
                          </div>

                          <div>
                              <label className="text-sm block mb-1">Description</label>
                              <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                    className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Description"
                                    />
                          </div>
                          <div>
                              <label className="text-sm block mb-1">Slug</label>
                             <input
                              ref={inputRef}
                              name="slug"
                              value={form.slug}
                              onChange={(e) =>
                                  setForm({ ...form, slug: e.target.value })
                              }
                              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder="Slug"
                              required
                              />
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