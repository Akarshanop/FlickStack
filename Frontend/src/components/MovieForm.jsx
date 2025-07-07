import { useEffect, useState } from "react";
import Select from "react-select";
import API from "../api/api";
import "../Style/Form.css";

function MovieForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [availableActors, setAvailableActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]); 

  
  useEffect(() => {
    API.get("/actors")
      .then((res) => setAvailableActors(res.data))
      .catch((err) => console.error("Error fetching actors:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      image_url,
      actorIds: selectedActors, 
    };

    try {
      await API.post("/movies", newMovie);
      alert("Movie created!");
      onCreated();
      setTitle("");
      setDescription("");
      setImageUrl("");
      setSelectedActors([]);
    } catch (err) {
      console.error("Error creating movie:", err);
      alert(" Failed to create movie");
    }
  };

  const actorOptions = availableActors.map((a) => ({
    value: a.id,
    label: a.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="media-form">
      <h2>Add Movie</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <br />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
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

      <label>Choose Actors:</label>
      <Select
        isMulti
        options={actorOptions}
        placeholder="Search & select actors..."
        value={actorOptions.filter((o) => selectedActors.includes(o.value))}
        onChange={(sel) => setSelectedActors(sel.map((o) => o.value))}
      />
      <br />

      <button type="submit">➕ Add Movie</button>
    </form>
  );
}

export default MovieForm;
