import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import windowsLogo from "../assets/images/windows-logo.png";
import { useAuth } from "../hooks/useAuth";

export default function Regsiter() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { savedUser, authCheckCompleted } = useAuth();

  useEffect(() => {
    if (savedUser) navigate("/");
  }, [savedUser, navigate]);

  const inputsAreValid = () => {
    if (!username || !password) {
      setErrorMessage("Username and password required.");
      return false;
    } else if (username.length > 32) {
      setErrorMessage("Username limited to 32 characters.");
      return false;
    } else if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return false;
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleRegistration = async (e) => {
    try {
      e.preventDefault();
      if (inputsAreValid()) {
        const { data } = await axios.post("/api/users/register", {
          username,
          password,
        });
        console.log(data);
        navigate("/login", {
          state: {
            successMessage: "User registration successful! Please login below.",
          },
        });
      }
    } catch (error) {
      console.error(error.response);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    authCheckCompleted &&
    !savedUser && (
      <div className="window registration-window">
        <div className="title-bar">
          <div className="title-bar-text">
            Register - Poet Instant Messenger
          </div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <img src={windowsLogo} alt="register" />
          <div className="error-message">{errorMessage}</div>
          <form onSubmit={(e) => handleRegistration(e)}>
            <div className="field-row-stacked">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="field-row" style={{ justifyContent: "flex-end" }}>
              <button>Register</button>
            </div>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    )
  );
}
