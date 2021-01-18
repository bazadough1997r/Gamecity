import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Collapse, IconButton, Toolbar } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
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
  appBarLogo: {},
  gamesityTitle: {
    fontWeight: "bold",
    fontSize: "2.2rem",
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
  body2: {
    color: "#fff",
    fontFamily: "Century Gothic",
    fontSize: "1.65rem",
  },
  container: {
    textAlign: "center",
  },
  expandIcon: {
    color: "#fff",
    fontSize: "2rem",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar className={classes.appBarWrapper}>
          <img
            className={classes.appBarLogo}
            height="30px"
            width="30px"
            src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
            alt="Gamecity logo"
          />
        </Toolbar>
      </AppBar>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h3 className={classes.body}>
            Welcome to <span className={classes.gamesityTitle}>Gamesity</span>
          </h3>
          <h4 className={classes.body2}>Now, let's start playing</h4>
          <Scroll to="aboutus-login-cards" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.expandIcon} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
