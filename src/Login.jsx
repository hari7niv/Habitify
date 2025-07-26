import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "register" : "login";

    try {
      const res = await fetch(`http://localhost:3000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      localStorage.setItem("username", data.username);
      navigate("/dashboard");
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isRegistering ? "Register for Habitify" : "Login to Habitify"}</h2>
        {error && <div className="login-error">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isRegistering ? "Register" : "Login"}</button>

        <p style={{ marginTop: "10px" }}>
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(""); // clear previous error
            }}
            style={{ marginLeft: "8px", background: "none", border: "none", color: "blue", cursor: "pointer" }}
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
