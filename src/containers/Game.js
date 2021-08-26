import "./game.css";
import { useParams, useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ActivityIndicator from "../components/ActivityIndicator";
import Cookies from "js-cookie";
import WriteAReview from "../components/WriteAReview";
import Review from "../components/Review";

const Game = ({ token, getCollectionList, userCollection }) => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [gamesLikeData, setGamesLikeData] = useState("");
  const [displayWriteReview, setDisplayWriteReview] = useState(false);
  const [gameRewiews, setGameReviews] = useState("");
  const [userRatings, setUserRatings] = useState("");
  const { id } = useParams();
  const history = useHistory();

  let isGameSaved = false;

  const getGameReviewList = async () => {
    try {
      const response = await axios.get(
        `https://gamepad-clone.herokuapp.com/game/reviews/get/${id}`
      );
      console.log(response.data.message);

      if (response.data.message) {
        setGameReviews(response.data.message);
        console.log("reviews ===>", response.data.message);
      } else {
        setGameReviews([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserRatingList = async () => {
    try {
      const userId = Cookies.get("userId");
      const response = await axios.get(
        `https://gamepad-clone.herokuapp.com/user/ratings/get?id=${userId}`
      );
      console.log("getUserRatingList==>", response.data);
      setUserRatings(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `https://gamepad-clone.herokuapp.com/game/${id}`
        );
        // console.log(response1.data);
        setData(response1.data);
        getGameReviewList();
        if (response1.status === 200) {
          try {
            const params = {
              page_size: 6,
              ordering: "relavance",
              search: response1.data.message.name,
              genres: "0",
            };
            const response2 = await axios.get(
              "https://gamepad-clone.herokuapp.com/game/all",
              {
                params: params,
              }
            );
            const results = response2.data.message.results;
            console.log("games like===>", response2);
            let counter = 0;
            const newResults = [];
            for (let i = 0; i < results.length; i++) {
              if (results[i].name !== response1.data.message.name) {
                counter++;
                newResults.push(results[i]);
              }
              if (counter === 5) {
                break;
              }
            }

            setGamesLikeData(newResults);
          } catch (error) {
            console.log(error.message);
          }
        }
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    getCollectionList();
    getUserRatingList();
  }, [id]);

  const handleSaveToCollection = async () => {
    const gameData = {
      id: data.message.id,
      name: data.message.name,
      photo: data.message.background_image,
    };

    // console.log(gameData);

    const id = Cookies.get("userId");
    const token = Cookies.get("userToken");
    const operation = "add";
    try {
      const response = await axios.put(
        "https://gamepad-clone.herokuapp.com/user/collection/update",
        {
          gameData,
          id,
          operation,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data.message);
      getCollectionList();
      // console.log("handleSaveToCollection");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!isLoading) {
    const games = userCollection;
    for (let i = 0; i < games.length; i++) {
      if (Number(games[i].game_id) === Number(id)) {
        isGameSaved = true;
        break;
      }
    }
  }

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <div className="game container">
      <div className="game_details">
        <h1>{data.message.name}</h1>
        <div className="game_info">
          <div className="info_col_1">
            <img src={data.message.background_image} alt={data.message.name} />
          </div>
          <div className="info_col_2">
            <section className="info_col_2_line_1">
              <div
                onClick={() => {
                  token
                    ? handleSaveToCollection()
                    : history.push({
                        pathname: "/login",
                        state: {
                          precedentPath: "/game/" + data.message.id,
                        },
                      });
                }}
              >
                <p>{isGameSaved && token ? "Saved" : "Save"} to</p>
                <p>
                  <span style={{ color: isGameSaved && token && "lightgreen" }}>
                    Collection
                  </span>{" "}
                  <FontAwesomeIcon
                    icon="bookmark"
                    style={{ color: isGameSaved && token && "lightgreen" }}
                  />
                </p>
              </div>
              <div
                onClick={() => {
                  token
                    ? setDisplayWriteReview(true)
                    : history.push({
                        pathname: "/login",
                        state: {
                          precedentPath: "/game/" + data.message.sid,
                        },
                      });
                }}
              >
                <p>Add a</p>
                <p>
                  <span>Review</span> <FontAwesomeIcon icon="comment" />
                </p>
              </div>
            </section>
            <div className="info_col_2_other_lines">
              <div className="info_col_2_other_lines_col_1">
                <section className="info_col_2_line_2">
                  <h2>Platforms</h2>
                  <p>
                    {data.message.platforms.map((elem, index) => {
                      return (
                        <span className="platforms" key={elem.platform.id}>
                          {elem.platform.name}
                          {data.message.platforms.length !== index + 1 && (
                            <span>,</span>
                          )}
                        </span>
                      );
                    })}
                  </p>
                </section>
                <section className="info_col_2_line_3">
                  <h2>Released date</h2>
                  <p>{data.message.released}</p>
                </section>
                <section className="info_col_2_line_4">
                  <h2>Publisher</h2>
                  <p>
                    {data.message.publishers.map((elem, index) => {
                      return (
                        <span key={elem.id}>
                          {elem.name}{" "}
                          {data.message.publishers.length !== index + 1 && (
                            <span>,</span>
                          )}{" "}
                        </span>
                      );
                    })}
                  </p>
                </section>
              </div>
              <div className="info_col_2_other_lines_col_2">
                <section className="info_col_2_line_2">
                  <h2>Genre</h2>
                  <p>
                    {" "}
                    {data.message.genres.map((elem, index) => {
                      return (
                        <span key={elem.id}>
                          {elem.name}{" "}
                          {data.message.genres.length !== index + 1 && (
                            <span>,</span>
                          )}{" "}
                        </span>
                      );
                    })}
                  </p>
                </section>
                <section className="info_col_2_line_3">
                  <h2>Developer</h2>
                  <p>
                    {data.message.developers.map((elem) => {
                      return <span key={elem.id}>{elem.name}</span>;
                    })}
                  </p>
                </section>
                <section className="info_col_2_line_4">
                  <h2>Age rating</h2>
                  <p>{data.message.rating}</p>
                </section>
              </div>
            </div>
            <section className="info_col_2_line_5">
              <h2>About</h2>
              <p className="info_about">{data.message.description.slice(3)}</p>
            </section>
          </div>
        </div>
      </div>
      <div className="games_like">
        <h1>Games like {data.message.name}</h1>
        <div className="game_like_ame_cards">
          {gamesLikeData.map((elem) => {
            return (
              <Link
                key={elem.id}
                to={{
                  pathname: `/game/${elem.id}`,
                  state: { name: elem.name },
                }}
              >
                <div key={elem.id} className="game_like_ame_cards_card">
                  <img src={elem.background_image} alt={elem.name} />
                  <div className="card_text">
                    <h6 className="card_title">{elem.name}</h6>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="game_reviews">
        <h1>
          Rewiews{" "}
          <span className="game_reviews_count">{gameRewiews.length}</span>
        </h1>

        {gameRewiews.length > 0 && <h2>Most relevant review</h2>}
        {displayWriteReview && (
          <WriteAReview
            getGameReviewList={getGameReviewList}
            gameId={id}
            setDisplayWriteReview={setDisplayWriteReview}
            gameName={data.message.name}
          />
        )}
        {gameRewiews.length > 0 ? (
          <div className="reviews">
            {gameRewiews.map((elem) => {
              return (
                <Review
                  token={token}
                  getUserRatingList={getUserRatingList}
                  userRatings={userRatings}
                  key={elem.id}
                  reviewData={elem}
                  getGameReviewList={getGameReviewList}
                />
              );
            })}
          </div>
        ) : (
          <h5 className="no_review">No review for this game !</h5>
        )}
      </div>
    </div>
  );
};
export default Game;
