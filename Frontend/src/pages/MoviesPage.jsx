import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MovieForm from "../components/MovieForm";
import MovieList from "../components/MovieList";
import "../Style/PageContainer.css"; 
function MoviesPage() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <>
      <Navbar />
      <main className="page-container">
        <MovieForm onCreated={handleRefresh} />
        <MovieList refresh={refresh} />
      </main>
    </>
  );
}

export default MoviesPage;
