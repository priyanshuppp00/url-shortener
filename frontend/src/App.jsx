import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white shadow p-4 flex justify-between">
          <div className="text-lg font-bold">Priyanshu's URL Shortener</div>
          <div className="space-x-4">
            <Link to="/" className="text-blue-600">
              Home
            </Link>
            <Link to="/admin" className="text-blue-600">
              Admin
            </Link>
          </div>
        </nav>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
