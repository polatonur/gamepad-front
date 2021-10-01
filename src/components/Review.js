import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import "./review.css";
import { useHistory } from "react-router";
import logo from "../assets/img/logo_header.png";

const Review = ({
  id,
  reviewData,
  getGameReviewList,
  userRatings,
  getUserRatingList,
  token,
}) => {
  const history = useHistory();
  // change date format to 01/01/01
  const reviewDateArray = reviewData.date.split("T")[0].split("-");
  const reviewDate =
    reviewDateArray[2] +
    "/" +
    reviewDateArray[1] +
    "/" +
    reviewDateArray[0].slice(2);

  const handleClickLike = async (likeOrDislike) => {
    console.log("handleClickLike");
    const userId = Cookies.get("userId");
    const token = Cookies.get("userToken");
    try {
      const response = await axios.put(
        "https://gamepad-clone.herokuapp.com/game/review/rating",
        {
          gameId: reviewData.game_id,
          reviewId: reviewData._id,
          like: likeOrDislike,
          userId,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      // console.log(response.data);
      getUserRatingList();
      getGameReviewList();
    } catch (error) {
      console.log(error.messsage);
    }
  };

  const checkLikedAndChangeThumbColor = (pozOrNeg) => {
    if (userRatings) {
      if (pozOrNeg === "poz") {
        if (userRatings.user.positive.indexOf(reviewData._id) !== -1) {
          return true;
        } else {
          return false;
        }
      } else {
        if (userRatings.user.negative.indexOf(reviewData._id) !== -1) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  return (
    <div key={id} className="review">
      <h3>{reviewData.title}</h3>
      <p>{reviewData.text}</p>
      <div className="writer">
        <div className="col-1">
          <div className="writer-photo">
            <img
              src={reviewData.owner.avatar ? reviewData.owner.avatar : logo}
              alt="profile"
            />
          </div>
          <div className="writer-name">
            <span>{reviewDate}</span>
            <span className="username">{reviewData.owner.name}</span>
          </div>
        </div>
        <div className="col-2">
          {reviewData.rating < 0 && (
            <span className="rating-note-neg">{reviewData.rating}</span>
          )}

          <FontAwesomeIcon
            style={{ color: checkLikedAndChangeThumbColor("neg") && "red" }}
            onClick={() => {
              token ? handleClickLike("negative") : history.push("/login");
            }}
            className="icon-like"
            icon="thumbs-down"
          />
          {reviewData.rating > 0 && (
            <span className="rating-note-poz">+{reviewData.rating}</span>
          )}
          <FontAwesomeIcon
            style={{ color: checkLikedAndChangeThumbColor("poz") && "green" }}
            onClick={() => {
              token
                ? handleClickLike("pozitive")
                : history.push({
                    pathname: "/login",
                    state: { precedentPath: "/game/" + reviewData.game_id },
                  });
            }}
            className="icon-like"
            icon="thumbs-up"
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
