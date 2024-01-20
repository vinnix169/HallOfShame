import { useState } from 'react';
import {Link} from 'react-router-dom'

const Header = () => {

  const [accountSelected, setAccountSelected] = useState(false)

  const selectAccount = () => {
    if (accountSelected) {
      setAccountSelected(false)
    }
    else if (!accountSelected) {
      setAccountSelected(true)
    }
  }

  return (
    <>
      <header>
        <div className="header-container">
          <div className="header-upper">
            <div className="header-upper-container">
              <div className="header-upper-item">
                <div className="hos-logo">Wall of Shame</div>
              </div>
              <div className="header-upper-item">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search..."
                />
                <input className="search-btn" type="button" value="S" />
              </div>
              <div className="header-upper-item">
                <a className="header-account" onClick={selectAccount}></a>
              </div>
              <div className={`selected-acc-${accountSelected}`}>
                <ul>
                  <li>asd</li>
                  <li>asd</li>
                  <li>asd</li>
                  <li>asd</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="header-lower">
            <div className="header-lower-container">
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
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
