import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { post } from "axios";
import { Link } from "react-router-dom";
import Register from "../pages/register"
import Login from "../pages/login"
import LikeButton from "../likeButton.js"
import e from "cors";
import {likePost} from "../../actions/index.js"
import { patch } from "axios";

// import Register from "../pages/register"
// import Login from "../pages/login"
// import { DELETE, LIKE } from '../../actions/index.js';
// import e from "cors";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import { Nav } from "react-bootstrap";
// import { Form } from "react-bootstrap";

export default function GameList(props) {
  const initialState = { 
    likeCount: 0
  };
    
  const [game, setGame] = useState(initialState);

  const [games, setGames] = useState([]);
  // const [governerates, setGovernerates] = useState([]);

  // const [game, setFields] = useState({ like: 0, comment: "" });
  const dispatch = useDispatch();

  // function handleChangeComment(event) {
  //   setFields({ ...game, comment: event.target.value });
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   post("/api/games", {
  //     like: game.like,
  //     comment: game.comment,
  //   })
  //     .then(function (response) {
  //       dispatch(GameList(response.data));
  //     })
  //     .then(function () {
  //       props.history.push("/");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  useEffect(function () {
    async function getGames() {
      try {
        const response = await axios.get("/api/games");
        console.log(response.data)
        setGames(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getGames();
  }, []);


  // //filter function to filter games cities
  // function onChangeGovernerates(e) {
  // // //  setGovernerates(governerates) =>
  //    let string = e.target.value;
  //   let city = games.gameGovernorate;
  //   //) => games.gameGovernorate.includes(string));
  // //   setGovernerates({ governerates: governerates });
  //  return { games : setGames.games.filter ( city => city === string) }

  // }

  // function filterByInput(e) {
  //    console.log(e.target.value)
  // }

  function handleSubmit(event) {
    event.preventDefault();
    async function likePost() {
      try {
        await patch(`/api/games/${game._id}/likePost`, game);
        props.history.push(`/games/${game._id}/likePost`);
      } catch (error) {
        console.log(error);
      }
    }
    likePost();
  }

  return (
    <div>
      <hr />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
          </MDBCol>
          <MDBCol md="6" style={{ marginTop: "20px" }}>
            {games.map((game) => {
              return (
                <div key={game._id}>
                  <h4>
                    <Link to={`/games/${game._id}`}>{game.gameName}</Link>
                  </h4>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol size="4">
                        <h6 key={game.gameGovernorate}>
                          Jordan/{game.gameGovernorate}
                        </h6>
                        <h6>Game: {game.gameType}</h6>
                      </MDBCol>
                      <MDBCol size="4">
                        <h6>Date: {game.gameDate}</h6>
                        <h6>Duration: {game.gameDuration}</h6>
                      </MDBCol>
                    </MDBRow>
                    <img src={game.selectedFile} width="250px" />
                    <br />
                    {/* <form onSubmit={handleSubmit}> */}
                      <button onSubmit={handleSubmit}> Like {game.likeCount}</button>
                      {/* <h6>{game.like.length} like(s)</h6> */}

                      <br />
                      {/* <div className="form-group">
                        <input
                          type="text"
                          value={game.comment}
                          onChange={handleChangeComment}
                          className="form-control"
                          placeholder="Type in your comment here..."
                        />
                        <button type="Submit">Comment</button>
                        <br />
                        <h6>{game.comment}</h6>
                      </div> */}
                    {/* </form> */}
                  </MDBContainer>
                  <hr/>
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
    </div>
  );
}

