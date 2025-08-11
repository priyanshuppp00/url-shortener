import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/shorten`, { original_url: url });
      setShort(res.data.short_url);
    } catch (err) {
      alert(err?.response?.data?.error || "Error");
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(short).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Shorten a URL</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/path"
          required
        />
        <button
          className="bg-blue-600 text-white px-4 rounded cursor-pointer hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "Shorting..." : "Shorten"}
        </button>
      </form>

      {short && (
        <div className="mt-4 p-3 bg-slate-50 rounded ">
          <div>Short URL:</div>
          <a
            className="text-blue-600"
            href={short}
            target="_blank"
            rel="noreferrer"
          >
            {short}
          </a>
          <button
            className="ml-4 px-2 py-1 border rounded hover:scale-105 transition cursor-pointer"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
