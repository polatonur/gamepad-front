import mainLogo from "../assets/img/logo.png";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          page: 1,
          page_size: 20,
          ordering: "relavance",
        };
        const response = await axios.get("http://localhost:5000/games", {
          params: params,
        });
        console.log(response.data.message);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <div style={{ color: "white" }}>Loading...</div>
  ) : (
    <div className="home container">
      <section className="home_hero">
        <img src={mainLogo} alt="gamepad" />
        <div className="hero_search_block">
          <input type="search" placeholder="Search for a game" />
          <FontAwesomeIcon className="search-icon" icon="search" />
        </div>
        {/* <h4>Search for {data.message.count} games</h4> */}
      </section>
      <section className="home_main">
        <div className="main_title_block">
          <h1>Most Relevance Games</h1>
        </div>
        <div className="main_cards">
          {arr.map((elem, index) => {
            return (
              <div key={index} className="card">
                {/* <img src={elem.background_image} alt={elem.name} /> */}
                <div className="card_text">
                  <h6 className="card_title">{elem}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Pagination
        count={100}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
};

export default Home;
