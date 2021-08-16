import { Link } from "react-router-dom"
import logo from "../assets/img/logo_header.png"
import "./header.css"

const Header = () => {
    return (
        <header className="header container">
            <Link to="/">
            <div className="header_logo_block">
                <img className="header_logo" src={logo} alt="gamepad" />
                <span className="logo_text">Gamepad</span>
            </div>
            </Link>
            <nav className="navbar">
                <Link to="/">
                <span className="header_link_1">My Collection</span>
                </Link>
                <Link to="/">
                <button className="header_link_2">Login</button></Link>
                <Link to="/">
                <button className="header_link_3">Sign Up</button></Link>
            </nav>
        </header>
    )
  
}
export default Header