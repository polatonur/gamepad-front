import "./writeAReview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const WriteAReview = ({
  setDisplayWriteReview,
  gameName,
  gameId,
  getGameReviewList,
}) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    const ownerId = Cookies.get("userId");
    const token = Cookies.get("userToken");

    try {
      const response = await axios.post(
        `https://gamepad-clone.herokuapp.com/game/reviews/add/${gameId}`,
        {
          reviewTitle,
          reviewText,
          ownerId,
          gameName,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setDisplayWriteReview(false);
      getGameReviewList();
      console.log(response.data.message.reviews);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="write_a_review container" id="write_a_review">
      <main className="write_a_review_block">
        <FontAwesomeIcon
          onClick={() => {
            setDisplayWriteReview(false);
          }}
          className="write_a_review_close_icon"
          icon="times"
        />
        <h1 className="write_a_review_title">
          Write a Review about <span>{gameName}</span>{" "}
        </h1>
        <form
          onSubmit={(event) => {
            handleSubmitReview(event);
          }}
          className="write_a_review_form"
        >
          <span>Review Title</span>
          <input
            value={reviewTitle}
            onChange={(event) => {
              setReviewTitle(event.target.value);
            }}
            type="text"
          />
          <span>Review text</span>
          <textarea
            value={reviewText}
            onChange={(event) => {
              setReviewText(event.target.value);
            }}
            rows="4"
            cols="74"
          />
          <button type="submit">Publish</button>
        </form>
      </main>
    </div>
  );
};

export default WriteAReview;
