import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Login from "../pages/register"

function GameList() {
  const [games, setGames] = useState([]);

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
             <Login />
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
     
            {/* <small>_id: {game._id}</small> <br></br> */}
            <h6>{game.content}</h6>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default GameList;
