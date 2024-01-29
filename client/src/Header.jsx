import { useState } from "react";
import { Link } from "react-router-dom";

const Header = (onSearch) => {
  const [accountSelected, setAccountSelected] = useState(false);
  const [searchInput, setSearchInput] = useState(null);

  const selectAccount = () => {
    if (accountSelected) {
      setAccountSelected(false);
    } else if (!accountSelected) {
      setAccountSelected(true);
    }
  };

  const handleSearch = () => {
    onSearch(searchInput);
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="header-upper-container">
            <div className="hos-logo">Wall of Shame</div>
            <div className="header-upper-space"></div>
            <a className="header-account" onClick={selectAccount}></a>

            <div className={`selected-acc-${accountSelected}`}>
              <ul>
                <Link to={"/login"}>
                  <li onClick={(e) => setAccountSelected(false)}>Login</li>
                </Link>
                <Link to={"/register"}>
                  <li onClick={(e) => setAccountSelected(false)}>Register</li>
                </Link>
              </ul>
            </div>
          </div>
          <nav className="header-lower-container">
            <div className="header-lower-flex">
              <Link class="nav-link" to="/">
                Home
              </Link>
              <Link class="nav-link" to="/categories">
                Categories
              </Link>
              <Link class="nav-link" to="/upload">
                Upload
              </Link>
              <Link class="nav-link" to="/login">
                Login
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
