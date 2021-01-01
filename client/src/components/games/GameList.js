import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { setGames } from "../../actions";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { likePost, joinPost } from "../../actions/index.js";

function GameList(props) {
  const [games, setGames] = useState([]);

  console.log("games", games);
  console.log("props.games.filteredItems", props.games.filteredItems);
  console.log(props, "props");
  const dispatch = useDispatch();
  useEffect(function () {
    async function getGames() {
      try {
        //we have to add the id
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
            {/* <Chat /> */}
            <br></br>
            <Filter />
          </MDBCol>
          <MDBCol md="6" style={{ marginTop: "20px" }}>
            {props.games.filteredItems.map((game) => {
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
                    <img
                      src={game.selectedFile}
                      width="250px"
                      alt="game post"
                    />
                    <br />
                    <button
                      onClick={() =>
                        dispatch(likePost(game), console.log(game._id, game))
                      }
                    >
                      Like {game.likeCount}
                    </button>
                    <button
                      onClick={() =>
                        dispatch(joinPost(game), console.log(game._id, game))
                      }
                    >
                      Join {game.joinCount}
                    </button>
                    <br /> <br />
                    <div className="form-group">
                      <input
                        type="text"
                        value={game.comment}
                        // onChange={handleChangeComment}
                        className="form-control"
                        placeholder="Type in your comment here..."
                      />
                      <button type="Submit">Comment</button>
                      <br />
                      <h6>{game.comment}</h6>
                    </div>
                  </MDBContainer>
                  <hr />
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

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGames: () => dispatch(setGames()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
