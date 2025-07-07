import { useEffect, useState } from "react";
import Select from "react-select";
import API from "../api/api";
import "../Style/Form.css";

function ActorForm({ onCreated }) {
  const [name, setName] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [availableMovies, setAvailableMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]); // ← stores IDs now

  useEffect(() => {
    API.get("/movies")
      .then((res) => setAvailableMovies(res.data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newActor = {
      name,
      image_url,
      movieIds: selectedMovies, 
    };

    try {
      await API.post("/actors", newActor);
      alert("Actor created!");
      onCreated();
      setName("");
      setImageUrl("");
      setSelectedMovies([]);
    } catch (err) {
      console.error("Error creating actor:", err);
      alert("Failed to create actor");
    }
  };

  const movieOptions = availableMovies.map((m) => ({
    value: m.id,
    label: m.title,
  }));

  return (
    <form onSubmit={handleSubmit} className="media-form">
      <h2>Add Actor</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <br />

      <input
        type="text"
        value={image_url}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        required
      />
      <br />

      <label>Choose Movies:</label>
      <Select
        isMulti
        options={movieOptions}
        placeholder="Search & select movies..."
        value={movieOptions.filter((o) => selectedMovies.includes(o.value))}
        onChange={(sel) => setSelectedMovies(sel.map((o) => o.value))}
      />
      <br />

      <button type="submit">Add Actor</button>
    </form>
  );
}

export default ActorForm;
