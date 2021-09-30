import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faTrash,
  faBookmark,
  faComment,
  faUser,
  faSearch,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faUpload,
  faSignOutAlt,
  faThumbsUp,
  faThumbsDown,
  faCamera,
  faEdit,
  faEyeSlash,
  faEye,
  faBars,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Home from "./containers/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Game from "./containers/Game";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import MyCollection from "./containers/MyCollection";
import axios from "axios";
import MyProfile from "./containers/MyProfile";

library.add(
  faArrowRight,
  faArrowLeft,
  faEyeSlash,
  faEye,
  faEdit,
  faCamera,
  faTimes,
  faTrash,
  faUpload,
  faBookmark,
  faComment,
  faUser,
  faSearch,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faSignOutAlt,
  faThumbsUp,
  faThumbsDown,
  faBars
);

const App = () => {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [userCollection, setUserCollection] = useState("");

  const getCollectionList = async () => {
    const id = Cookies.get("userId");
    const token = Cookies.get("userToken");
    const response = await axios.get(
      `https://gamepad-back.api.dotonur.dev/user/collection/get?id=${id}`,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    setUserCollection(response.data.message);
  };

  console.log("user collection ====>", userCollection);
  useEffect(() => {
    if (token) {
      getCollectionList();
    }
  }, [token]);

  const setUser = (token, username, avatar, id) => {
    console.log("setuser");
    console.log(`${id} ${token} ${username} ${avatar}`);
    Cookies.set("userToken", token, { expires: 365 });
    Cookies.set("userName", username, { expires: 365 });
    Cookies.set("userAvatar", avatar, { expires: 365 });
    Cookies.set("userId", id, { expires: 365 });
    getCollectionList(id);
    setToken(token);
  };

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        setUserCollection={setUserCollection}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game/:id">
          <Game
            getCollectionList={getCollectionList}
            userCollection={userCollection}
            token={token}
          />
        </Route>
        <Route path="/user/collection">
          {token ? (
            <MyCollection getCollectionList={getCollectionList} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { precedentPath: "/user/collection" },
              }}
            />
          )}
        </Route>
        <Route path="/user/account">
          {token ? (
            <MyProfile setUser={setUser} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { precedentPath: "/user/account" },
              }}
            />
          )}
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
