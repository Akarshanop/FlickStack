import { useEffect, useState } from "react";
import EditMovieForm from "./EditMovieForm";
import MovieForm from "./MovieForm";
import Modal from "./Modal";
import API from "../api/api";
import PageHeader from "./PageHeader";         
import "../Style/List.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [editMovie, setEditMovie] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchMovies = () => {
    API.get("/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Error fetching movies:", err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="media-list">
      {/* ───────────────────────── Header (shared) ───────────────────────── */}
      <PageHeader
        title="Movies"
        searchPlaceholder="Search movies by title…"
        searchValue={search}
        onSearchChange={setSearch}
        addLabel="Add Movie"
        onAdd={() => setShowAddModal(true)}
      />

      {/* ───────────────────────── Edit Form (inline) ────────────────────── */}
      {editMovie && (
        <EditMovieForm
          movie={editMovie}
          onUpdated={() => {
            setEditMovie(null);
            fetchMovies();
          }}
          onCancel={() => setEditMovie(null)}
        />
      )}

      {/* ───────────────────────── Add Form (modal) ──────────────────────── */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <MovieForm
          onCreated={() => {
            setShowAddModal(false);
            fetchMovies();
          }}
        />
      </Modal>

      {/* ───────────────────────── Movie Cards ───────────────────────────── */}
      {filtered.map((movie) => (
        <div key={movie.id} className="media-card">
          <img src={movie.image_url} alt={movie.title} className="poster" />
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>
              <strong>Actors:</strong> {movie.actors || "None"}
            </p>
            <button onClick={() => setEditMovie(movie)}>✏️ Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
