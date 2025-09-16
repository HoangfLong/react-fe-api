import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout() {
    
    const res = await fetch("/api/v1/logout", {
      method: "POST",  
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      // setErrors(data);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <p className="text-slate-400 text-xs">
                {" "}
                Welcome {user.first_name}
              </p>
               <Link to ="/tours" className="nav-link">Create Tours</Link>
                <button className="nav-link" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </div>
          )}

          {/* <div>
            <Link to = "tours" className="nav-link">Tour</Link>
          </div> */}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
