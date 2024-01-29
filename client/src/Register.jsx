import { useState } from "react";

const Register = () => {
  const [userData, setUserData] = useState({
    email: String,
    username: String,
    password: String,
    avatar: String,
  });

  return (
    <main>
      <main className="form-main">
        <form onSubmit={Register}>
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
              value={userData.username}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </section>
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

export default Register;
