import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function GameList({ isLoggedIn }) {
  console.log(isLoggedIn, "isLoggedIn");

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
      <div style={{marginTop: "20px"}}>
        <h6>
          Governorates
          <nav class="navbar navbar-light bg-light">
            <form class="form-inline">
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Irbid
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Ajloun
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Jerash
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Mafraq
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Balqa
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Amman
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Zarqa
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Madaba
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Karak
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Tafilah
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Ma'an
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
                Aqaba
              </button>
            </form>
          </nav>
        </h6>

        <h6>
          Games
          <nav class="navbar navbar-light bg-light">
            <form class="form-inline">
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Paintball
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Football
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Karting
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Basketball
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Laser Tag
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Volleyball
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Rock Climbing
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Horseback Riding
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Handball
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Tennis
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Running
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button">
              Other..
              </button>
            </form>
          </nav>
        </h6>
      </div>

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
