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
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";





export default function GameList(props) {
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
        console.log(error, "error from  useEffect in GameList");
      }
    }
    getGames();
  }, []);







  return (
    <div>
      <hr />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
            {/* <div style={{ marginTop: "20px" }}>
              <h6>
                Governorates
                <nav className="navbar navbar-light bg-light">
                  <form className="form-inline">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Irbid
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Ajloun
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Jerash
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Mafraq
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Balqa
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Amman
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Zarqa
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Madaba
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Karak
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Tafilah
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Ma'an
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Aqaba
                    </button>
                  </form>
                </nav>
              </h6>

              <h6>
                Games
                <nav className="navbar navbar-light bg-light">
                  <form className="form-inline">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Paintball
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Football
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Karting
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Basketball
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Laser Tag
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Volleyball
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Rock Climbing
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Horseback Riding
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Handball
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Tennis
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Running
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Others..
                    </button>
                  </form>
                </nav>
              </h6>
            </div> */}
          </MDBCol>
          <MDBCol md="6">
            {games.map((game) => {
              return (
                <div key={game._id}>
                  <h4>
                    <Link to={`/games/${game._id}`}>{game.gameName}</Link>
                  </h4>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol size="4">
                        <h6>Jordan/{game.gameGovernorate}</h6>
                        <h6>Game: {game.gameType}</h6>
                      </MDBCol>
                      <MDBCol size="4">
                        <h6>Date: {game.gameDate}</h6>
                        <h6>Duration: {game.gameDuration}</h6>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </div>
              );
            })}
          </MDBCol>
          <MDBCol md="3">
            <h2 style={{ marginTop: "20px" }}>
              <Link to="/games/new" className="btn btn-primary float-right">
                Build a team!
              </Link>
            </h2>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
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
            {/* <button onClick={setFields({...game, like: game.like++})}>Likes: {game.like}</button> */}
            <LikeButton />
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
            <br/>
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
