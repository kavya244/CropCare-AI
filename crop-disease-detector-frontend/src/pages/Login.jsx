
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Sprout } from "lucide-react";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { saveLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      saveLogin(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-overlay-content">
        <div className="login-brand">
          <div className="login-brand-icon">
            <Sprout size={34} />
          </div>
          <h2>CropCare AI</h2>
          <p>Smart Technology for Healthy Crops</p>
        </div>

        <div className="auth-card">
          <div className="login-heading-icon">
            <Leaf size={27} />
          </div>

          <h1>Welcome Back</h1>
          <p>Login to your CropCare AI account.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            {error && <p className="error-message">{error}</p>}

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>

        <p className="login-footer-text">
          <Leaf size={15} />
          Growing a healthier tomorrow with AI.
        </p>
      </div>
    </div>
  );
}
