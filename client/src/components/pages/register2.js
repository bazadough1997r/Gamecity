import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { patch } from "axios";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {
  likePost,
  unlikePost,
  joinPost,
  unjoinPost,
} from "../../actions/index";
import Notifications from "./Notifications";
​
export default function GameList() {
  const [commentField, setComment] = useState({
    comment: "",
    id: "",
    username: window.localStorage.username,
    joins: 0,
    likes: 0,
  });
  const [value, setValue] = useState(false);
  const [games, setGames] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const dispatch = useDispatch();
  function handleChangeComment(event) {
    setComment({
      ...commentField,
      comment: event.target.value,
      id: event.target.name,
      username: window.localStorage.username,
    });
  }
​
  function handleSubmitComment(event) {
    event.preventDefault();
    async function comment() {
      try {
        await patch(`/api/games/${commentField.id}/comment`, commentField);
        games.history.push(`/games/${commentField.id}/comment`);
      } catch (error) {
        console.log(error);
      }
    }
    comment();
  }
​
  //filtersssss && connected
  var mappedFiltered = function filteration(e) {
    setValue(true);
    var selected = e.target.value;
    console.log(selected, "selectedddd");
    setFiltered(
      games.filter(
        (game) =>
          game.gameGovernorate === selected || game.gameType === selected
      )
    );
    if (selected === "") {
      setFiltered(games);
    }
    console.log(filtered, "filteredddd");
  };
​
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
​
  return (
    <div>
      <hr />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
            <br></br>
            <div>
              Governorates:
              <select onChange={mappedFiltered}>
                <option value="">ALL</option>
                <option value="Irbid">Irbid</option>
                <option value="Ajloun">Ajloun</option>
                <option value="Jerash">Jerash</option>
                <option value="Mafraq">Mafraq</option>
                <option value="Balqa">Balqa</option>
                <option value="Amman">Amman</option>
                <option value="Zarqa">Zarqa</option>
                <option value="Madaba">Madaba</option>
                <option value="Karak">Karak</option>
                <option value="Tafila">Tafila</option>
                <option value="Ma'an">Ma'an</option>
                <option value="Aqaba">Aqaba</option>
              </select>
            </div>
​
            <div>
              Games:
              <select onChange={mappedFiltered}>
                <option value="">ALL</option>
                <option value="Paintball">Paintball</option>
                <option value="Football">Football</option>
                <option value="Karting">Karting</option>
                <option value="Basketball">Basketball</option>
                <option value="Laser Tag">Laser Tag</option>
                <option value="Vollyball">Volleyball</option>
                <option value="Rock Climbing">Rock Climbing</option>
                <option value="Horseback Riding">Horseback Riding</option>
                <option value="Handball">Handball</option>
                <option value="Tafila">Tennis</option>
                <option value="Running">Running</option>
                <option value="Other..">Other..</option>
              </select>
            </div>
​
            <Notifications />
          </MDBCol>
          <div>
            {value === false ? (
              <div>
                <MDBCol md="6" style={{ marginTop: "20px" }}>
                  {games.map((game) => {
                    return (
                      <div key={game._id}>
                        <h3>@{game.username}</h3>
                        <h4>
                          <Link to={`/games/${game._id}`}>{game.gameName}</Link>
                        </h4>
                        <h6>{game.createdAt}</h6>
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
                          <a href="/">
                            <button
                              onClick={() =>
                                dispatch(unlikePost(game, commentField))
                              }
                            >
                              Unlike
                            </button>
                          </a>
                          <a href="/">
                            <button
                              name={game._id}
                              onClick={() =>
                                dispatch(
                                  likePost(game, commentField),
                                  console.log(
                                    game,
                                    commentField,
                                    "commentField, like"
                                  )
                                )
                              }
                            >
                              Like {game.likeCount.length}
                            </button>
                          </a>
                          <a href="/">
                            <button
                              name={game._id}
                              onClick={() =>
                                dispatch(joinPost(game, commentField))
                              }
                            >
                              Join {game.joinCount.length}
                            </button>
                          </a>
                          <a href="/">
                            <button
                              name={game._id}
                              onClick={() =>
                                dispatch(unjoinPost(game, commentField))
                              }
                            >
                              Unjoin
                            </button>
                          </a>
                          {game.joinCount.map((joined, i) => {
                            return (
                              <div key={i}>
                                <h6>joined: @{joined.username}</h6>
                              </div>
                            );
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
                              <button onClick={handleSubmitComment}>
                                Comment
                              </button>
                              <br /> <br />
                              {game.comment.map((theComment, i) => {
                                return (
                                  <div key={i}>
                                    <h6>
                                      @{theComment.username}:{" "}
                                      {theComment.comment}
                                    </h6>
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
              </div>
            ) : (
              filtered.map((game) => {
                console.log(game, "GAMEE");
                return (
                  <div key={game._id}>
                    <h3>@{game.username}</h3>
                    <h4>
                      <Link to={`/games/${game._id}`}>{game.gameName}</Link>
                    </h4>
                    <h6>{game.createdAt}</h6>
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
                        onClick={() => dispatch(unlikePost(game, commentField))}
                      >
                        Unlike
                      </button>
                      <button
                        name={game._id}
                        onClick={() =>
                          dispatch(
                            likePost(game, commentField),
                            console.log(
                              game,
                              commentField,
                              "commentField, like"
                            )
                          )
                        }
                      >
                        Like {game.likeCount.length}
                      </button>
                      <button
                        name={game._id}
                        onClick={() => dispatch(joinPost(game, commentField))}
                      >
                        Join {game.joinCount.length}
                      </button>
                      <button
                        name={game._id}
                        onClick={() => dispatch(unjoinPost(game, commentField))}
                      >
                        Unjoin
                      </button>
                      {game.joinCount.map((joined, i) => {
                        return (
                          <div key={i}>
                            <h6>joined: @{joined.username}</h6>
                          </div>
                        );
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
                                <h6>
                                  @{theComment.username}: {theComment.comment}
                                </h6>
                              </div>
                            );
                          })}
                        </div>
                      </form>
                    </MDBContainer>
                    <hr />
                  </div>
                );
              })
            )}
          </div>
​
          <MDBCol md="3">
            <br></br>
            <h2>
              <Link to="/games/new" className="btn btn-primary float-none">
                Build a team!
              </Link>
            </h2>
            <br></br>
            <a
              href="https://www.tripadvisor.com/Attractions-g293986-Activities-c56-Amman_Amman_Governorate.html"
              className="navbar-brand float-none"
            >
              <img
                height="300px"
                width="200px"
                src={`${process.env.PUBLIC_URL}/Ads/ad1.gif`}
                alt="Gamecity logo"
              />
            </a>
​
            <div></div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr />
    </div>
  );
}