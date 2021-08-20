import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
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
} from "@fortawesome/free-solid-svg-icons";
import Home from "./containers/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Game from "./containers/Game";
import Cookies from "js-cookie";
import { useState } from "react";
import MyCollection from "./containers/MyCollection";

library.add(
  faUpload,
  faBookmark,
  faComment,
  faUser,
  faSearch,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faSignOutAlt
);

const App = () => {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const setUser = (token, username, avatar, id) => {
    console.log("setuser");
    console.log(`${id} ${token} ${username} ${avatar}`);
    setToken(token);
    Cookies.set("userToken", token, { expires: 365 });
    Cookies.set("userName", username, { expires: 365 });
    Cookies.set("userAvatar", avatar, { expires: 365 });
    Cookies.set("userId", id, { expires: 365 });
  };

  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game/:id">
          <Game token={token} />
        </Route>
        <Route path="/user/collection">
          {token ? <MyCollection /> : <Redirect to="/login" />}
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
