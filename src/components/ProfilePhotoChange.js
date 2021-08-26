import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./profilePhotoChange.css";

const ProfilePhotoChange = ({
  setDisplayChangePhotoMenu,
  displayChangePhotoMenu,
  setPhoto,
  photo,
  setNewPhoto,
}) => {
  const [newPhotoLocalUri, setNewPhotoLocalUri] = useState();
  const handleChangePhoto = (event) => {
    if (event.target.files.length !== 0) {
      setPhoto(event.target.files[0]);
      setNewPhoto(true);
      setNewPhotoLocalUri(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="profile-photo">
      {Cookies.get("userAvatar") !== "undefined" || newPhotoLocalUri ? (
        <img
          src={newPhotoLocalUri ? newPhotoLocalUri : Cookies.get("userAvatar")}
          alt="user"
        />
      ) : (
        <span className="no-photo">{Cookies.get("userName")[0]}</span>
      )}
      <label className="avatar-settings">
        <input
          onChange={(event) => {
            handleChangePhoto(event);
          }}
          type="file"
        />
        <FontAwesomeIcon icon="camera" />
      </label>
      <div
        style={{ display: displayChangePhotoMenu && "flex" }}
        className="menu-avatar-settings"
      >
        <label className="label-1">
          <input
            onChange={(event) => {
              handleChangePhoto(event);
            }}
            type="file"
          />
          Change profile photo
        </label>
      </div>
    </div>
  );
};

export default ProfilePhotoChange;
