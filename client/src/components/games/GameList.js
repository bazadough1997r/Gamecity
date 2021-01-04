import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import axios from "axios";
import { patch } from "axios";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { likePost, unlikePost, joinPost, unjoinPost, setGames } from "../../actions/index.js"
import GameRendered from "../games/GameRendered";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { IconButton } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';



// import Chat from '../pages/Chat';
// import { heart } from "@fortawesome/free-solid-svg-icons";

// import { copyFileSync } from "fs";

const useStyles = makeStyles({
  card: {
    width: 550,
    height: 600
  },
  buttons: {
    // padding: 10
  },
  newGameButton: {
    width: 550,
  },
  notifications: {
      // width: "80%",
      marginRight: 50,
      marginLeft: 50
  },
  ad:{
    // marginRight: 10,
    // marginLeft: 50
  }
});

function GameList(props) {
  const classes = useStyles();

  const [commentField, setComment] = useState({ comment: "", id: "", username: window.localStorage.username, joins: 0, likes: 0 });
  const [games, setGames] = useState([]);
  const dispatch = useDispatch();
  console.log(games, "games for the warning")
  function handleChangeComment(event) {
    setComment({ ...commentField, comment: event.target.value, id: event.target.name, username: window.localStorage.username });
  }


  function handleSubmitComment(event) {
    event.preventDefault();
    async function comment() {
      try {
        await patch(`/api/games/${commentField.id}/comment`, commentField);
        // console.log(commentField.id, "ID from the edit")
        props.history.push(`/games/${commentField.id}/comment`);
      } catch (error) {
        console.log(error);
      }
    }
    comment();
  }

  useEffect(function () {
    async function getGames() {
      try {
        const response = await axios.get("/api/games");
        setGames(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getGames();
  }, []);

  // conditional rendering for notifications
  var useremail = window.localStorage.email;
  var value = false;
  if (window.localStorage.length > 0) {
    value = true;
  } else {
    value = false;
  }

  return (
    <div>
      <br/><br/><br/>
      <Grid container direction = "row" justify= "center" alignItems="flex-start">
        <Grid item  xs={6} sm ={3} className= {classes.notifications}>
            <br></br>
            <Filter />

            {/* Notifications part */}
            <hr></hr>

            <div>
              <p style= {{fontSize: "20px", fontWeight: "bold"}}>{window.localStorage.username}'s Notifications </p>
              {props.games.filteredItems.map((game) => {
                if (game.username === window.localStorage.username) {
                  return (
                    <div key={game._id}>
                        <form>
                          <div className="form-group">
                            {game.comment.map((theComment, i) => {
                              return (
                                <div key={i}>
                                  <p style= {{fontSize: "12px"}}>
                                    @{theComment.username} commented: "
                                    {theComment.comment}" on "
                                    <Link to={`/games/${game._id}`}>
                                      {game.gameName}
                                    </Link>
                                    " post.
                                  </p>
                                  <hr/>
                                </div>
                              );
                            })}
                          </div>
                        </form>
                    </div>
                  );
                } else {
                  console.log("no notifications for now")
                }
              }, null)}
            </div>
            {/* Notifications part done */}
            </Grid>            
            <Grid item  xs={12} sm={6} >
                  <Button variant="outlined" color="primary" className = {classes.newGameButton} >
                    <Link to="/games/new">
                      New Game
                    </Link>
                  </Button> 
            {props.games.filteredItems.map((game) => {
              return (
                <div key={game._id}>
                <br/><br/>
                <Card className={classes.card}>
                <CardActionArea>
                  <Grid>
                  <CardMedia
                    component="img"
                    alt="Game Image"
                    style={{ height: "150px" }} 
                    image={game.selectedFile}
                    title="Image goes here"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h5">@{game.username}</Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                    <Link to={`/games/${game._id}`}>{game.gameName}</Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="h6">{game.createdAt}</Typography>
                    <Typography variant="body1"  component="h5">
                      Location: Jordan/{game.gameGovernorate}, Game: {game.gameType}, Date: {game.gameDate}, Duration: {game.gameDuration} 
                      <hr />
                    </Typography>
                    <IconButton >
                    {/* {value === false ? ( */}
                          <ThumbUpAltIcon className = {classes.buttons} name={game._id} onClick={() => dispatch(likePost(game, commentField))}/> 
                          <ThumbDownAltIcon onClick={() => dispatch(unlikePost(game, commentField))}/>
                      {/* // ) : ( */}
                        {/* // )} */}
                        <div>
                          <PersonAddIcon name={game._id} onClick={() => dispatch(joinPost(game, commentField))}/>
                          </div>
                        <PersonAddDisabledIcon name={game._id} onClick={() => dispatch(unjoinPost(game, commentField))}/>
                    </IconButton>
                    <hr/>
                    <Typography gutterBottom variant="body1" component="h5">Likes: {game.likeCount.length} | Joined: {game.joinCount.length}</Typography>
                    {game.joinCount.map((joined, i) => {
                      return (
                        <div key={i}>
                          <Typography gutterBottom variant="body2" component="h5">Joined: @{joined.username}</Typography>
                        </div>
                      )
                    })}
                    <hr/>
                    <Grid  xs={6} sm= {3}>
                        <TextField 
                          id="standard-size-small" 
                          variant="outlined"
                          className = {classes.textField} 
                          style = {{width: 390}}
                          name={game._id}
                          type="text"
                          value={commentField.comment.name}
                          onChange={handleChangeComment}
                          className="form-control"
                          placeholder="Type in your comment here..."
                        />
                        <Button onClick={handleSubmitComment}>Comment</Button>
                        <br /> <br />
                        {game.comment.map((theComment, i) => {
                          return (
                            <div key={i}>
                              {/* {console.log(theComment)} */}
                              <Typography>@{theComment.username}: {theComment.comment}</Typography>
                            </div>
                          )
                        })}

                      </Grid>
                  </CardContent>
                  </Grid>
                </CardActionArea>
              </Card>
                </div>
              );
            })}
            </Grid>

            <br></br>
            <br></br>
            <Grid item className= {classes.ad}  >
              <Link>
                <CardMedia
                  component="img"
                  alt="Game Image"
                  style={{ height: "400px", width: "225px" }} 
                  image={`${process.env.PUBLIC_URL}/Ads/ad1.gif`}
                  title="Playstation 6, now available"
                />
              </Link>
            {/* <a href="https://www.tripadvisor.com/Attractions-g293986-Activities-c56-Amman_Amman_Governorate.html" className="navbar-brand float-none">
                  <img
                    height="300px"
                    width="200px"
                    src={`${process.env.PUBLIC_URL}/Ads/ad1.gif`}
                    alt="Gamecity logo"
                  />
                </a> */}
            <div>
            </div>
      </Grid>
      </Grid>
      <hr />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGames: () => dispatch(setGames()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
