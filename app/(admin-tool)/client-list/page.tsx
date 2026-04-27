"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Pagination from "@/app/components/Pagination";
import { Edit, Trash2, Upload, Download } from "lucide-react";
import { useRef } from "react";
import { useLoader } from "@/context/LoaderContext"; 
import Link from "next/link";

export default function ClientListPage() {
  const [client, setClients] = useState([]);
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
            loadClients(page);
        }
    };

    // Fetch project
    async function loadClients(pg=1) {
        try {
            setLoading(true);
            const res = await fetch(`/api/client/list?page=${pg}&pageSize=${pageSize}`);

            console.log({ res });

            const data = await res.json();
            console.log({clientsdata:  data});
            setClients(data.data);
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

  useEffect(() => {
    loadClients();
  }, []);


  // Delete User
  async function handleDelete(id: string) {
    await fetch(`/api/client/${id}`, {
      method: "DELETE",
    });
    loadClients();
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
                  <h1 className="text-[18px] font-semibold mb-4">Client</h1>

             </div>

              <div className="p-6 bg-white rounded shadow ">
                  <div className="pr-2 overflow-y-auto h-[calc(100vh-16.5rem)]">
                  {/* Table */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="w-full table-auto text-sm">
                          <thead className="bg-gray-50 border-b">
                              <tr className="text-sm">
                                {/*<th className="text-left px-4 py-3">#</th>*/}
                                <th className="text-left px-4 py-3">Title</th>
                                <th className="text-left px-4 py-3">link</th>
                                  <th className="text-left px-4 py-3">thumbnail</th>
                                <th className="text-right px-4 py-3"></th>
                            </tr>
                            </thead>

                            <tbody>
                            {client.length === 0 ? (
                                  <tr key={'no-test'}>
                                <td
                                    colSpan={5}
                                    className="text-center py-6 text-gray-500 text-sm"
                                >
                                    No client found.
                                </td>
                                </tr>
                            ) : (
                                client.map((u: any) => (
                                <tr key={u.id} className="border-t border-gray-300 hover:bg-gray-50 text-sm">
                                        {/*<td className="px-4 py-3">{u.tesT_ID}</td>*/}
                                        <td className="px-4 py-3 w-[250px]">{u.title}</td>
                                        <td className="px-4 py-3">{u.link}</td>
                                       
                                        <td className="px-4 py-3">{<img className="bg-black" title={u.title} src={`http://localhost:4000/uploads/${u.image}`} width={50} height={50}/>}</td>

                                        <td className="px-4 py-3 text-right ">
                                            <div className="inline-flex">
                                                <Link href={`/client/${u.id}`}>

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