import { useState } from "react";
import "./Forms.css";

const Login = () => {
  const [userData, setUserData] = useState({
    email: String,
    username: String,
    password: String,
    avatar: String,
  });

  return (
    <main>
      <main className="form-main">
        <form action="submit">
          <section className="form-section-preview-avt">
            <div className="form-upload-preview-avt"></div>
          </section>
          <section className="form-section-img">
            <div>
              <div>Choose your avatar:</div>
            </div>
            <div>
              <label className="upload-btn" htmlFor="file"></label>
              <input
                className="upload-btn-hidden"
                id="file"
                type="file"
                accept="image/*"
              />
            </div>
          </section>

          <section className="form-section">
            <div className="form-input-usr-img"></div>
            <input
              className="form-input"
              required
              type="text"
              placeholder="Username"
            />
          </section>
          <section className="form-section">
            <div className="form-input-email-img"></div>
            <input
              className="form-input"
              required
              type="email"
              placeholder="Email"
            />
          </section>
          <section className="form-section">
            <div className="form-input-psw-img"></div>
            <input
              className="form-input"
              required
              type="password"
              placeholder="Password"
            />
          </section>
          <input
            className="form-input"
            type="submit"
            value="Login"
            onSubmit={"a"}
          />
        </form>
      </main>
    </main>
  );
};

export default Login;
