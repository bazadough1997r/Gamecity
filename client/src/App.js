import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  AppBar,
  Collapse,
  IconButton,
  Toolbar,
  Button,
  Badge,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { CssBaseline } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
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
import Cards from "./components/pages/Cards";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Notifications from "./components/games/Notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "./Images/game.1.jpg"})`,
    backgroundRepeat: "no-repeat",
    alignContent: "center",
  },
  rootNavBar: {
    flexGrow: "1",
    background: "#070d13",
    fontFamily: "Century Gothic",
  },
  appBar: {
    background: "none",
    fontFamily: "Century Gothic",
  },
  appBarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appBarLogo: {
    flexGrow: "1",
    fontSize: "3rem",
  },
  gamesityTitle: {
    fontWeight: "bold",
    fontSize: "2.2rem",
    color: "#9bd4d8",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  body: {
    color: "#fff",
    fontFamily: "Century Gothic",
    fontSize: "2rem",
  },
  container: {
    textAlign: "center",
  },
  expandIcon: {
    color: "#070d13",
    fontSize: "3.5rem",
    marginLeft: "20px",
  },
}));

if (localStorage.getItem("token")) {
  setToken(localStorage.getItem("token"));
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <Router>
        <CssBaseline />
        <Navigation />
      </Router>
    </div>
  );
}

var useremail = window.localStorage.email;

function Navigation() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNot, setAnchorElNot] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNot = (event) => {
    setAnchorElNot(event.currentTarget);
  };

  const handleCloseNot = () => {
    setAnchorElNot(null);
  };

  useEffect(() => {
    setChecked(true);
  }, []);

  var value = false;
  if (window.localStorage.length > 0) {
    value = true;
  } else {
    value = false;
  }

  return (
    <div>
      {value === false ? (
        <div className={classes.root} id="header">
          <Collapse
            in={checked}
            {...(checked ? { timeout: 1000 } : {})}
            collapsedHeight={50}
          >
            <div className={classes.container}>
              <br /> <br /> <br /> <br /> <br /> <br />
              <br /> <br /> <br /> <br /> <br /> <br />
              <br /> <br /> <br />
              <br /> <br /> <br />
              <Scroll to="aboutus-login-cards" smooth={true}>
                <IconButton>
                  <ExpandMoreIcon className={classes.expandIcon} />
                </IconButton>
              </Scroll>
            </div>
          </Collapse>
          <div>
            <br /> <br /> <br /> <br /> <br /> <br />
            <br /> <br /> <br /> <br /> <br />
            <Cards />
            <Main />
          </div>
          <br /> <br />
        </div>
      ) : (
        <div>
          <AppBar
            id="header"
            position="static"
            style={{ background: "#070d13" }}
            elevation={0}
          >
            <Toolbar>
              <Link
                exact="true"
                activeclassname="active"
                to="/games"
                style={{ color: "white", flexGrow: 1 }}
              >
                <img
                  height="30px"
                  width="30px"
                  src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
                  alt="Gamecity logo"
                />
              </Link>

              <SearchForm />

              <IconButton>
                <Link
                  color="inherit"
                  exact="true"
                  activeclassname="active"
                  to="/games"
                >
                  <HomeIcon style={{ color: "white" }} />
                </Link>
              </IconButton>

              <div>
                <Badge
                  badgeContent={6}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClickNot}
                  >
                    <NotificationsActiveIcon style={{ color: "white" }} />
                  </IconButton>
                </Badge>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorElNot}
                  keepMounted
                  open={Boolean(anchorElNot)}
                  onClose={handleCloseNot}
                >
                  <MenuItem onClick={handleCloseNot}>
                    <Notifications />
                  </MenuItem>
                </Menu>
              </div>

              <div>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleClick}
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      exact="true"
                      activeclassname="active"
                      to={"/profile/" + useremail}
                    >
                      <Button style={{ color: "#070d13" }}>Profile</Button>
                    </Link>
                  </MenuItem>
                  <hr />
                  <MenuItem>
                    <Link
                      exact="true"
                      activeclassname="active"
                      to="/land"
                      onClick={() => logout()}
                    >
                      <Button style={{ color: "#070d13" }}>Logout</Button>
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
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
      <ProtectedRoute
        exact="true"
        path="/games"
        component={GameList}
        isAuth={localStorage.length > 0}
      />

      <ProtectedRoute
        exact="true"
        path="/"
        component={GameList}
        isAuth={localStorage.length > 0}
      />
      <Route exact="true" path="/games/new" component={GameAdd} />
      <Route exact="true" path="/games/:_id" component={GameInfo} />
      <Route exact="true" path="/games/:_id/edit" component={GameEdit} />
      <Route exact="true" path="/editProfile/:email" component={ProfileEdit} />
      <Route
        exact="true"
        path="/addUser"
        render={(props) => <Register {...props} />}
      />
      <Route
        exact="true"
        path="/profile/:email"
        render={(props) => <Profile {...props} />}
      />
      <Route
        exact="true"
        path="/login"
        render={(props) => <Login {...props} />}
      />
      <Route
        exact="true"
        path="/addUser"
        render={(props) => <Register {...props} />}
      />
      <Route exact="true" path="/notfound" component={notfound} />
      <Route path="/chat/:id" render={(props) => <Chat {...props} />} />
    </Switch>
  );
}

function logout() {
  window.localStorage.clear();
  window.location = "/land";
}
export default App;
