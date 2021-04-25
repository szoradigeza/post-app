import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export const Header = () => {
  const { user, onLogout } = useContext(UserContext);
  return (
    <div className="App-header">
      <ul className="container">
        <li key="home">
          <Link to="/">My Site</Link>
        </li>
        {user.isAuthenticated ? (
          <>
            <li key="new-post">
              <Link to="/new">New post</Link>
            </li>
            <li key="logout">
              <button
                className="linkLike"
                onClick={(e) => {
                  e.preventDefault();
                  onLogout();
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
