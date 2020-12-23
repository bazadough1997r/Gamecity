import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import Filters from "../pages/Filters"

function GameList({ isLoggedIn }) {
  console.log(isLoggedIn, "isLoggedIn");

  const [games, setGames] = useState([]);

  useEffect(function () {
    async function getGames() {
      try {
        const response = await axios.get("/api/games");
        setGames(response.data);
      } catch (error) {
        console.log(error, "error from  useEffect in GameList");
      }
    }
    getGames();
  }, []);

  return (
    <div>
      {/* <Filters/> */}
      <h2 style={{ marginTop: "20px" }}>
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
            <hr />
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.isLoggedIn,
});

export default connect(mapStateToProps)(GameList);
