import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./myProfile.css";
import axios from "axios";
import ActivityIndicator from "../components/ActivityIndicator";
import ProfilePhotoChange from "../components/ProfilePhotoChange";

const MyProfile = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userReviews, setUserReviews] = useState("");
  const [sending, setSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState("");
  const [displayChangePhotoMenu, setDisplayChangePhotoMenu] = useState(false);
  const [newPhoto, setNewPhoto] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayNewPassword, setDisplayNewPassword] = useState(false);
  const [displayConfirmNewPassword, setDisplayConfirmNewPassword] =
    useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const id = Cookies.get("userId");
      const token = Cookies.get("userToken");
      const response = await axios.get(
        `https://gamepad-clone.herokuapp.com/user/account?id=${id}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setUsername(response.data.user.username);
      setPhoto(response.data.user.avatar);
      setFullName(response.data.user.full_name);
      setEmail(response.data.user.email);
      setUserReviews(response.data.userReviews);
      setIsLoading(false);
      //   console.log(response.data);
    };
    fetchUserData();
  }, []);

  const handlUserUpdate = async (event) => {
    event.preventDefault();

    if (newPassword === confirmNewPassword) {
      const formData = new FormData();
      if (newPhoto) {
        formData.append("picture", photo);
      }
      formData.append("username", username);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("newPassword", newPassword);
      formData.append("confirmNewPassword", confirmNewPassword);
      const userId = Cookies.get("userId");
      const token = Cookies.get("userToken");
      formData.append("userId", userId);

      const response = await axios.put(
        "https://gamepad-clone.herokuapp.com/user/account/update",
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data.message);
      const { newUsername, newAvatar } = response.data.message.user;
      setUser(token, newUsername, newAvatar, userId);
      setNewPhoto(false);
      setMessage("");
    } else {
      setMessage("Password doesn't match");
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const userId = Cookies.get("userId");
      const response = await axios.delete(
        `https://gamepad-clone.herokuapp.com/game/review/delete?reviewId=${id}&userId=${userId}`
      );
      setUserReviews(response.data.userReviews);
    } catch (error) {
      console.log(error.message);
    }
    console.log(id);
  };

  return isLoading ? (
    <ActivityIndicator height={"771px"} />
  ) : (
    <div className="my-profile container">
      <main>
        <ProfilePhotoChange
          newPhoto={newPhoto}
          setNewPhoto={setNewPhoto}
          photo={photo}
          setPhoto={setPhoto}
          displayChangePhotoMenu={displayChangePhotoMenu}
          setDisplayChangePhotoMenu={setDisplayChangePhotoMenu}
        />
        <form
          onSubmit={(event) => {
            handlUserUpdate(event);
          }}
        >
          <p>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </p>
          <p>
            <label>Email :</label>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </p>
          <p>
            <label>Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </p>
          <div className="change-password">
            <p>You want to change your password?</p>
          </div>
          <p>
            <FontAwesomeIcon
              onClick={() => setDisplayPassword(!displayPassword)}
              className="my-profile-eye-1"
              icon={displayPassword ? "eye" : "eye-slash"}
            />
            <label>Your password</label>
            <input
              placeholder="*******"
              type={displayPassword ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
            />
          </p>
          <p>
            <FontAwesomeIcon
              onClick={() => setDisplayNewPassword(!displayNewPassword)}
              className="my-profile-eye-1"
              icon={displayNewPassword ? "eye" : "eye-slash"}
            />
            <label>New password</label>
            <input
              placeholder="*******"
              type={displayNewPassword ? "text" : "password"}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </p>
          <p>
            <FontAwesomeIcon
              onClick={() =>
                setDisplayConfirmNewPassword(!displayConfirmNewPassword)
              }
              className="my-profile-eye-1"
              icon={displayConfirmNewPassword ? "eye" : "eye-slash"}
            />
            <label>Confirm new password</label>
            <input
              placeholder="*******"
              type={displayConfirmNewPassword ? "text" : "password"}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            ></input>
          </p>
          <button type="submit">Update</button>
          <p className="my-profile-error-message">{message}</p>
        </form>
      </main>
      <section className="user-review-list">
        <h1>My Reviews</h1>
        <div className="user-reviews">
          {userReviews.length === 0 && <p>No Review</p>}
          {userReviews.map((elem) => {
            return (
              <div key={elem._id} className="user-review">
                <div className="user-review-date">
                  <span>{elem.date.split("T")[0]}</span>
                </div>
                <h3>{elem.title}</h3>
                <p>{elem.text}</p>
                <h4>
                  <span>
                    {" "}
                    Game : <span>{elem.name}</span>{" "}
                  </span>
                  <span>
                    {/* <FontAwesomeIcon className="user-review-icon" icon="edit" />{" "} */}
                    <FontAwesomeIcon
                      onClick={() => handleDeleteReview(elem._id)}
                      className="user-review-icon"
                      icon="trash"
                    />
                  </span>
                </h4>
              </div>
            );
          })}
        </div>
      </section>
      <section className="delete-account">
        <button>Delete my account</button>
      </section>
    </div>
  );
};

export default MyProfile;
