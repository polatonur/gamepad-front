import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import "./menuMobile.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const MenuMobile = ({ token, setToken, setUserCollection }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <div className="menu-mobile">
      {token && (
        <Link to="/user/account/">
          <div className="menu-mobile-profile_photo">
            {Cookies.get("userAvatar") !== "undefined" ? (
              <img src={`${Cookies.get("userAvatar")}`} alt="profile" />
            ) : (
              <span>{Cookies.get("userName")[0]}</span>
            )}
          </div>
        </Link>
      )}
      <FontAwesomeIcon
        onClick={() => {
          setDisplayMenu(true);
        }}
        className="menu-mobile-icon"
        icon="bars"
      />{" "}
      <div
        style={{ right: displayMenu ? "0" : "-100vw" }}
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
          <Link to="/">
            <li onClick={() => setDisplayMenu(false)}>
              {" "}
              <span className="header_link_1">Home</span>
            </li>
          </Link>
          <Link to="/user/collection" onClick={() => setDisplayMenu(false)}>
            <li>
              {" "}
              <span className="header_link_1">My Collection</span>
            </li>
          </Link>

          {token ? (
            <>
              <Link onClick={() => setDisplayMenu(false)} to="/user/account/">
                <li>
                  {" "}
                  <span className="username">Account</span>
                </li>
              </Link>

              <li
                className="menu_mobile_signout_btn"
                onClick={() => {
                  setToken(null);
                  setUserCollection("");
                }}
              >
                Logout <FontAwesomeIcon icon="sign-out-alt" />
              </li>
            </>
          ) : (
            <>
              <Link to="/login/" onClick={() => setDisplayMenu(false)}>
                <li>
                  {" "}
                  <span className="username">Login</span>
                </li>
              </Link>
              <Link to="/signup/" onClick={() => setDisplayMenu(false)}>
                <li>
                  {" "}
                  <span className="username">Signup</span>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MenuMobile;
