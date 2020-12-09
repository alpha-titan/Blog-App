import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "./Navbar.css";
const Navbar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  return (
    <div>
      <nav className="nav-header">
        <div className="nav-wrapper #42a5f5 blue lighten-1">
          <a href="/" className="left brand-logo logo-style ">
            FreeMind
          </a>
          {console.log(state)}
          {state ? (
            <ul id="nav-mobile" className="right nav-links">
              <li>
                <Link to="/createpost" className="link-style">
                  createpost
                </Link>
              </li>
              <li>
                <button
                  className="btn #c62828 red darken-3"
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "CLEAR" });
                    history.push("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul id="nav-mobile" className="right nav-links">
              <li>
                <Link to="/login" className="link-style">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="link-style">
                  register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
