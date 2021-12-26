/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import mainLogo from "../assets/img/logo.png";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import HomeFilter from "../components/HomeFilter";
import { Link } from "react-router-dom";
import ActivityIndicator from "../components/ActivityIndicator";
import windows from "../assets/img/Windows_logo.svg";
import playstation from "../assets/img/PlayStation_logo.svg";
import xbox from "../assets/img/Xbox_Logo.svg";

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
  const [displayAutocomplateBlock, setDisplayAutocomplateBlock] =
    useState(false);
  const [autocomplateResults, setAutocomplateResults] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // console.log("width", windowWidth);
  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setWindowWidth(innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let countString = "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          page: activePage,
          page_size: windowWidth > 990 || windowWidth < 767.98 ? 20 : 21,
          ordering: sortBy,
          search: searhedText,
          genres: type,
          parent_platforms: platform,
        };
        const response = await axios.get(
          "https://gamepad-back.api.dotonur.dev/game/all",
          {
            params: params,
          }
        );

        setData(response.data);
        setFullSearchedText(searhedText);
        setDisplayAutocomplateBlock(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, searchButtonTriggered, isSearchActive, windowWidth]);

  /// This useEffect will check wheter searched text is empity or not
  useEffect(() => {
    if (searhedText === "") {
      setActivePage(1);
      setSortBy("relavance");
      setPlatform("0");
      setType("0");
      setIsSearchActive(false);
      setSearchedText("");
      setDisplayAutocomplateBlock(false);
    } else {
      const fetchData = async () => {
        try {
          const params = {
            page: 1,
            page_size: 10,
            ordering: "relavance",
            search: searhedText,
            genres: "0",
            parent_platforms: "0",
          };
          const response = await axios.get(
            "https://gamepad-back.api.dotonur.dev/game/all",
            {
              params: params,
            }
          );
          console.log(response.data.message);
          setAutocomplateResults(response.data.message.results);
          console.log("AutocomplateResults", response.data.message.results);
          setFullSearchedText(searhedText);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
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

  const handleAutocomplateSearch = (text) => {
    setSearchedText(text);
    setActivePage(1);
    setSearchButtonTriggered(!searchButtonTriggered);
    setIsSearchActive(true);
    setDisplayAutocomplateBlock(false);
  };

  const verifyPlatform = (game, platform) => {
    if (game.parent_platforms) {
      if (game.parent_platforms.length > 0) {
        for (let i = 0; i < game.parent_platforms.length; i++) {
          if (game.parent_platforms[i].platform.id === platform) {
            return true;
          }
        }
      }
      return false;
    }
    return false;
  };
  return (
    <div className="home container">
      {isLoading ? (
        <ActivityIndicator height={"771px"} />
      ) : (
        <>
          <section className="home_hero">
            <img src={mainLogo} alt="gamepad" />
            <form
              style={{
                borderRadius: displayAutocomplateBlock && "20px 20px 0 0 ",
              }}
              onSubmit={(event) => handleSearch(event)}
              className="hero_search_block"
            >
              <input
                className="hero_search_block_input"
                value={searhedText}
                onChange={(event) => {
                  setSearchedText(event.target.value);
                  setDisplayAutocomplateBlock(true);
                }}
                type="search"
                placeholder="Search for a game"
              />
              <button type="submit">
                <FontAwesomeIcon className="search-icon" icon="search" />
              </button>
              {displayAutocomplateBlock && (
                <div className="autocomplate">
                  {autocomplateResults.length > 0 ? (
                    <>
                      {autocomplateResults.map((elem, index) => {
                        return (
                          <p
                            key={index}
                            onClick={() => handleAutocomplateSearch(elem.name)}
                          >
                            <span>
                              <span>
                                {" "}
                                <img
                                  src={elem.background_image}
                                  alt={elem.name}
                                />
                              </span>
                              <p>{elem.name}</p>
                            </span>
                            <FontAwesomeIcon
                              className="search-icon"
                              icon="search"
                            />
                          </p>
                        );
                      })}
                    </>
                  ) : (
                    <p>No rusults !</p>
                  )}
                </div>
              )}
            </form>
            {isSearchActive && (
              <h2 className="searchTextBlock">
                Search result for <span>"{fullSearchedText}"</span>{" "}
              </h2>
            )}
            <h4>
              {!isSearchActive && "Search for"} {countString} games
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
                        <p className="platform-icons">
                          {verifyPlatform(elem, 1) && (
                            <img src={windows} alt="" height="20" width="20" />
                          )}
                          {verifyPlatform(elem, 3) && (
                            <img src={xbox} alt="" height="20" width="20" />
                          )}
                          {verifyPlatform(elem, 2) && (
                            <img
                              src={playstation}
                              alt=""
                              height="20"
                              width="20"
                            />
                          )}
                        </p>
                        <h6 className="card_title">{elem.name}</h6>
                        <p style={{ fontWeight: 200 }}>
                          <FontAwesomeIcon icon="bookmark" color="red" /> +
                          {elem.added}
                        </p>
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
              perPage={20}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
