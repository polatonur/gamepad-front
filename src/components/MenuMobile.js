import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import "./menuMobile.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const MenuMobile = ({ setToken, setUserCollection }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <div className="menu-mobile">
      <Link to="/user/account/">
        <div className="menu-mobile-profile_photo">
          {Cookies.get("userAvatar") !== "undefined" ? (
            <img src={`${Cookies.get("userAvatar")}`} alt="profile" />
          ) : (
            <span>{Cookies.get("userName")[0]}</span>
          )}
        </div>
      </Link>{" "}
      <FontAwesomeIcon
        onClick={() => {
          setDisplayMenu(true);
        }}
        className="menu-mobile-icon"
        icon="bars"
      />{" "}
      <div
        style={{ display: displayMenu ? "block" : "none" }}
        className="menu-block"
      >
        <p>
          {" "}
          <FontAwesomeIcon
            className="close-icon"
            onClick={() => setDisplayMenu(false)}
            icon="times"
          />
        </p>
        <ul>
          <li>
            {" "}
            <Link to="/user/collection">
              <span className="header_link_1">My Collection</span>
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/user/account/">
              {" "}
              <span className="username">Account</span>
            </Link>
          </li>
          <li
            onClick={() => {
              setToken(null);
              setUserCollection("");
            }}
          >
            Logout <FontAwesomeIcon icon="sign-out-alt" />
          </li>
          <li onClick={() => setDisplayMenu(false)}>
            {" "}
            <Link to="/login/">
              {" "}
              <span className="username">Login</span>
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/signup/">
              {" "}
              <span className="username">Signup</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuMobile;
