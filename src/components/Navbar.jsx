import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const cartCount = useSelector(state => state.bookingCart.length);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/"><span className="brand-mark">G</span> GrandStay</Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/rooms">Rooms</NavLink>
        {user && <NavLink to="/my-bookings">My Bookings</NavLink>}
        <NavLink to="/booking-cart">Booking Cart ({cartCount})</NavLink>
        {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="nav-auth">
        {user ? <>
          <span className="welcome">Hi, {user.name.split(" ")[0]}</span>
          <button className="btn btn-small btn-outline-light" onClick={handleLogout}>Logout</button>
        </> : <>
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/register" className="btn btn-small btn-light">Register</Link>
        </>}
      </div>
    </header>
  );
}
