import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BrowsePosts from "./pages/BrowsePosts";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 space-x-4">
          <Link to="/" className="text-blue-600">Home</Link>
          <Link to="/browse" className="text-blue-600">Browse Posts</Link>
          <Link to="/create" className="text-blue-600">Create Post</Link>
          <Link to="/register" className="text-blue-600">Sign Up</Link>
          <Link to="/login" className="text-blue-600">Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1 className="text-2xl font-bold">Welcome to Shalom Bayit 🏠</h1>} />
          <Route path="/browse" element={<BrowsePosts />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
