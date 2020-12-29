import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { post } from "axios";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {likePost, joinPost} from "../../actions/index.js"


function GameList(props) {
  const [commentField, setFields] = useState({comment : ""});
  const [games, setGames] = useState([]);

  // console.log(games);
  const dispatch = useDispatch();

  function handleChangeComment(event) {
    setFields({ ...commentField, comment: event.target.value });
    console.log(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    post("/api/games", {
      comment: commentField.comment
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
      <hr />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
          </MDBCol>
          <MDBCol md="6" style={{ marginTop: "20px" }}>
            {/* {console.log(games)} */}
            {games.map((game) => {
              // console.log(game._id)
              return (
                <div key={game._id}>
                    {/* {console.log(game.gameType)} */}
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
                    <button onClick = {() => dispatch(likePost(game), console.log(game._id, game))}>
                      Like {game.likeCount}
                    </button>
                    <button onClick = {() => dispatch(joinPost(game), console.log(game._id, game))}>
                      Join {game.joinCount}
                    </button>
                      <br /> <br />
                      <div className="form-group">
                        <input
                          type="text"
                          value={commentField.comment}
                          onChange={handleChangeComment}
                          className="form-control"
                          placeholder="Type in your comment here..."
                        />
                        <button type="Submit" onClick = {handleSubmit}>Comment</button>
                        <br />
                        <h6>{commentField.comment}</h6>
                      </div>
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
  
export default GameList;
