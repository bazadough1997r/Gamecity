import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// import { post } from "axios";
import { Link } from "react-router-dom";
// import Register from "../pages/register"
// import Login from "../pages/login"
// import LikeButton from "../likeButton.js";
// import { DELETE, LIKE } from '../../actions/index.js';
// import e from "cors";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import { Nav } from "react-bootstrap";
// import { Form } from "react-bootstrap";
import {likePost} from "../../actions/index.js"


export default function GameList(props) {
  const [games, setGames] = useState([]);
  // const [governerates, setGovernerates] = useState([]);

  const [game, setFields] = useState({ like: 0, comment: "" });
  const dispatch = useDispatch();

  function handleChangeComment(event) {
    setFields({ ...game, comment: event.target.value });
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   async function likePost() {
  //     try {
  //       await patch(`/api/games/${game._id}/likePost`, game);
  //       props.history.push(`/games/${game._id}`);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   likePost();
  // }

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
          </MDBCol>
          <MDBCol md="6" style={{ marginTop: "20px" }}>
            {games.map((game) => {
              console.log(game._id)
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
                    <img src={game.selectedFile} width="250px" alt="game post"/>
                    <br />
                    <button onClick = {() => dispatch (likePost(game._id)) }>Like {game.likeCount}</button>
                      {/* <LikeButton /> */}
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