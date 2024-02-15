import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../lib/AuthContext";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({})
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        userData
      );

      navigate("/");
      window.location.reload();
    } catch (error) {
      setError((prev) => ({ ...prev, errors: error.response.data.Error }))
    }
  };

  return (
    <div>
      <main className="form-main">
        <form onSubmit={(e) => handleLogin(e)}>
          {error && <div className="form-error">{error.errors}</div>}
          <section className="form-section">
            <div className="form-input-email-img"></div>
            <input
              className="form-input"
              required
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </section>
          <section className="form-section">
            <div className="form-input-psw-img"></div>
            <input
              className="form-input"
              required
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </section>
          <input className="form-input" type="submit" value="Login" />
          <Link to="/register">
            <div className="redirect-login">
              New around here? Register here!
            </div>
          </Link>
        </form>
      </main>
    </div>
  );
};

export default Login;
