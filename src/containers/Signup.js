import "./signup.css";
import logoSmall from "../assets/img/logo_header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import ActivityIndicator from "../components/ActivityIndicator";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    if (password === confirmPassword) {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      try {
        const response = await axios.post(
          "https://gamepad-clone.herokuapp.com/user/signup",
          formData
        );
        console.log(response.data);
        const { token, username, avatar, id } = response.data.message;
        console.log(id);
        setUser(token, username, avatar, id);
        history.push("/");
        setMessage("");
      } catch (error) {
        console.log("error ===>", error);
        if (error.response) {
          if (error.response.data) {
            console.log(error.response.data.message);
            setMessage(error.response.data.message);
          }
        }
      }
    } else if (password !== confirmPassword) {
      setMessage("Password doesn't match");
    }
    setSending(false);
  };

  return (
    <div className="signup container">
      <section className="signup_block">
        <img src={logoSmall} alt="gamepad" />
        <div className="col_1">
          <h1>How it works ?</h1>
          <div>
            <FontAwesomeIcon
              className="signup_icon"
              color="white"
              icon="user"
            />{" "}
            <span>
              Log in to your free account to be able to gell all features of
              Gamepad
            </span>
          </div>
          <div>
            <FontAwesomeIcon
              className="signup_icon"
              color="white"
              icon="bookmark"
            />
            <span>Add a game to your collection</span>
          </div>
          <div>
            <FontAwesomeIcon
              className="signup_icon"
              color="white"
              icon="comment"
            />
            <span> Leave a comment</span>
          </div>
        </div>
        <div className="col_2">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <div className="title">
              {" "}
              <h1>Sign up</h1>
            </div>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="false"
              type="text"
              placeholder="Username .."
              required
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="false"
              type="text"
              placeholder="Email .."
              required
            />
            <div className="signup-pass">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="false"
                type="password"
                placeholder="Password .."
                required
              />
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="false"
                type="password"
                placeholder="Confirm Password .."
                required
              />
            </div>
            <div className="signup_add_photo_block">
              <label className="upload_photo">
                <input
                  onChange={(event) => {
                    setPhoto(event.target.files[0]);
                  }}
                  type="file"
                />
                Add a Photo
                <FontAwesomeIcon className="upload_icon" icon="upload" />
              </label>
              {photo ? <p>1 file selected</p> : <p>No file selected</p>}
            </div>
            <section className="message_block">
              {sending ? (
                <p> ... </p>
              ) : (
                message && <h5 className="message">{message}</h5>
              )}
            </section>
            <button type="submit">Sign up</button>
            <Link to="/login">
              <p>Already have an account? Login</p>
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
};
export default Signup;
