import mainLogo from "../assets/img/logo.png";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import HomeFilter from "../components/HomeFilter";
import { Link } from "react-router-dom";
import ActivityIndicator from "../components/ActivityIndicator";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [searhedText, setSearchedText] = useState("");
  const [platform, setPlatform] = useState(null);
  const [type, setType] = useState(null);
  const [sortBy, setSortBy] = useState("relavance");
  const [searchButtonTriggered, setSearchButtonTriggered] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [fullSearchedText, setFullSearchedText] = useState("");
  let countString = "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          page: activePage,
          page_size: 20,
          ordering: sortBy,
          search: searhedText,
          genres: type,
          parent_platforms: platform,
        };
        const response = await axios.get("http://localhost:5000/game/all", {
          params: params,
        });
        console.log(response.data.message);
        setData(response.data);
        setFullSearchedText(searhedText);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [activePage, searchButtonTriggered, isSearchActive]);

  /// This useEffect will check wheter searched text is empity or not
  useEffect(() => {
    if (searhedText === "") {
      setActivePage(1);
      setSortBy("relavance");
      setPlatform("0");
      setType("0");
      setIsSearchActive(false);
      setSearchedText("");
    }
  }, [searhedText]);

  // seperate result count to show something more visible like 122 333 instead 1223333
  if (!isLoading) {
    if (data.message.count > 999) {
      let stringTemp = data.message.count.toString();
      countString =
        stringTemp.slice(0, stringTemp.length - 3) +
        " " +
        stringTemp.slice(stringTemp.length - 3);
    } else {
      countString = data.message.count.toString();
    }
  }

  const handleSearch = (event) => {
    event.preventDefault();
    setActivePage(1);
    setSearchButtonTriggered(!searchButtonTriggered);
    setIsSearchActive(true);
  };
  return isLoading ? (
    // <div style={{ color: "white" }}>Loading...</div>
    <ActivityIndicator />
  ) : (
    <div className="home container">
      <section className="home_hero">
        <img src={mainLogo} alt="gamepad" />
        <form
          onSubmit={(event) => handleSearch(event)}
          className="hero_search_block"
        >
          <input
            value={searhedText}
            onChange={(event) => setSearchedText(event.target.value)}
            type="search"
            placeholder="Search for a game"
          />
          <button type="submit">
            <FontAwesomeIcon className="search-icon" icon="search" />
          </button>
        </form>
        {isSearchActive && (
          <h2 className="searchTextBlock">
            Search result for <span>"{fullSearchedText}"</span>{" "}
          </h2>
        )}
        <h4>
          {!searhedText && "Search for"} {countString} games
        </h4>
      </section>
      <section className="home_main">
        <div className="main_title_block">
          {!isSearchActive ? (
            <h1>Most Relevance Games</h1>
          ) : (
            data.message.count !== 0 && (
              <HomeFilter
                searchButtonTriggered={searchButtonTriggered}
                setSearchButtonTriggered={setSearchButtonTriggered}
                setActivePage={setActivePage}
                setPlatform={setPlatform}
                setSortBy={setSortBy}
                setType={setType}
              />
            )
          )}
        </div>
        <div className="main_cards">
          {data.message.results.map((elem) => {
            return (
              <Link
                key={elem.id}
                to={{
                  pathname: `/game/${elem.id}`,
                  state: { name: elem.name },
                }}
              >
                <div className="card">
                  <img src={elem.background_image} alt={elem.name} />
                  <div className="card_text">
                    <h6 className="card_title">{elem.name}</h6>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {data.message.count !== 0 && (
        <Pagination
          count={data.message.count}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </div>
  );
};

export default Home;
