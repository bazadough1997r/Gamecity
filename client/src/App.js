import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { AppBar, Collapse, IconButton, Toolbar, Grid } from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import notfound from "./components/pages/notfound";
import Profile from "./components/pages/Profile";
import ProfileEdit from "./components/pages/ProfileEdit";

import GameList from "./components/games/GameList";
import GameInfo from "./components/games/GameInfo";
import GameAdd from "./components/games/GameAdd";
import GameEdit from "./components/games/GameEdit";
import Chat from "./components/pages/Chat";
import { loadUser } from "./actions";
import { setToken } from "./components/pages/setToken";
import { store } from "./index";
import Login from "./components/pages/login";
import SearchForm from "./components/pages/SearchForm";
import Register from "./components/pages/register";
import Header from "./components/pages/Header";
import Cards from "./components/pages/Cards";
// import FooterPage from "./Footer"
import Land from "./components/Land";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + './Images/game.1.jpg'})`,
    backgroundRepeat: "no-repeat",
    alignContent: "center",
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundSize: "cover"
  },
  rootNavBar: {
      flexGrow: "3",
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      // height: "100vh",
      background: "#070d13",
      fontFamily: "Century Gothic"
  },
  appBar: {
      background: "none",
      fontFamily: "Century Gothic"
  },
  appBarWrapperTwo: {
    width: "80%",
    margin: "0 auto"
},
  appBarWrapper: {
      width: "80%",
      margin: "0 auto"
  },
  appBarLogo: {
      flexGrow: "1",
      fontSize: "3rem"

  },
  gamesityTitle: {
      fontWeight: "bold",
      fontSize: "2.2rem",
      color: "#9bd4d8"       
  },
  icon: {
      color: "#fff",
      fontSize: "2rem"
  },
  body: {
      color: "#fff",
      fontFamily: "Century Gothic",
      fontSize: "2rem"

  },
  body2: {
      color: "#fff",
      fontFamily: "Century Gothic",
      fontSize: "1.65rem"

  },
  container: {
      textAlign: "center"
  },
  expandIcon: {
      color: "#fff",
      fontSize: "2rem",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    },
}));

if (localStorage.getItem("token")) {
  setToken(localStorage.getItem("token"));
}


function App() {
  const classes = useStyles();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div >
      <Router>
      <CssBaseline />
      {/* <Header /> */}
      <Navigation />
      <br/><br/>
      {/* <Login /> */}
        {/* <Navigation /> */}
        {/* <div >
          <Main />
        </div> */}
      </Router>
    </div>
  );
}

var useremail = window.localStorage.email;

function Navigation() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
      setChecked(true);
  }, [])
  var value = false;
  if (window.localStorage.length > 0) {
    value = true;
  } else {
    value = false;
  }

  return (
  <div>
      {value === false ? (
        <div className = {classes.root} id = "header">
        <AppBar position = "static" className = {classes.appBar} elevation = {0}>
            <Toolbar className = {classes.appBarWrapper}>
                {/* <h4 className = {classes.appBarLogo}>Gamesity</h4> */}
                <div>
                <Link
                  exact
                  // className="nav-link"
                  activeClassName="active"
                  to="/land"
                  style={{ color: "white" }}
                >
                <img
                    className = {classes.appBarLogo}
                    height="30px"
                    width="30px"
                    src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
                    alt="Gamecity logo"
                    />
                </Link>
                </div>
                {/* <IconButton>
                    <SortIcon className = {classes.icon} />
                </IconButton> */}
            </Toolbar>
        </AppBar>
        <Collapse in = {checked}  
            {...(checked ? { timeout: 1000 } : {})}
            collapsedHeight = {50}
        >
            <div className = {classes.container}>
              <br /> <br /> <br /> <br /> <br /> <br /> 
              <br /> <br /> <br /> <br /> <br /> <br /> 
              <br /> <br /> <br /> <br /> <br /> <br /> 
              <br />  
                <Scroll to= "aboutus-login-cards" smooth = {true} >
                    <IconButton>
                        <ExpandMoreIcon className = {classes.expandIcon}/>
                    </IconButton>
                </Scroll>
            </div>
        </Collapse>
        <div> 
          <br /> <br /> <br /> <br /> <br /> <br /> 
          <br /> <br /> <br />  
    </div>
        <Cards />
        <Main />
    </div>
      ) : (
      //   <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      //   <div className="container">
      //     <ul className="nav justify-content-start ">
      //       <li className="nav-item">
      //         <NavLink
      //           exact
      //           className="nav-link"
      //           activeClassName="active"
      //           to="/"
      //           style={{ color: "white" }}
      //         >
      //           <img
      //             height="30px"
      //             width="30px"
      //             src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
      //             alt="Gamecity logo"
      //           />
      //         </NavLink>
      //       </li>
      //     </ul>
      //     <ul className="nav justify-content-start">
      //       <li className="nav-item">
      //         <SearchForm />
      //       </li>
      //     </ul>
      //     <ul className="nav justify-content-end ">
      //       <li className="nav-item">
      //         <NavLink
      //           exact
      //           className="nav-link"
      //           activeClassName="active"
      //           to="/games"
      //           style={{ color: "white" }}
      //         >
      //           Games
      //         </NavLink>
      //       </li>
      //       {/* <li className="nav-item">
      //         <Link
      //           exact
      //           className="nav-link"
      //           activeClassName="active"
      //           to="/notifications"
      //           style={{ color: "white" }}
      //         >
      //           Notifications
      //         </Link>
      //       </li> */}
      //       <li className="nav-item">
      //         <NavLink
      //           exact
      //           className="nav-link"
      //           activeClassName="active"
      //           to="/chat"
      //           style={{ color: "white" }}
      //         >
      //           Chat Rooms
      //         </NavLink>
      //       </li>
      //       <li className="nav-item">
      //         <NavLink
      //           exact
      //           className="nav-link"
      //           activeClassName="active"
      //           to={"/profile/" + useremail}
      //           style={{ color: "white" }}
      //         >
      //           Profile
      //         </NavLink>
      //       </li>
      //       <li>
      //         <NavLink
      //           exact
      //           className="nav-link"
      //           activeClassName="active"
      //           to="/land"
      //           style={{ color: "white" }}
      //           onClick={() => logout()}
      //         >
      //           Logout
      //         </NavLink>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
        <div>
          <br/> <br/>  
        <div 
        id = "header"
        >
        <AppBar 
          className = {classes.rootNavBar} 
        // className = {classes.appBar} 
        elevation = {0}
        >
            <Toolbar 
            className = {classes.appBarWrapperTwo} variant="dense"
            >
          <div >
                <Link
                  exact
                  activeClassName="active"
                  to="/land"
                  style={{ color: "white" }}
                >
                  <img
                    height="30px"
                    width="30px"
                    src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
                    alt="Gamecity logo"
                  />
                </Link>
                <SearchForm className= {classes.search}/>
                <Link
                  exact
                  activeClassName="active"
                  to="/games"
                  style={{ color: "white" }}
                >
                  Games
                </Link>
                <Link
                  exact
                  activeClassName="active"
                  to="/chat"
                  style={{ color: "white" }}
                >
                  Chat Rooms
                </Link>
                <Link
                  exact
                  activeClassName="active"
                  to={"/profile/" + useremail}
                  style={{ color: "white" }}
                >
                  Profile
                </Link>
                <Link
                  exact
                  activeClassName="active"
                  to="/land"
                  style={{ color: "white" }}
                  onClick={() => logout()}
                >
                  Logout
                </Link>
          </div>
          </Toolbar>
          </AppBar>
          </div>
          <div>
          <Main />
          </div>
          </div>
      )}
    </div>
  );
}

function Main() {
  return (
    <Switch>
      <Route exact path="/land" component={Header} />
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
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/editProfile/:email" component={ProfileEdit} />
      <Route
        exact
        path="/addUser"
        render={(props) => <Register {...props} />}
      />
      <Route exact path="/profile/:email" render={(props) => <Profile {...props} />} />
      <Route
        exact
        path="/profile/:email"
        render={(props) => <Profile {...props} />}
      />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route
        exact
        path="/addUser"
        render={(props) => <Register {...props} />}
      />
      <Route exact path="/notfound" component={notfound} />
      {/* <Route exact path="/notifications" component={Notifications} /> */}
    </Switch>
  );
}

function logout() {
  window.localStorage.clear();
  window.location = "/land";
}
export default App;
