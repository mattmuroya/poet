import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import poetLogo from "../assets/images/poet-logo.png";
import { useAuth } from "../hooks/useAuth";
import TitleBar from "../components/TitleBar";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { userIsAuthorized, authCheckCompleted } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    window.history.replaceState(null, "");
  }, []);

  useEffect(() => {
    if (userIsAuthorized) navigate("/");
  }, [userIsAuthorized, navigate]);

  return (
    authCheckCompleted &&
    !userIsAuthorized && (
      <div className="window login-window">
        <TitleBar title="Login" />
        <div className="window-body">
          <img src={poetLogo} alt="login" />
          <LoginForm />
        </div>
      </div>
    )
  );
}
