import { useEffect, useState } from "react";
import Select from "react-select";
import API from "../api/api";
import "../Style/Form.css";

function EditMovieForm({ movie, onUpdated, onCancel }) {
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [image_url, setImageUrl] = useState(movie.image_url);

  const [availableActors, setAvailableActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]); 

 
  useEffect(() => {
    API.get("/actors")
      .then((res) => {
        setAvailableActors(res.data);
        console.log(typeof(movie.actors))//added
        const ids =
          movie.actors?.map((a) => (typeof a === "string" ? a : a.id)) ?? [];
        setSelectedActors(ids);
      })
      .catch((err) => console.error("Failed to fetch actors", err));
  }, [movie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      title,
      description,
      image_url,
      actorIds: selectedActors,
    };

    try {
      await API.put(`/movies/${movie.id}`, updated);
      alert(" Movie updated!");
      onUpdated();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update movie");
    }
  };

  const actorOptions = availableActors.map((a) => ({
    value: a.id,
    label: a.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="media-form">
      <h2>Edit Movie</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        value={image_url}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        required
      />

      <label>Choose Actors:</label>
      <Select
         classNamePrefix="actor" 
        isMulti
        options={actorOptions}
        value={actorOptions.filter((o) => selectedActors.includes(o.value))}
        onChange={(sel) => setSelectedActors(sel.map((o) => o.value))}
        
      />

      <br />
      <button type="submit"> Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "1rem" }}>
         Cancel
      </button>
    </form>
  );
}

export default EditMovieForm;
