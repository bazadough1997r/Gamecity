import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { post } from "axios";
import { Link } from "react-router-dom";
import Register from "../pages/register"
import Login from "../pages/login"
import LikeButton from "../likeButton.js"
import { DELETE, LIKE } from '../../actions/index.js';
import e from "cors";

function GameList(props) {
  const [games, setGames] = useState([]);

  const [game, setFields] = useState({ like: 0, comment: ""});
  const dispatch = useDispatch();
  
  function handleChangeComment(event) {
    setFields({...game, comment : event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    post("/api/games", {
      like: game.like,
      comment: game.comment

    })
      .then(function (response) {
        dispatch(GameList(response.data));
      })
      .then(function () {
        props.history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
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







  return (
    <div>

      <h2>
        Games
        <Link to="/games/new" className="btn btn-primary float-right">
          Build a team!
        </Link>
      </h2>
      <hr />
      {games.map((game) => {
        return (
          <div key={game._id}>
            <h4>
              <Link to={`/games/${game._id}`}>{game.gameName}</Link>
            </h4>
            <h6>{game.gameGovernorate}</h6>
            <h6>{game.gameType}</h6>
            <h6>{game.gameDate}</h6>
            <h6>{game.gameDuration}</h6>
            <img src = {game.selectedFile} width = "250px"/>
            <br/>
            <form onSubmit={handleSubmit}>
            <button onClick={setFields({...game, like: game.like++})}>Likes: {game.like}</button>
            {/* <LikeButton /> */}
            <br/>
            <div className="form-group">
            <input
              type="text"
              value={game.comment}
              onChange={handleChangeComment}
              className="form-control"
              placeholder="Type in your comment here..."
            />
            <button type= "Submit">Comment</button>
            <h6>{game.comment}</h6>
          </div>
          </form>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default GameList;
