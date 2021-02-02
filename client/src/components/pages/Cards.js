import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AboutUs from "./AboutUsCard";
import useWindowPosition from "../hook/useWindowPosition";
import Login from "./login";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

export default function Cards() {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div className={classes.root} id="aboutus-login-cards">
      <AboutUs checked={checked} />
      <Login checked={checked} />
    </div>
  );
}
