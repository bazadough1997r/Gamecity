import React from "react";
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


function App() {
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
            <NavLink exact className="nav-link" activeClassName="active" to="/" style={{color:"#c6fc03"}}>
              Gamecity
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/">
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
      </div>
    </nav>
  );
}

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={GameList} />
      <Route exact path="/games/new" component={GameAdd} />
      <Route exact path="/games/:_id" component={GameInfo} />
      <Route exact path="/games/:_id/edit" component={GameEdit} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  );
}

export default App;
//Our home page here is the GameList component.
