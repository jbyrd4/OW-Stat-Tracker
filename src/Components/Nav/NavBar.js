import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/">
          Snapshot
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/NewGameEntry">
          New Game Entry
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/mygames">
          My Games
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/myfriends">
          My Friends
        </Link>
      </li>
      <li className="navbar__item active">
        <Link
          className="navbar__link"
          to="#"
          onClick={() => {
            localStorage.removeItem("ow_account");
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};
