import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../lib/AuthContext";
import axios from "axios";

const Header = (onSearch) => {
  const { loggedIn } = useContext(AuthContext);
  const [accountSelected, setAccountSelected] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  const selectAccount = () => {
    if (accountSelected) {
      setAccountSelected(false);
    } else if (!accountSelected) {
      setAccountSelected(true);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios("http://localhost:8000/user/loggedInUser");
      setCurrentUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const Logout = async () => {
    setAccountSelected(false);
    await axios.get("http://localhost:8000/user/logout");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <header id="navbar">
        <div className="header-container">
          <div className="header-upper-container">
            <div className="hos-logo">Wall of Shame</div>
            <div className="header-upper-space">
              {loggedIn && <span>Welcome {currentUser.username}!</span>}
            </div>
            <a
              className="header-account"
              onClick={selectAccount}
              style={{
                backgroundImage: `url("http://localhost:8000/uploads/${loggedIn ? currentUser.avatar : "default-avatar.jpg"
                  }")`,
              }}
            ></a>
            <div className={`selected-acc-${accountSelected}`}>
              <ul>
                {!loggedIn && (
                  <>
                    <Link to={"/login"}>
                      <li onClick={(e) => setAccountSelected(false)}>Login</li>
                    </Link>

                    <Link to={"/register"}>
                      <li onClick={(e) => setAccountSelected(false)}>
                        Register
                      </li>
                    </Link>
                  </>
                )}

                {loggedIn && (
                  <Link to={"/"}>
                    <li onClick={Logout}>Logout</li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
          <nav className="header-lower-container">
            <div className="header-lower-flex">
              {loggedIn && (
                <>
                  <Link class="nav-link" to="/">
                    Home
                  </Link>
                  <Link class="nav-link" to="/categories">
                    Categories
                  </Link>
                  <Link class="nav-link" to="/upload">
                    Upload
                  </Link>
                </>
              )}

              {!loggedIn && (
                <>
                  <Link class="nav-link" to="/login">
                    Login
                  </Link>
                  <Link class="nav-link" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
