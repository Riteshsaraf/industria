"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "@/app/components/Sidebar";
import { useLoader } from "@/context/LoaderContext";
import { useParams } from "next/navigation";

type Params = {
    id: string
}

export default function TestsPage() {

    const { setLoading } = useLoader();
    const [loading, setLoadingState] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [testCategories, setTestCategories] = useState([]);
    const [price, setPrice] = useState(1);
    const params = useParams<Params>();
    const id = params.id as string;
    const inputRef = useRef<HTMLInputElement>(null);

      const [form, setForm] = useState({
            TEST_NAME: "",
            TEST_COMMENTS: "",
            TEST_CATEGORY_ID: 1,
            TEST_MNEMONIC_CODE: "",
            TEST_SCHEDULE_CODE: "",
            TEST_PRICE : 1
      });


    // Fetch providerTypes
    async function loadTestCategories() {
        try {
            setLoading(true);
            const res = await fetch("/api/testCategory/list");

            console.log({ res });

            const data = await res.json();
            setTestCategories(data.testCategories);
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
        loadTestCategories();
    }, []);


    // Fetch user if edit
    useEffect(() => {
        if (id.toLowerCase() !== 'new') {
            const fetchDetail = async () => {
                const res = await fetch(`/api/tests/${id}`);

                console.log({ res });

                const resData = await res.json();
                const data = resData.data;

                setForm({
                    TEST_NAME: data.tesT_NAME,
                    TEST_COMMENTS: data.tesT_COMMENTS,
                    TEST_PRICE: data.tesT_PRICE,
                    TEST_MNEMONIC_CODE: data.tesT_MNEMONIC_CODE,
                    TEST_SCHEDULE_CODE: data.tesT_SCHEDULE_CODE,
                    TEST_CATEGORY_ID : data.tesT_CATEGORY_ID
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
              const res = await fetch("/api/tests/new", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(parsedData),
              });

              const result = await res.json();

              if (!res.ok) {
                  throw new Error(result.message || "Something went wrong");
              }

              setForm({
                  TEST_NAME: "",
                  TEST_COMMENTS: "",
                  TEST_CATEGORY_ID: 1,
                  TEST_MNEMONIC_CODE: "",
                  TEST_SCHEDULE_CODE: "",
                  TEST_PRICE: 1
              });

          }
          else {
              //Call an Update api

              const res = await fetch("/api/tests/" + params.id, {
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

    const checkPrice = (value: number) => {

        if (value<=0) {
            setError(true);
            setErrorMessage('Test price should not be negative!');
            setTimeout(() => setError(false), 3000); // hide after 3s

            setPrice(1);
            return;
        }

        setForm({ ...form, TEST_PRICE: value });
    }

    const checkComments = (value: string) => {
        if (value.length > 400) {
            setError(true);
            setErrorMessage('Test comments should not be more than 200 characters!');
            setTimeout(() => setError(false), 3000); // hide after 3s

            return;
        }
        setForm({ ...form, TEST_COMMENTS: value })
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
                      {id !== 'new' ? 'Update Test' : 'Create Test' }
                  </h1>
             </div>
            
            <div className="p-6 bg-white rounded shadow">


                  <form
                      onSubmit={handleSubmit}
                      className=" w-full max-w-md"
                  >
                      <div className="flex flex-col gap-3">
                          <div>
                              <label className="text-sm block mb-1">Test Name</label>
                          <input
                              ref={inputRef}
                              name="TEST_NAME"
                              value={form.TEST_NAME}
                              onChange={(e) =>
                                  setForm({ ...form, TEST_NAME: e.target.value })
                              }
                              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder="Name"
                              required
                              />
                          </div>

                          <div>
                              <label className="text-sm block mb-1">Test Category</label>
                          <select
                              name="TEST_CATEGORY"
                              value={form.TEST_CATEGORY_ID}
                              onChange={(e:any) =>
                                  setForm({ ...form, TEST_CATEGORY_ID: e.target.value })
                              }
                              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                              {
                                  testCategories.map((p:any) => {
                                      return (<option key={p.tesT_CATEGORY_ID} value={p.tesT_CATEGORY_ID}>{p.tesT_CATEGORY_NAME}</option>)
                                  })
                              }
                              </select>
                          </div>

                          <div>
                              <label className="text-sm block mb-1">Test Comments</label>
                          <textarea
                              name="TEST_COMMENTS"
                              value={form.TEST_COMMENTS}
                              onChange={(e: any) =>
                                  checkComments(e.target.value)
                                  
                              }
                              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder="Comments"
                              />
                          </div>

                          <div>
                              <label className="text-sm block mb-1">Test Mnemonic Code</label>
                          <input
                              name="TEST_MNEMONIC_CODE"
                              value={form.TEST_MNEMONIC_CODE}
                              onChange={(e:any) =>
                                  setForm({ ...form, TEST_MNEMONIC_CODE: e.target.value })
                              }
                              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder="Mnemonic code"
                              type="text"
                              required
                              />
                           </div>


                          <div>
                              <label className="text-sm block mb-1">Test Schedule Code</label>
                          <input
                              name="TEST_SCHEDULE_CODE"
                              value={form.TEST_SCHEDULE_CODE}
                              onChange={(e:any) =>
                                  setForm({ ...form, TEST_SCHEDULE_CODE: e.target.value })
                              }
                              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder="Schedule code"
                              type="text"
                              required
                              />
                          </div>

                          <div>
                              <label className="text-sm block mb-1">Test Price</label>
                          <input
                              name="TEST_PRICE"
                              value={price}
                              onChange={(e: any) =>
                                      setPrice(e.target.value)
                              }
                              onBlur={(e: any) => checkPrice(e.target.value)}
                              className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder="Price"
                              type="number"
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