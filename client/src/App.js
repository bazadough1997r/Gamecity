import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import notfound from "./components/pages/notfound";
import Profile from "./components/pages/Profile";
import ProfileEdit from "./components/pages/ProfileEdit";

import GameList from "./components/games/GameList";
import GameInfo from "./components/games/GameInfo";
import GameAdd from "./components/games/GameAdd";
import GameEdit from "./components/games/GameEdit";
import { loadUser } from "./actions";
import { setToken } from "./components/pages/setToken";
import { store } from "./index";
import Login from "./components/pages/login";
import SearchForm from "./components/pages/SearchForm";
import Register from "./components/pages/register";
// import FooterPage from "./Footer"
import Land from "./components/Land";

if (localStorage.getItem("token")) {
  setToken(localStorage.getItem("token"));
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="container">
          <Main />
        </div>
      </Router>
    </div>
  );
}

var useremail=window.localStorage.email

function Navigation() {
  var value = false;
  if (window.localStorage.length > 0) {
    value = true;
  } else {
    value = false;
  }

  return (
    <div>
      {value === false ? (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <div className="container">
            <ul className="nav justify-content-start ">
              <li className="nav-item">
                <a href="/" className="navbar-brand">
                  <img
                    height="30px"
                    width="30px"
                    src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
                    alt="Gamecity logo"
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <div className="container">
            <ul className="nav justify-content-start ">
              <li className="nav-item">
              <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/"
                  style={{ color: "white" }}
                >
                  <img
                    height="30px"
                    width="30px"
                    src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
                    alt="Gamecity logo"
                  />
                </NavLink>
              </li>
            </ul>
            <ul className="nav justify-content-start">
              <li className="nav-item">
                <SearchForm />
              </li>
            </ul>
            <ul className="nav justify-content-end ">
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/games"
                  style={{ color: "white" }}
                >
                  Games
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/notifications"
                  style={{ color: "white" }}
                >
                  Notifications
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to={"/profile/"+useremail}
                  style={{ color: "white" }}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/land"
                  style={{ color: "white" }}
                  onClick={() => logout()}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}

function Main() {
  return (
    // { value === false ?
    <Switch>
      {/* <Route exact path="/" component={GameList} /> */}
      <Route exact path="/land" component={Land} />
      <ProtectedRoute
        exact
        path="/games"
        component={GameList}
        isAuth={localStorage.length > 0}

      />
      
      <ProtectedRoute
        exact
        path="/"
        component={GameList}
        isAuth={localStorage.length > 0}
      />
      <Route exact path="/games/new" component={GameAdd} />
      <Route exact path="/games/:_id" component={GameInfo} />
      <Route exact path="/games/:_id/edit" component={GameEdit} />
      <Route exact path="/editProfile/:email" component={ProfileEdit} />

      <Route exact path="/profile/:email" render={(props) => <Profile {...props} />} />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route
        exact
        path="/addUser"
        render={(props) => <Register {...props} />}
      />
      <Route exact path="/notfound" component={notfound} />
     
    </Switch>
  );
}

function logout() {
  window.localStorage.clear();
  window.location = "/land";
}
export default App;
//Our home page here is the GameList component.
