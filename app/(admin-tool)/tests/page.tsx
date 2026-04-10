"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { Plus, GripVertical, Trash2, Import } from "lucide-react";
import { useRef } from "react";

export default function TestsPage() {
  const [tests, setTests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const [form, setForm] = useState({
    TEST_NAME: "",
    TEST_COMMENTS: "",
    TEST_CATEGORY_ID: 1,
    TEST_MNEMONIC_CODE: "",
    TEST_SCHEDULE_CODE: "",
    TEST_PRICE: 0,
  });

  const handleUpload = async (f: any) => {
    console.log("handleUploadCalled");
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

      const res = await fetch('/api/test/import', {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setError(true);
        setErrorMessage("Upload failed");

        setTimeout(() => setError(false), 3000);

        return;
      }

      const data = await res.json();
      setMessage(`Imported ${data.length} records successfully`);
    } catch (err) {
      setMessage("Something went wrong while importing");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tests
  async function loadTests() {
    const res = await fetch('/api/tests');

    console.log({ res });

    const data = await res.json();
    setTests(data.tests);
  }

  useEffect(() => {
    loadTests();
  }, []);

  const changeFile = (e: any) => {
    console.log("ChangeFileCalled", e.target.files?.[0]);
    setFile(e.target.files?.[0] || null);
    handleUpload(e.target.files?.[0] || null);
  };

  // Create User
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = JSON.stringify(form);
    const parsedData = JSON.parse(formData);

    await fetch('/api/tests', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedData),
    });

    setLoading(false);
    setShowForm(false);
    setForm({
      TEST_NAME: "",
      TEST_COMMENTS: "",
      TEST_CATEGORY_ID: 1,
      TEST_MNEMONIC_CODE: "",
      TEST_SCHEDULE_CODE: "",
      TEST_PRICE: 0,
    });
    loadTests();
  }

  // Delete User
  async function handleDelete(id: string) {

    await fetch(`/tests/${id}`, {
      method: "DELETE",
    });
    loadTests();
  }

  return (
    <div className="flex min-h-screen h-screen">
      {/* Sidebar */}
      <Sidebar />

      {message && !error && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded shadow-md">
          ✔ Data imported successfully!
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-200 text-red-800 px-4 py-2 rounded shadow-md">
          {errorMessage}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto h-[calc(100vh-3.5rem)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[18px] font-semibold mb-4">Tests</h1>

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
              <span className="inline-flex">
                <Import size={16} className="mt-1 mr-2" /> Excel
              </span>
            </button>
            <button
              onClick={() => setShowForm(true)}
              className={`bg-white text-[#13499f] text-[14px] font-semibold border-2 border-[#13499f]-300
                                                 px-4 py-2 rounded-md
                                                 hover:bg-[#13499f] hover:text-white
                                                 transition duration-200 cursor-pointer text-sm`}
            >
              + Create Test
            </button>
          </div>
        </div>

        <div className="p-6 bg-white rounded shadow">
          {/* Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-sm">
                  {/*<th className="text-left px-4 py-3">#</th>*/}
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Category</th>

                  <th className="text-left px-4 py-3">Mnemonic Code</th>
                  <th className="text-left px-4 py-3">Schedule Code</th>
                  <th className="text-left px-4 py-3">Test Price</th>
                  <th className="text-left px-4 py-3">Comments</th>
                  <th className="text-right px-4 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {tests.length === 0 ? (
                  <tr key={"no-test"}>
                    <td
                      colSpan={5}
                      className="text-center py-6 text-gray-500 text-sm"
                    >
                      No tests found.
                    </td>
                  </tr>
                ) : (
                  tests.map((u: any) => (
                    <tr
                      key={u.tesT_ID}
                      className="border-t border-gray-300 hover:bg-gray-50 text-sm"
                    >
                      {/*<td className="px-4 py-3">{u.tesT_ID}</td>*/}
                      <td className="px-4 py-3">{u.tesT_NAME}</td>
                      <td className="px-4 py-3">{u.tesT_CATEGORY_NAME}</td>

                      <td className="px-4 py-3">{u.tesT_MNEMONIC_CODE}</td>
                      <td className="px-4 py-3">{u.tesT_SCHEDULE_CODE}</td>
                      <td className="px-4 py-3">{u.tesT_PRICE}</td>
                      <td className="px-4 py-3">{u.tesT_COMMENTS}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="text-red-500 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Create Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-[16px] font-semibold mb-4">Create Test</h3>

                <div className="flex flex-col gap-3">
                  <input
                    name="TEST_NAME"
                    value={form.TEST_NAME}
                    onChange={(e) =>
                      setForm({ ...form, TEST_NAME: e.target.value })
                    }
                    className="w-full rounded border border-[#8C8C8C] px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Name"
                    required
                  />

                  <select
                    name="TEST_CATEGORY"
                    value={form.TEST_CATEGORY_ID}
                    onChange={(e: any) =>
                      setForm({ ...form, TEST_CATEGORY_ID: e.target.value })
                    }
                    className="w-full rounded border border-[#8C8C8C] px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option>panels</option>
                    <option>General</option>
                    <option>Food sensitivity</option>
                  </select>

                  <textarea
                    name="TEST_COMMENTS"
                    value={form.TEST_COMMENTS}
                    onChange={(e) =>
                      setForm({ ...form, TEST_COMMENTS: e.target.value })
                    }
                    className="w-full rounded border border-[#8C8C8C] px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Comments"
                    required
                  />

                  <input
                    name="TEST_MNEMONIC_CODE"
                    value={form.TEST_MNEMONIC_CODE}
                    onChange={(e) =>
                      setForm({ ...form, TEST_MNEMONIC_CODE: e.target.value })
                    }
                    className="w-full rounded border border-[#8C8C8C] px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Mnemonic code"
                    type="text"
                    required
                  />

                  <input
                    name="TEST_SCHEDULE_CODE"
                    value={form.TEST_SCHEDULE_CODE}
                    onChange={(e) =>
                      setForm({ ...form, TEST_SCHEDULE_CODE: e.target.value })
                    }
                    className="w-full rounded border border-[#8C8C8C] px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Schedule code"
                    type="text"
                    required
                  />

                  <input
                    name="TEST_PRICE"
                    value={form.TEST_PRICE}
                    onChange={(e: any) =>
                      setForm({ ...form, TEST_PRICE: e.target.value })
                    }
                    className="w-full rounded border border-[#8C8C8C] px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Price"
                    type="text"
                    required
                  />

                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className={`bg-white text-[#13499f] text-[14px] font-semibold border-2 border-[#13499f]-300
                                                 px-4 py-2 rounded-lg 
                                                 hover:bg-[#13499f] hover:text-white
                                                 transition duration-200 cursor-pointer text-sm`}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`bg-white text-[#13499f] text-[14px] font-semibold border-2 border-[#13499f]-300
                                                 px-4 py-2 rounded-lg 
                                                 hover:bg-[#13499f] hover:text-white
                                                 transition duration-200 cursor-pointer text-sm`}
                    >
                      {loading ? "Creating..." : "Create"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
