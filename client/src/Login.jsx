import { useState } from "react";
import "./Forms.css";

const Login = () => {
  const [userData, setUserData] = useState({
    email: String,
    password: String,
  });

  const loginData = null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Itt láthatod a válaszadatot
      } else {
        console.error("Could not fetch");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  console.log(loginData);
  console.log(JSON.stringify(userData));

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
        </form>
      </main>
    </main>
  );
};

export default Login;
