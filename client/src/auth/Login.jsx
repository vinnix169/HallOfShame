import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import AuthContext from "../lib/AuthContex";


const Login = () => {
  const [userData, setUserData] = useState({
    email: String,
    password: String,
  });

  const { getLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/user/login", userData);

      getLoggedIn();
      navigate("/");

    } catch (error) {
      console.error(error)
    }
  };

  return (
    <main>
      <main className="form-main">
        <form onSubmit={(e) => handleLogin(e)}>
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
            <div className="redirect-login">New around here? Register here!</div>
          </Link>
        </form>
      </main>
    </main>
  );
};

export default Login;
