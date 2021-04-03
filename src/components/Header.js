import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="App-header">
      <ul className="container">
        <li key="home">
          <Link to="/">My Site</Link>
        </li>
      </ul>
    </div>
  );
};
