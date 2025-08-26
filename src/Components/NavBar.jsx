import { Link } from "react-router-dom";

export default function NavBar() {
    
    return <nav className="nvabar">
        <div className="navbar-brand">
            <Link to = "/">Movie App</Link>
        </div>
        <div className="navbar-links">
            <Link to = "/" className="nav-link">Home</Link>
            <Link to = "/favorites" className="nav-link">Favorites</Link>
        </div>
    </nav>
}