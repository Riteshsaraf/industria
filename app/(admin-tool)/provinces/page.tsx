"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";

export default function UsersPage() {
  const [provinces, setProvinces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "User",
  });

  // Fetch provinces
  async function loadProvince() {
    const res = await fetch("/api/provinces");

    console.log({res});

    const data = await res.json();
    setProvinces(data.provinces);
  }

  useEffect(() => {
    loadProvince();
  }, []);

  // Create User
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = JSON.stringify(form);
    const parsedData = JSON.parse(formData);

    delete parsedData.role;

    parsedData.password = '123456';

    await fetch("/api/provinces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedData),
    });

    setLoading(false);
    setShowForm(false);
    setForm({ firstName : "",lastName: "", email: "", role: "User" });
    loadProvince();
  }

  // Delete User
  async function handleDelete(id: string) {
    await fetch(`/api/provinces/${id}`, {
      method: "DELETE",
    });
    loadProvince();
  }

  return (

    <div className="flex min-h-screen">
    
          {/* Sidebar */}
          <Sidebar/>
         
    
          {/* Main Content */}
          <main className="flex-1 bg-gray-100 p-6">
             <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold mb-4">Province</h1>
             {/* <button
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                        >
                            Create User
                        </button> */}
                        </div>
            
            <div className="p-6 bg-white rounded shadow">
                  {/* Table */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">#</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Name</th>
                            </tr>
                            </thead>

                            <tbody>
                            {provinces.length === 0 ? (
                                <tr>
                                <td
                                    colSpan={2}
                                    className="text-center py-6 text-gray-500 text-sm"
                                >
                                    No provinces found.
                                </td>
                                </tr>
                            ) : (
                                provinces.map((u: any) => (
                                <tr key={u.provincE_ID} className="border-t hover:bg-gray-50hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 text-gray-700">{u.provincE_ID}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{u.provincE_NAME}</td>
                                                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                        </div>
            </div>
          </main>
    
        </div>
  );
}