import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo_header.png";
import "./header.css";
import MenuMobile from "./MenuMobile";

const Header = ({ token, setToken, setUserCollection }) => {
  // console.log(token);
  // console.log(Cookies.get("userName"));
  return (
    <header className="header container">
      <a href="/">
        <div className="header_logo_block">
          <img className="header_logo" src={logo} alt="gamepad" />
          <span className="logo_text">Gamepad</span>
        </div>
      </a>
      <MenuMobile
        token={token}
        setToken={setToken}
        setUserCollection={setUserCollection}
      />
      <nav className="navbar">
        <Link to="/user/collection">
          <span className="header_link_1">My Collection</span>
        </Link>
        {!token ? (
          <div className="token_no">
            <Link to="/login">
              <button className="header_link_2">Login</button>
            </Link>
            <Link to="/signup">
              <button className="header_link_3">Sign Up</button>
            </Link>
          </div>
        ) : (
          <div className="token_ok">
            <Link to="/user/account/">
              {" "}
              <span className="username">{Cookies.get("userName")}</span>
            </Link>
            <Link to="/user/account/">
              <div className="profile_photo">
                {Cookies.get("userAvatar") !== "undefined" ? (
                  <img src={`${Cookies.get("userAvatar")}`} alt="profile" />
                ) : (
                  <span>{Cookies.get("userName")[0]}</span>
                )}
              </div>
            </Link>
            <button
              className="logout_btn"
              onClick={() => {
                setToken(null);
                setUserCollection("");
              }}
            >
              <FontAwesomeIcon icon="sign-out-alt" />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Header;
