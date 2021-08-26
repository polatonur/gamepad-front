import axios from "axios";
import "./myCollection.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../components/Pagination";

const MyCollection = ({ getCollectionList }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const id = Cookies.get("userId");
      const token = Cookies.get("userToken");
      const response = await axios.get(
        `http://localhost:5000/user/collection/get?id=${id}&page=${activePage}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    };
    fetchData();
  }, [activePage]);

  const handleDeleteFromCollection = async (gameData) => {
    const id = Cookies.get("userId");
    const token = Cookies.get("userToken");
    try {
      const response = await axios.put(
        "http://localhost:5000/user/collection/update",
        {
          gameData,
          id,
          operation: "delete",
          page: activePage,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      setData(response.data);
      getCollectionList();
      console.log(response.data);
      //setUserCollection()
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(data.count);
  return (
    <div className="my_collection container">
      <section className="block_title">
        <h1>My Collection</h1>
      </section>
      {isLoading ? (
        <span>Loading ...</span>
      ) : (
        <section className="collection">
          {data.results.map((elem) => {
            return (
              <div key={elem.id} className="collection_card">
                <FontAwesomeIcon
                  color="red"
                  className="bookmark_icon"
                  icon="bookmark"
                />
                <div className="delete_block">
                  <FontAwesomeIcon
                    onClick={() => {
                      handleDeleteFromCollection(elem);
                    }}
                    className="delete_from_collection_icon"
                    icon="trash"
                  />
                </div>
                <img src={elem.photo} alt={elem.name} />
                <div className="card_text">
                  <h6 className="card_title">{elem.name}</h6>
                </div>
              </div>
            );
          })}
        </section>
      )}
      {data.count > 15 && (
        <Pagination
          perPage={15}
          count={data.count}
          setActivePage={setActivePage}
          activePage={activePage}
        />
      )}
    </div>
  );
};

export default MyCollection;
