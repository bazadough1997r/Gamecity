import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Register from "../pages/register"
import Login from "../pages/login"
import LikeButton from "../likeButton.js"
import { DELETE, LIKE } from '../../actions/index.js';
import e from "cors";

function GameList() {
  const [games, setGames] = useState([]);
  // const [games, setComment] = useState({comment : "" })

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   // if (!game.gameName || !game.gameType || !game.gameDate || !game.gameDuration || !game.gameGovernorate) return;
  //   post("/api/games", {
  //     comment: game.comment
  //   })
  //     .then(function (response) {
  //       dispatch(addGame(response.data));
  //     })
  //     .then(function () {
  //       props.history.push("/");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

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




  // function handleChangeComment(event) {
  //   setComment({...games, comment : event.target.value})
  // }



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
            {/* <img>{game.selectedFile}</img> */}
            <LikeButton />
            <br/>
            <div className="form-group">
            <input
              type="text"
              // value={game.comment}
              // onChange={handleChangeComment}
              className="form-control"
              placeholder="Type in your comment here..."
            />
            <button>Comment</button>
          </div>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default GameList;
