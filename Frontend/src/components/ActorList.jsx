import { useEffect, useState } from "react";
import ActorForm from "./ActorForm";
import Modal from "./Modal";
import PageHeader from "./PageHeader";         // ✅ NEW
import API from "../api/api";
import "../Style/List.css";

function ActorList() {
  const [actors, setActors] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = () => {
    API.get("/actors")
      .then((res) => setActors(res.data))
      .catch((err) => console.error("Error fetching actors:", err));
  };

  const filtered = actors.filter((actor) =>
    actor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="media-list">
      {/* Header bar */}
      <PageHeader
        title="Actors"
        searchPlaceholder="Search actors by name…"
        searchValue={search}
        onSearchChange={setSearch}
        addLabel="Add Actor"
        onAdd={() => setShowForm(true)}
      />

      {/* Modal for Add */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <ActorForm
          onCreated={() => {
            fetchActors();
            setShowForm(false);
          }}
        />
      </Modal>

      {/* Actor cards */}
      {filtered.map((actor) => (
        <div key={actor.id} className="media-card">
          <img
            src={actor.image_url}
            alt={actor.name}
            className="actor-photo"
          />
          <div>
            <h2>{actor.name}</h2>
            <p>{actor.bio}</p>
            <p>
              <strong>Movies:</strong> {actor.movies || "None"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActorList;
