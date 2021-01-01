import React, { useState, useEffect } from "react";
// import {useRef} from 'react';
import { useDispatch } from "react-redux";
import axios from "axios";
import { patch } from "axios";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { setGames } from "../../actions";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { likePost, joinPost } from "../../actions/index.js";
// import   Chat  from '../pages/Chat';

function GameList(props) {
  const [commentField, setComment] = useState({
    comment: "",
    id: "",
    username: window.localStorage.username,
  });
  const [games, setGames] = useState([]);
  const dispatch = useDispatch();
  console.log(games, "games for the warning");
  // let btnRef = useRef();

  function handleChangeComment(event) {
    setComment({
      ...commentField,
      comment: event.target.value,
      id: event.target.name,
      username: window.localStorage.username,
    });
  }

  // const onBtnClick = e => {
  //   if(btnRef.current){
  //     btnRef.current.setAttribute("disabled", "disabled");
  //   }
  // }

  function handleSubmit(event) {
    event.preventDefault();
    async function comment() {
      try {
        await patch(`/api/games/${commentField.id}/comment`, commentField);
        console.log(commentField.id, "ID from the edit");
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
                          </div>
                        </form>
                      </MDBContainer>
                    </div>
                  );
                }
              })}
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
                    <button onClick={() => dispatch(likePost(game))}>
                      Like {game.likeCount}
                    </button>
                    {/* <button name ={game._id} onClick = {handleSubmitLike}>
                      Like {game.likeCount}
                    </button>                    */}
                    <button
                      onClick={() =>
                        dispatch(joinPost(game), console.log(game._id, game))
                      }
                    >
                      Join {game.joinCount}
                    </button>
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
                        <button onClick={handleSubmit}>Comment</button>
                        {/* {console.log(commentField,"commentField")} */}
                        <br /> <br />
                        {game.comment.map((theComment, i) => {
                          return (
                            <div key={i}>
                              {/* {console.log(game.comment,"theComment")} */}
                              {/* {console.log(theComment)} */}
                              <h6>Username: {theComment.username}</h6>
                              <h6>Comment: {theComment.comment}</h6>
                              <hr />
                            </div>
                          );
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
// const mapStateToProps = state => ({
//   games: state.games
// })
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
