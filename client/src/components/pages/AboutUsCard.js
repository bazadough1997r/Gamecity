import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Collapse } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 430,
    height: 550,
    background: "rgba(0,0,0,0.5)",
    margin: "30px",
  },
  title: {
    fontFamily: "Century Gothic",
    fontWeight: "semi-bold",
    fontSize: "2rem",
    color: "#fff",
  },
  media: {
    height: 225,
  },
  description: {
    fontFamily: "Century Gothic",
    fontSize: "1.2rem",
    color: "#ddd",
    textAlign: "center",
  },
});

export default function AboutUs(checked) {
  const classes = useStyles();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL + `/Images/aboutUs.jpg`}
          title="About Us"
        />
        <CardContent>
          <br />
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}
          >
            Gamesity is a community building game-based platform, designed to
            bring people from different places together. So, what do you do? You
            simply register, post about when your next game is, and how many
            people you need to complete your team! Agree on a date and time,
            chat together in your chat room and enjoy the game!
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
}
