import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import "./App.css";
import Profile from "./components/pages/Profile";
import GameList from "./components/games/GameList";
import GameInfo from "./components/games/GameInfo";
import GameAdd from "./components/games/GameAdd";
import GameEdit from "./components/games/GameEdit";
import Land from "./components/Land";
import { loadUser } from "./actions";
import { setToken } from "./components/pages/setToken";
import { store } from "./index";
import  login  from "./components/pages/login";
import SearchForm from "./components/pages/SearchForm";



if(localStorage.getItem("token")){
  setToken(localStorage.getItem("token"))
}


function App() {

  useEffect(()=> {
    store.dispatch(loadUser());
  }, [])


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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active"
              to="/home"
              style={{ color: "#c6fc03" }}
            >
              Gamecity
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/games">
              Games
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active"
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active"
              to="/notifications"
            >
              Notifications
            </NavLink>
          </li>
        </ul>
        <SearchForm className="nav-item" />
      </div>
    </nav>
  );
}

function Main() {
  return (
    <Switch>
      <Route exact path="/home" component={Land} />
      <Route exact path="/games" component={GameList} />
      <Route exact path="/" component={GameList} />
      <Route exact path="/games/new" component={GameAdd} />
      <Route exact path="/games/:_id" component={GameInfo} />
      <Route exact path="/games/:_id/edit" component={GameEdit} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/login" component={login} />
    </Switch>
  );
}

export default App;
//Our home page here is the GameList component.
