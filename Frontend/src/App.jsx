import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import ActorList from './components/ActorList';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/actors" element={<ActorList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
