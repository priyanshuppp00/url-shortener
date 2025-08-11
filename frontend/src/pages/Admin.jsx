import { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [token, setToken] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchList() {
    if (!token.trim()) {
      setError("Please enter an admin token");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin`, {
        headers: { "x-admin-token": token.trim() },
      });
      setRows(res.data);
      setError(null);
    } catch (err) {
      const errorMessage = err?.response?.data?.error || "Failed to load data";
      setError(errorMessage);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">URL Shortener Admin Panel</h1>

      <div className="mb-4 flex gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            setError(null);
          }}
          placeholder="Enter admin token"
          type="password"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition disabled:opacity-50"
          onClick={fetchList}
          disabled={loading || !token.trim()}
        >
          {loading ? "Loading..." : "Load Data"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr>
              <th className="pb-2">Original URL</th>
              <th className="pb-2">Short Code</th>
              <th className="pb-2">Visits</th>
              <th className="pb-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="py-2">
                  <a
                    href={r.original_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {r.original_url.length > 50
                      ? r.original_url.substring(0, 50) + "..."
                      : r.original_url}
                  </a>
                </td>
                <td className="py-2">
                  <a
                    href={`${import.meta.env.VITE_BASE_URL}/${r.short_code}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {r.short_code}
                  </a>
                </td>
                <td className="py-2">{r.visits || 0}</td>
                <td className="py-2">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && !error && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-slate-500">
                  No data to display. Enter a valid admin token and click "Load
                  Data".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
