import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../lib/AuthContext";

const Register = () => {
  const [userData, setUserData] = useState({});
  const { getLoggedIn, loggedIn } = useContext(AuthContext);
  const [error, setError] = useState({})
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userData.avatar) {
      setUserData((prev) => ({ ...prev, avatar: "../img/user.png" }));
    }
    try {
      const formData = new FormData();
      formData.append("avatar", userData.avatar); // Assuming 'file' is your File object
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("passwordAgain", userData.passwordAgain);

      await axios.post("http://localhost:8000/user/register", formData);


      getLoggedIn();

      navigate("/");
      window.location.reload()
      if (loggedIn) {
        window.location.reload();
      }

    } catch (error) {
      setError((prev) => ({ ...prev, errors: error.response.data.Error }))
    }
  };

  const handleAvatarDelete = () => {
    setUserData((prev) => ({
      ...prev,
      avatar: "",
    }))

    const input = document.querySelector("upload-btn-hidden")

  }

  const memoURL = useMemo(() => {
    if (userData.avatar) {
      return URL.createObjectURL(userData.avatar)
    }
  }, [userData.avatar])

  console.log(error);
  return (
    <main>
      <main className="form-main">
        <h1 className="form-title">Register</h1>

        <form onSubmit={(e) => handleRegister(e)}>

          <div className="form-preview-avt">
            {userData.avatar &&
              <div
                className="form-upload-preview-avt"
                style={{
                  backgroundImage: `url(${memoURL
                    })`,
                }}
              ></div>
            }
            {!userData.avatar &&
              < div
                className="form-upload-preview-avt"
                style={{
                  backgroundImage: `url("http://localhost:8000/uploads/user.png")`,
                }}
              ></div>
            }
          </div>

          <div className="form-section-img">
            <div>
              <div>Choose your avatar:</div>
            </div>
            <div className="upload-avatar-container">
              <label className="upload-btn" htmlFor="file"></label>
              <input
                className="upload-btn-hidden"
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    avatar: e.target.files[0],
                  }))
                }
              />
              <input
                type="button"
                value="X"
                className="delete-avt"
                onClick={handleAvatarDelete} />
            </div>
          </div>
          {error && <div className="form-error">{error.errors}</div>}
          <div className="form-section">
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
          </div>
          <div className="form-section">
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
          </div>
          <div className="form-section">
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
          </div>
          <div className="form-section">
            <div className="form-input-psw-img"></div>
            <input
              className="form-input"
              required
              type="password"
              placeholder="Verify Password"
              value={userData.passwordAgain}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  passwordAgain: e.target.value,
                }))
              }
            />
          </div>
          <input className="form-input" type="submit" value="Register" />
        </form>
      </main>
    </main >
  );
};

export default Register;
