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
  
  const deleteMovie =async(movie)=>{
        await API.delete(`/movies/${movie.id}`)
        setMovies((prev) => prev.filter((a) => a.id !== movie.id));
    }
    
  useEffect(() => {
    fetchMovies();
  }, []);

  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="media-list">
      <PageHeader
        title="Movies"
        searchPlaceholder="Search movies by title…"
        searchValue={search}
        onSearchChange={setSearch}
        addLabel="Add Movie"
        onAdd={() => setShowAddModal(true)}
      />

            
        <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
          <MovieForm
            onCreated={() => {
              setShowAddModal(false);
              fetchMovies();
            }}
          />
        </Modal>

        
        <Modal isOpen={Boolean(editMovie)} onClose={() => setEditMovie(null)}>
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
        </Modal>


      <div className="Block">
         {filtered.map((movie) => (
        <div key={movie.id} className="media-card">
          <img src={movie.image_url} alt={movie.title} className="poster" />
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p className="pyara">
              <strong>Actors:</strong> {movie.actors || "None"}
            </p>
            <div className="Block-Buttons">
                <button className="buttons"  onClick={() => setEditMovie(movie)}> Edit </button>
                <button className="buttons" onClick={()=>deleteMovie(movie)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default MovieList;
