import { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [form, setForm] = useState({
    post_type: "has_apartment",
    apartment_description: "",
    room_description: "",
    contact_info: "",
    num_roommates: 2,
    religiosity_level: "shomer_shabbat",
    city: "tel_aviv",
    street_name: "",
    street_number: "",
    sex_category: "either",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/posts/", form);
      alert("Post created!");
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>

      {Object.entries(form).map(([key, val]) => (
        key !== "post_type" ? (
          <input
            key={key}
            name={key}
            placeholder={key.replace("_", " ")}
            value={val}
            onChange={handleChange}
            className="block w-full border p-2 mb-2"
          />
        ) : null
      ))}

      <button className="bg-blue-600 text-white p-2 mt-2 rounded" type="submit">
        Submit Post
      </button>
    </form>
  );
}
