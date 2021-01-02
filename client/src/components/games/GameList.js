import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import axios from "axios";
import { patch } from "axios";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { likePost, unlikePost, joinPost, unjoinPost, setGames } from "../../actions/index.js"
// import Chat from '../pages/Chat';
// import { heart } from "@fortawesome/free-solid-svg-icons";

// import { copyFileSync } from "fs";

function GameList(props) {

  const [commentField, setComment] = useState({ comment: "", id: "", username: window.localStorage.username, joins: 0, likes: 0 });
  const [games, setGames] = useState([]);
  const dispatch = useDispatch();
  console.log(games, "games for the warning")
  function handleChangeComment(event) {
    setComment({ ...commentField, comment: event.target.value, id: event.target.name, username: window.localStorage.username });
  }


  function handleSubmitComment(event) {
    event.preventDefault();
    async function comment() {
      try {
        await patch(`/api/games/${commentField.id}/comment`, commentField);
        // console.log(commentField.id, "ID from the edit")
        props.history.push(`/games/${commentField.id}/comment`);
      } catch (error) {
        console.log(error);
      }
    }
    comment();
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

  // conditional rendering for notifications

  return (
    <div>
      <hr />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
            <br></br>
            <Filter />

            {/* Notifications part */}
            <hr></hr>

            <div>
              <h4>{window.localStorage.username}'s notifications </h4>
              {props.games.filteredItems.map((game) => {
                if (game.username === window.localStorage.username) {
                  return (
                    <div key={game._id}>
                      <MDBContainer>
                        <form>
                          <div className="form-group">
                            {game.comment.map((theComment, i) => {
                              return (
                                <div key={i}>
                                  <h6>
                                    @{theComment.username} commented: "
                                    {theComment.comment}" on "
                                    <Link to={`/games/${game._id}`}>
                                      {game.gameName}
                                    </Link>
                                    " post.
                                  </h6>
                                </div>
                              );
                            })}
                            {game.joinCount.map((joined, i) => {
                              return (
                                <div key={i}>
                                  <h6>@{joined.username} wants to join your next game.</h6>
                                  {console.log(game.gameName, "joinedddd")}
                                </div>
                              )
                            })}
                          </div>
                        </form>
                      </MDBContainer>
                    </div>
                  );
                } else {
                  console.log("no notifications for now")
                }
              }, null)}
            </div>
            {/* Notifications part done */}
          </MDBCol>
          <MDBCol md="6" style={{ marginTop: "20px" }}>
            {props.games.filteredItems.map((game) => {
              return (
                <div key={game._id}>
                  <h3>@{game.username}</h3>
                  <h4>
                    <Link to={`/games/${game._id}`}>{game.gameName}</Link>
                  </h4>
                  <h6>{game.createdAt}</h6>
                  {/* <h6>{game._id}</h6> */}
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
                    <img src={game.selectedFile} width="250px" alt="game post" />
                    <br />
                    {/* Toggle */}
                    {/* <div>
                     {game.likeCount.includes(game.username)
                     ?<button onClick={() => dispatch(unlikePost(game, commentField))}>
                      Unlike
                    </button>
                     : <button name={game._id} onClick={() => dispatch(likePost(game, commentField))}>
                     Like {game.likeCount.length}
                   </button>
                      }
                    </div> */}
                    {/* <i className = "material-icons">thumb_up</i> */}
                    <button onClick={() => dispatch(unlikePost(game, commentField))}>
                      Unlike
                    </button>
                    <button name={game._id} onClick={() => dispatch(likePost(game, commentField), console.log(game, commentField, "commentField, like"))}>
                      Like {game.likeCount.length}
                    </button>
                    <button name={game._id} onClick={() => dispatch(joinPost(game, commentField))}>
                      Join {game.joinCount.length}
                    </button>
                    <button name={game._id} onClick={() => dispatch(unjoinPost(game, commentField))}>
                      Unjoin
                    </button>
                    {/* <FontAwesomeIcon icon={heart} /> */}

                    {game.joinCount.map((joined, i) => {
                      return (
                        <div key={i}>
                          <h6>joined: @{joined.username}</h6>
                        </div>
                      )
                    })}

                    <br/> <br />
                    <form>
                      <div className="form-group">
                        <input
                          name={game._id}
                          type="text"
                          value={commentField.comment.name}
                          onChange={handleChangeComment}
                          className="form-control"
                          placeholder="Type in your comment here..."
                        />
                        <button onClick={handleSubmitComment}>Comment</button>
                        <br /> <br />
                        {game.comment.map((theComment, i) => {
                          return (
                            <div key={i}>
                              {/* {console.log(theComment)} */}
                              <h6>@{theComment.username}: {theComment.comment}</h6>
                            </div>
                          )
                        })}
                      </div>
                    </form>
                  </MDBContainer>
                  <hr />
                </div>
              );
            })}
          </MDBCol>
          <MDBCol md="3">
            <br></br>
            <h2>
              <Link to="/games/new" className="btn btn-primary float-none">
                Build a team!
              </Link>
            </h2> 
            <br></br>
            <a href="https://www.tripadvisor.com/Attractions-g293986-Activities-c56-Amman_Amman_Governorate.html" className="navbar-brand float-none">
                  <img
                    height="300px"
                    width="200px"
                    src={`${process.env.PUBLIC_URL}/Ads/ad1.gif`}
                    alt="Gamecity logo"
                  />
                </a>
            <div>
            </div>
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
