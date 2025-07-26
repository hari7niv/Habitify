import "./css/menubar.css";
import { NavLink, useNavigate } from "react-router-dom"; // ⬅️ useNavigate added

function Menu() {
  const navigate = useNavigate(); // ⬅️ for redirecting

  const handleLogout = () => {
    localStorage.removeItem("username"); // or userId if that's what you're storing
    navigate("/login"); // redirect to login
  };

  return (
    <div>
      <ul className="menu">
        <div className="menu-header">
          <h1>Habitify</h1>
        </div>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined}>Habits</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : undefined}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/addForm" className={({ isActive }) => isActive ? "active" : undefined}>Create Habit</NavLink>
        </li>
        <div className="logout-container">
          <button onClick={handleLogout}>Logout</button> {/* ⬅️ call handler */}
        </div>
      </ul>
    </div>
  );
}

export default Menu;
