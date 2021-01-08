import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { setGame, removeGame } from "../../actions";
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  root: {
    height: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '../Images/chatRoom.jpg'})`,
  },
  paper: {
    margin: theme.spacing(6, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    
  },
}));

//This component dispatches two different actions, setGame and removeGame
//Pass in props as a parameter because we will be accessing the game id in the component from the params prop.
function GameInfo(props) {
  const classes = useStyles();
  //Call the react-redux useSelector hook to get the game object from the Redux store and assign it to the component's state.
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  
  //useEffect: The React useEffect hook essentially replaces the lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount). Use it when we need to rerender our component.
  //The useEffect hook takes a second argument called the dependency array that instructs React to rerun the effect only when the listed elements in the array change. React will post a warning in the console if you leave something out.
  useEffect(
    function () {
      axios
        .get(`/api/games/${props.match.params._id}`)
        .then(function (response) {
          dispatch(setGame(response.data));
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    [dispatch, props]
  );

  function handleDelete() {
    axios
      .delete(`/api/games/${game._id}`)
      .then(function () {
        dispatch(removeGame(game._id));
        props.history.push("/");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }

  //User Authentication
  var value = false;
  if (window.localStorage.email === game.email) {
    value = true;
  } else {
    value = false;
  }

  

  return (

    <div component="main" className={classes.root} justify= "center">
      
      <br/><br/><br/><br/>
     
      <Grid>
      <CssBaseline />
      
      {value === false ? (
        <div className= "container text-center" style = {{  width: "60%", background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
          
          <br/>
          
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "26px"}}>@{game.username}'s Post</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "32px", fontWeight: "bold", textDecoration: "underline"}}>{game.gameName}</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "22px"}}>Date: {game.gameDate}</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "22px"}}>Duration: {game.gameDuration}</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "22px"}}>Governorate: {game.gameGovernorate}</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "22px"}}>Type: {game.gameType}</p>
          
          <img 
            style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "12px"}}
            src = {game.selectedFile} alt= "Game"/>
          
          <br/><br/>
         
          <div className="btn-group">
            <Link 
              to="/" 
              variant="contained"
              className = "btn btn-light btn-block btn-lg"
              >
              Close
            </Link>
          </div>

          <hr />

        </div>
      ) : (
        <div className= "container text-center" style = {{  width: "60%", background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
         
          <br/>
         
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "26px"}}>@{game.username}'s Post</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "32px", fontWeight: "bold", textDecoration: "underline"}}>{game.gameName}</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "22px"}}>Date: {game.gameDate}</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "22px"}}>Duration: {game.gameDuration}</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "22px"}}>Governorate: {game.gameGovernorate}</p>
          <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "22px"}}>Type: {game.gameType}</p>
         
          <img 
            style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "12px"}}
            src = {game.selectedFile} alt= "Game" width = "200"/>
         
          <br/><br/>

          <div className="btn-group text-center">
            <Link
              to={{ pathname: `/games/${game._id}/edit` }}
              variant="contained"
              className = "btn btn-light btn-block btn-lg"
              style = {{marginRight: "15px"}}
            >
              Edit
            </Link>
            <button
              to="/" 
              variant="contained"
              className = "btn btn-light btn-block btn-lg"
              style = {{marginRight: "15px"}}              
              onClick={handleDelete}
            >
              Delete
            </button>
            <Link 
              to="/" 
              variant="contained"
              className = "btn btn-light btn-block btn-lg"
              >
              Close
            </Link>
          </div>
          
          <hr />
        
        </div>
      )}
      </Grid>
    </div>
  );
}

export default GameInfo;

