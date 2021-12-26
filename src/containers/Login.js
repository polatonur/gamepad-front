import "./login.css";
import logoSmall from "../assets/img/logo_header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ActivityIndicator from "../components/ActivityIndicator";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const history = useHistory();
  const location = useLocation();
  console.log(location);
  let precedentPath = "";
  if (location.state) {
    precedentPath = location.state.precedentPath;
  }

  const handleSubmit = async (event) => {
    setSending(true);
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://happ-cow-onur.herokuapp.com/user/login",
        {
          password,
          email,
        }
      );
      console.log(response.data);
      const { token, username, avatar, _id } = response.data.message;
      setUser(token, username, avatar, _id);
      if (precedentPath !== "/signup") {
        console.log(precedentPath);
        history.push(precedentPath);
      } else {
        history.push("/");
      }
    } catch (error) {
      console.log("error ===>", error);
      if (error.response) {
        if (error.response.data) {
          console.log(error.response.data.message);
          setMessage(error.response.data.message);
        }
      }
    }
    setSending(false);
  };

  return (
    <div className="login container">
      <section className="login_block">
        <img src={logoSmall} alt="gamepad" />
        <div className="col_1">
          <h1>How it works ?</h1>
          <div>
            <FontAwesomeIcon className="login_icon" color="white" icon="user" />{" "}
            <span>
              Log in to your free account to be able to gell all features of
              Gamepad
            </span>
          </div>
          <div>
            <FontAwesomeIcon
              className="login_icon"
              color="white"
              icon="bookmark"
            />
            <span>Add a game to your collection</span>
          </div>
          <div>
            <FontAwesomeIcon
              className="login_icon"
              color="white"
              icon="comment"
            />
            <span> Leave a comment</span>
          </div>
        </div>
        <div className="col_2">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div>
              {" "}
              <h1>Login</h1>
            </div>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="false"
              type="text"
              placeholder="Email .."
              required
            />
            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              autoComplete="false"
              type="password"
              placeholder="Password .."
              required
            />

            <section className="message_block">
              {sending ? (
                <ActivityIndicator />
              ) : (
                message && <h5 className="message">{message}</h5>
              )}
            </section>
            <button type="submit">Connection</button>
            <Link to="/signup">
              <p>Don't have an account yet ?</p>
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
};
export default Login;
