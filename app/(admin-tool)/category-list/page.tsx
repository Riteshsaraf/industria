"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Pagination from "@/app/components/Pagination";
import { Edit, Trash2, Upload, Download } from "lucide-react";
import { useRef } from "react";
import { useLoader } from "@/context/LoaderContext"; 
import Link from "next/link";

export default function CategoryListPage() {
  const [categoy, setCategory] = useState([]);
    const { setLoading } = useLoader();
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const pageSize = 10;

    const handlePageChange = (page:number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            loadCategories(page);
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();

    };

    const handleUpload = async (f:any) => {
        console.log('handleUploadCalled');
        if (!f) {
            setError(true);
            setErrorMessage("Please select an Excel file");

            setTimeout(() => setError(false), 3000);
            return;
        }
        
        const formData = new FormData();
        formData.append("file", f);

        try {
            setLoading(true);
            setMessage("");

            const res = await fetch(`/api/categoy/import`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const result = await res.json();
                setError(true);
                throw new Error(result.message || "Upload failed");
            }

            const data = await res.json();
            const allRecords = JSON.parse(data.message);
            setMessage(`${allRecords.length} categoy imported successfully`);

            handlePageChange(1);
        } catch (err:any) {
            setErrorMessage(err.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    // Fetch categoy
    async function loadCategories(pg=1) {
        try {
            setLoading(true);
            const res = await fetch(`/api/category/list?page=${pg}&pageSize=${pageSize}`);

            console.log({ res });

            const data = await res.json();
            setCategory(data.data);
            setTotalPages(Math.ceil(data.meta.total / pageSize));
        }
        catch (error: any) {
            setError(true);
            setErrorMessage(error.message);

            setTimeout(() => setError(false), 3000);
        }
        finally {
            setLoading(false);
        }
    }


    // Fetch categoy
    async function exportTests() {
        const res = await fetch(`/api/categoy/export`);

        const blob = await res.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "categoy.xlsx";
        a.click();
    }

  useEffect(() => {
    loadCategories();
  }, []);

    const changeFile = (e: any) => {

        console.log('ChangeFileCalled', e.target.files?.[0]);
        setFile(e.target.files?.[0] || null);
        handleUpload(e.target.files?.[0] || null);
    }

  // Delete User
  async function handleDelete(id: string) {
    await fetch(`/api/category/${id}`, {
      method: "DELETE",
    });
    loadCategories();
  }

  return (

    <div className="flex min-h-screen h-screen">
    
          {/* Sidebar */}
          <Sidebar />

          {message && !error && (
              <div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded shadow-md">
                  {message}
              </div>
          )}


          {error && (
              <div className="fixed top-4 right-4 bg-red-100 border border-red-200 text-red-800 px-4 py-2 rounded shadow-md">
                  {errorMessage}
              </div>
          )}
         
    
          {/* Main Content */}
          <main className="flex-1 bg-gray-100 p-6  ">
             <div className="flex items-center justify-between mb-4">
                  <h1 className="text-[18px] font-semibold mb-4">categoy</h1>

                  <div className="flex justify-end">
                      <input
                          hidden
                          ref={fileInputRef}
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={(e) => changeFile(e)}
                          className="block w-full text-sm"
                      />

                      <button
                          title="Import excel"
                          onClick={() => handleButtonClick()}
                          className={`bg-white mr-2 text-[#13499f] text-[14px] font-semibold border-2 border-[#13499f]-300
                                                 px-4 py-2 rounded-md
                                                 hover:bg-[#13499f] hover:text-white
                                                 transition duration-200 cursor-pointer text-sm`}
                      >
                          <span className="inline-flex"><Upload size={16} className="mt-1 mr-2" />  Import</span>
                      </button>

                      <button
                          title="Export excel"
                          onClick={() => exportTests()}
                          className={`bg-white mr-2 text-[#13499f] text-[14px] font-semibold border-2 border-[#13499f]-300
                                                 px-4 py-2 rounded-md
                                                 hover:bg-[#13499f] hover:text-white
                                                 transition duration-200 cursor-pointer text-sm`}
                      >
                          <span className="inline-flex"><Download size={16} className="mt-1 mr-2" />  Export</span>
                      </button>
                     
                  </div>
                  
             </div>

              <div className="p-6 bg-white rounded shadow ">
                  <div className="pr-2 overflow-y-auto h-[calc(100vh-16.5rem)]">
                  {/* Table */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="w-full table-auto text-sm">
                          <thead className="bg-gray-50 border-b">
                              <tr className="text-sm">
                                {/*<th className="text-left px-4 py-3">#</th>*/}
                                <th className="text-left px-4 py-3">Name</th>
                                <th className="text-left px-4 py-3">Parent Category</th>
                                
                                <th className="text-left px-4 py-3">description</th>
                                  <th className="text-left px-4 py-3">slug</th>
                                <th className="text-right px-4 py-3"></th>
                            </tr>
                            </thead>

                            <tbody>
                            {categoy.length === 0 ? (
                                  <tr key={'no-test'}>
                                <td
                                    colSpan={5}
                                    className="text-center py-6 text-gray-500 text-sm"
                                >
                                    No categoy found.
                                </td>
                                </tr>
                            ) : (
                                categoy.map((u: any) => (
                                <tr key={u.tesT_ID} className="border-t border-gray-300 hover:bg-gray-50 text-sm">
                                        {/*<td className="px-4 py-3">{u.tesT_ID}</td>*/}
                                        <td className="px-4 py-3 w-[250px]">{u.name}</td>
                                        <td className="px-4 py-3">{u.parentCategoryName}</td>
                                       
                                        <td className="px-4 py-3">{u.description}</td>
                                        <td className="px-4 py-3">{u.slug}</td>

                                        <td className="px-4 py-3 text-right ">
                                            <div className="inline-flex">
                                                <Link href={`/category/${u.id}`}>

                                                    <button className="p-1 rounded hover:bg-gray-100 cursor-pointer">
                                                        <Edit size={18} color="#13499f" />
                                                    </button>
                                                </Link>
                                                <button onClick={() => handleDelete(u.id)} className="text-red-500 cursor-pointer">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                    </td>
                                </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                  </div>

                  </div>

                  <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                  />

                  </div>
          </main>
    
        </div>
  );
}