import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {likePost} from "../../actions/index.js"


function GameList(props) {

  const [games, setGames] = useState([]);

  // console.log(games);
  const dispatch = useDispatch();

  useEffect(function () {
    async function getGames() {
      try {
        //we have to add the id
        const response = await axios.get("/api/games");
        // console.log(games, "useEffect")
        setGames(response.data);
        // console.log(games, 'gamessss')
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
  
export default GameList;
