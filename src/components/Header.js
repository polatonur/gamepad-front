import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo_header.png";
import "./header.css";

const Header = ({ token, setToken }) => {
  console.log(token);
  return (
    <header className="header container">
      <Link to="/">
        <div className="header_logo_block">
          <img className="header_logo" src={logo} alt="gamepad" />
          <span className="logo_text">Gamepad</span>
        </div>
      </Link>
      <nav className="navbar">
        <Link to="/user/collection">
          <span className="header_link_1">My Collection</span>
        </Link>
        {!token ? (
          <div className="token_no">
            (
            <Link to="/login">
              <button className="header_link_2">Login</button>
            </Link>
            <Link to="/signup">
              <button className="header_link_3">Sign Up</button>
            </Link>
          </div>
        ) : (
          <div className="token_ok">
            <span className="username">{Cookies.get("userName")}</span>
            <div className="profile_photo">
              {Cookies.get("userAvatar") ? (
                <img src={`${Cookies.get("userAvatar")}`} alt="profile" />
              ) : (
                <span>{Cookies.get("userName")[0]}</span>
              )}
            </div>
            <button className="logout_btn" onClick={() => setToken(null)}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Header;
