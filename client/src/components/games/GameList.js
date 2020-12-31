import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import axios from "axios";
import { patch } from "axios";
import Filter from './Filter'
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { likePost, unlikePost, joinPost, unjoinPost, setGames } from "../../actions/index.js"
import Chat from '../pages/Chat';
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



  return (
    <div>
      <hr />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
            <Chat />
            <br></br>
            <Filter />
          </MDBCol>
          <MDBCol md="6" style={{ marginTop: "20px" }}>
            {/* {console.log(game)} */}
            {props.games.filteredItems.map((game) => {
              return (
                <div key={game._id}>
                  {/* {console.log(game.comment)} */}
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
                    <i className = "material-icons">thumb_up</i>
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
                          <h6>Player: {joined.username}</h6>
                        </div>
                      )
                    })}

                    <br /> <br />
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
                              <h6>Username: {theComment.username}</h6>
                              <h6>Comment: {theComment.comment}</h6>
                              <hr />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGames: () => dispatch(setGames()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameList);
                    // {/* {game.likeCount.includes(game.username)
                    // ? <button onClick = {() => dispatch(unlikePost(game))}>
                    //     Unlike
                    //   </button>
                    // : <button onClick = {() => dispatch(likePost(game))}>
                    //     Like {game.likeCount}
                    //   </button>
                    // } */}
                    // {/* <button onClick = {() => dispatch(likePost(game))}>
                    //     Like {game.likeCount[0].likeCount}
                    // </button> */}
