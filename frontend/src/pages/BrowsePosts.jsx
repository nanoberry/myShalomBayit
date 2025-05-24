import { useEffect, useState } from "react";
import axios from "axios";

export default function BrowsePosts() {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    religiosity_level: "",
    min_roommates: "",
    max_roommates: "",
    sex_category: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const cleanParams = Object.fromEntries(
  Object.entries(filters).filter(([_, v]) => v !== "")
);

const response = await axios.get("http://localhost:8000/posts", {
  params: cleanParams,
});
    setPosts(response.data);
  };

  const handleChange = (e) =>
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFilter = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Browse Posts</h1>

      <form onSubmit={handleFilter} className="grid gap-2 mb-6">
        <select name="city" onChange={handleChange} className="border p-2">
          <option value="">Any City</option>
          <option value="tel_aviv">Tel Aviv</option>
          <option value="ramat_gan">Ramat Gan</option>
          <option value="herzliya">Herzliya</option>
          <option value="givat_shmuel">Givat Shmuel</option>
        </select>

        <select name="religiosity_level" onChange={handleChange} className="border p-2">
          <option value="">Any Religiosity</option>
          <option value="shomer_shabbat">Shomer Shabbat</option>
          <option value="shomer_kashrut">Shomer Kashrut</option>
          <option value="kosher_style">Kosher-style</option>
          <option value="doesnt_care">Doesn't care</option>
        </select>

        <select name="sex_category" onChange={handleChange} className="border p-2">
          <option value="">Any Sex</option>
          <option value="male">Male only</option>
          <option value="female">Female only</option>
          <option value="either">Either</option>
        </select>

        <input
          name="min_roommates"
          type="number"
          placeholder="Min roommates"
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="max_roommates"
          type="number"
          placeholder="Max roommates"
          onChange={handleChange}
          className="border p-2"
        />

        <button className="bg-blue-600 text-white p-2 rounded">Search</button>
      </form>

      <ul className="grid gap-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 shadow rounded">
            <p><strong>Type:</strong> {post.post_type}</p>
            <p><strong>City:</strong> {post.city}</p>
            <p><strong>Roommates:</strong> {post.num_roommates}</p>
            <p><strong>Religiosity:</strong> {post.religiosity_level}</p>
            <p><strong>Sex Category:</strong> {post.sex_category}</p>
            <p><strong>Description:</strong> {post.apartment_description}</p>
            <p><strong>Contact:</strong> {post.contact_info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
