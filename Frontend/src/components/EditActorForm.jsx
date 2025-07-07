import { useEffect, useState } from "react";
import Select from "react-select";
import API from "../api/api";
import "../Style/Form.css";

function EditActorForm({ actor, onUpdated, onCancel }) {
  const [name, setName] = useState(actor.name);
  const [image_url, setImageUrl] = useState(actor.image_url);

  const [availableMovies, setAvailableMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]); 

  
  useEffect(() => {
    API.get("/movies")
      .then((res) => {
        setAvailableMovies(res.data);
        const ids =
          actor.movies?.map((m) => (typeof m === "string" ? m : m.id)) ?? [];
        setSelectedMovies(ids);
      })
      .catch((err) => console.error("Failed to fetch movies", err));
  }, [actor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      name,
      image_url,
      movieIds: selectedMovies,
    };

    try {
      await API.put(`/actors/${actor.id}`, updated);
      alert(" Actor updated!");
      onUpdated();
    } catch (err) {
      console.error("Update failed:", err);
      alert(" Failed to update actor");
    }
  };

  const movieOptions = availableMovies.map((m) => ({
    value: m.id,
    label: m.title,
  }));

  return (
    <form onSubmit={handleSubmit} className="media-form">
      <h2>Edit Actor</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={image_url}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        required
      />

      <label>Choose Movies:</label>
      <Select
        isMulti
        options={movieOptions}
        value={movieOptions.filter((o) => selectedMovies.includes(o.value))}
        onChange={(sel) => setSelectedMovies(sel.map((o) => o.value))}
      />

      <br />
      <button type="submit"> Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "1rem" }}>
         Cancel
      </button>
    </form>
  );
}

export default EditActorForm;
