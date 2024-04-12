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
        <div className="navbar-upper-container">
          <div className="hos-logo">Wall of Shame</div>
          <div className="navbar-welcome-space">
            {loggedIn && <h2>Welcome {currentUser.username}!</h2>}
          </div>
          <div className="navbar-account-holder">
            <a
              className="nav-account"
              onClick={selectAccount}
              style={{
                backgroundImage: `url("http://localhost:8000/uploads/${loggedIn ? currentUser.avatar : "default-avatar.jpg"
                  }")`,
              }}
            ></a>
          </div>
          <div className={`selected-acc-${accountSelected}`}>
            {!loggedIn && (
              <>
                <Link to={"/login"} onClick={(e) => setAccountSelected(false)}>
                  Login
                </Link>

                <Link to={"/register"} onClick={(e) => setAccountSelected(false)}>
                  Register
                </Link>
              </>
            )}

            {loggedIn && (
              <>
                <Link to={"/"} onClick={Logout}>
                  Logout
                </Link>
                <Link to={"/user/" + currentUser._id} onClick={(e) => setAccountSelected(false)}>
                  Settings
                </Link>
              </>
            )}
          </div>
        </div>
        <nav className="navbar-lower-container">
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
        </nav>
      </header >
    </>
  );
};

export default Header;
