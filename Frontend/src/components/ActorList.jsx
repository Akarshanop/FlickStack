import { useEffect, useState } from "react";
import ActorForm from "./ActorForm";
import EditActorForm from "./EditActorForm";   // ← new
import Modal from "./Modal";
import PageHeader from "./PageHeader";
import API from "../api/api";
import "../Style/List.css";

function ActorList() {
  const [actors, setActors] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editActor, setEditActor] = useState(null);   

  const fetchActors = () => {
    API.get("/actors")
      .then((res) => setActors(res.data))
      .catch((err) => console.error("Error fetching actors:", err));
  };

  const deleteActor =async(actor)=>{
      await API.delete(`/actors/${actor.id}`)
      setActors((prev) => prev.filter((a) => a.id !== actor.id));
  }

  useEffect(() => {
    fetchActors();
  }, []);

  const filtered = actors.filter((actor) =>
    actor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="media-list">
      <PageHeader
        title="Actors"
        searchPlaceholder="Search actors by name…"
        searchValue={search}
        onSearchChange={setSearch}
        addLabel="Add Actor"
        onAdd={() => setShowAddForm(true)}
      />

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <ActorForm
          onCreated={() => {
            fetchActors();
            setShowAddForm(false);
          }}
        />
      </Modal>

   
      <Modal isOpen={Boolean(editActor)} onClose={() => setEditActor(null)}>
        {editActor && (
          <EditActorForm
            actor={editActor}
            onUpdated={() => {
              setEditActor(null);
              fetchActors();
            }}
            onCancel={() => setEditActor(null)}
          />
        )}
      </Modal>

      <div className="Block">
        {filtered.map((actor) => (
          <div key={actor.id} className="media-card">
            <img src={actor.image_url} alt={actor.name} className="actor-photo" />
            <div>
              <h2>{actor.name}</h2>
              <p>
                <strong>Movies:</strong> {actor.movies || "None"}
              </p>
              <div className="Block-Buttons">
                <button className="buttons" onClick={() => setEditActor(actor)}>
                  Edit
                </button>
                <button className="buttons" onClick={()=>deleteActor(actor)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActorList;
