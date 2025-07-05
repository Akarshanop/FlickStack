import { Link, useLocation } from 'react-router-dom';
import '../Style/Navbar.css';

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <h1 className="logo">🎬 Flick Stack</h1>
      <ul className="nav-links">
        <li>
          <Link to="/movies" className={pathname === '/movies' ? 'active' : ''}>
            📽️ Movies
          </Link>
        </li>
        <li>
          <Link to="/actors" className={pathname === '/actors' ? 'active' : ''}>
            🧑‍🎤 Actors
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
