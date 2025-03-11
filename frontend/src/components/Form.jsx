import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

// A generic form component that can be used for both login and registration
// route = API endpoint, method = form type ('login' or 'register')
function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register"; // Dynamic title

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); // Prevents the default form submission behavior (which would reload the page)

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/"); // Redirect to the home page (after successful login)
      } else {
        // Send user to login to get tokens
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      // Regardless of success or failure, turn off the loading indicator
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    // Navigate to the opposite page (login <-> register)
    if (method === "login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit" disabled={loading}>
        {name}
      </button>
      <button
        type="button"
        onClick={handleRedirect}
        className="form-button form-button-redirect"
      >
        {method === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
      </button>
    </form>
  );
}

export default Form;
