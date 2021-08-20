import axios from "axios";
import { Link } from "react-router-dom";
import "./myCollection.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const MyCollection = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const id = Cookies.get("userId");
      const response = await axios.get(
        `http://localhost:5000/user/get/collection?id=${id}`
      );
      setData(response.data.message);
      setIsLoading(false);
      console.log(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="my_collection container">
      <section className="block_title">
        <h1>My Collection</h1>
      </section>
      {isLoading ? (
        <span>Loading ...</span>
      ) : (
        <section className="collection">
          {data.game_collection.map((elem, index) => {
            return (
              <Link
                to={{
                  pathname: `/game/${elem.id}`,
                  state: { name: elem.name },
                }}
              >
                <div key={elem.id} className="collection_card">
                  <img src={elem.photo} alt={elem.name} />
                  <div className="card_text">
                    <h6 className="card_title">{elem.name}</h6>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default MyCollection;
