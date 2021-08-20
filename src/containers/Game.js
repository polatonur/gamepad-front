import "./game.css";
import { useParams, useLocation, useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import ActivityIndicator from "../components/ActivityIndicator";
import Cookies from "js-cookie";

const Game = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [gamesLikeData, setGamesLikeData] = useState("");
  const { id } = useParams();
  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://localhost:5000/game/${id}`);
        console.log(response1.data);
        setData(response1.data);
        if (response1.status === 200) {
          try {
            const params = {
              page_size: 6,
              ordering: "relavance",
              search: state.name,
              genres: response1.data.message.genres[0].slug,
            };
            const response2 = await axios.get("http://localhost:5000/games", {
              params: params,
            });
            const results = response2.data.message.results;
            console.log();
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
  }, [id, state.name]);

  const handleSaveToCollection = async () => {
    const gameData = {
      id: data.message.id,
      name: data.message.name,
      photo: data.message.background_image,
    };

    console.log(gameData);

    const id = Cookies.get("userId");
    const operation = "add";
    try {
      const response = axios.post(
        "http://localhost:5000/user/update/collection",
        {
          gameData,
          id,
          operation,
        }
      );
      //   console.log("handleSaveToCollection");
    } catch (error) {
      console.log(error.message);
    }
  };

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
                  token ? handleSaveToCollection() : history.push("/login");
                }}
              >
                <p>Save to</p>
                <p>
                  <span style={{ color: token && "lightgreen" }}>
                    Collection
                  </span>{" "}
                  <FontAwesomeIcon icon="bookmark" />
                </p>
              </div>
              <div>
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
                    {data.message.platforms.map((elem) => {
                      return (
                        <span className="platforms" key={elem.platform.id}>
                          {elem.platform.name},
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
                    {data.message.publishers.map((elem) => {
                      return <span key={elem.id}>{elem.name}, </span>;
                    })}
                  </p>
                </section>
              </div>
              <div className="info_col_2_other_lines_col_2">
                <section className="info_col_2_line_2">
                  <h2>Genre</h2>
                  <p>
                    {" "}
                    {data.message.genres.map((elem) => {
                      return <span key={elem.id}>{elem.name}, </span>;
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
          {gamesLikeData.map((elem, index) => {
            return (
              <Link
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
        <h1>Rewiews</h1>
      </div>
    </div>
  );
};
export default Game;
