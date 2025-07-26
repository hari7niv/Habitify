import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Menu from "./menubar";
import AddForm from "./addForm";
import Dashboard from "./dashboard";
import Good from "./Good";
import Login from "./Login";
import "./App.css";

function AppWrapper() {
  const location = useLocation();
  const hideMenu = location.pathname === "/login";

  return (
    <div className="App">
      {!hideMenu && <Menu />} 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Good />} />
        <Route path="/addForm" element={<AddForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
