import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/pages/ProtectedRoute"
import notfound from "./components/pages/notfound"
import Profile from "./components/pages/Profile";
import GameList from "./components/games/GameList";
import GameInfo from "./components/games/GameInfo";
import GameAdd from "./components/games/GameAdd";
import GameEdit from "./components/games/GameEdit";
import { loadUser } from "./actions";
import { setToken } from "./components/pages/setToken";
import { store } from "./index";
import login from "./components/pages/login";
import SearchForm from "./components/pages/SearchForm";
import register from "./components/pages/register";
import { connect } from 'react-redux'


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

function Navigation() {
  return (
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
        <ul className="nav justify-content-start">
          <li className="nav-item">
            <SearchForm/>
          </li>
        </ul>
        <ul className="nav justify-content-end ">
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active"
              to="/games"
              style={{color: "white"}}
            >
              Games
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{color: "white"}}
            >
              Account
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
              <a className="dropdown-item" href="/land">
                Logout
              </a>
              <div className="dropdown-divider"></div>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{color: "white"}}
            >
              Notifications
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="/notifications">
                Notification#1
              </a>
              <a className="dropdown-item" href="/notifications">
                Notification#2
              </a>
            </div>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active"
              to="/addUser"
              style={{color: "white"}}
            >
              Signup
            </NavLink>
          </li>
          <li>
          <NavLink
              exact
              className="nav-link"
              activeClassName="active"
              to="/addUser"
              style={{color: "white"}}
              onClick = { () => logout() }
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return (
    <Switch>
      {/* <Route exact path="/" component={GameList} /> */} 
      <ProtectedRoute exact path="/games" component={GameList} isAuth={localStorage.length>0}/>
      <Route exact path="/" component={GameList} /> 
      <Route exact path="/games/new" component={GameAdd} />
      <Route exact path="/games/:_id" component={GameInfo} />
      <Route exact path="/games/:_id/edit" component={GameEdit} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/login" component={login} />
      <Route exact path="/addUser" component={register} />
      <Route exact path="/notfound" component={notfound} />
    </Switch>
  );
}


function logout() {
  window.localStorage.clear();
  window.location = "/addUser";
}
export default (App);
//Our home page here is the GameList component.
