import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { patch } from "axios";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {
  // likePost,
  // unlikePost,
  joinPost,
  unjoinPost,
} from "../../actions/index.js";
import Notifications from "./Notifications";
import FooterPage from "../pages/Footer";

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
    <div style={{ background: "#03090e" }}>
      <div style = {{display: "flex"}}>
      <MDBContainer>
        <MDBRow>


                  <MDBCol 
                    md = "2" style={{ marginTop: "40px", right: "100px"}}
                  >
                    <a
                      href="https://www.tripadvisor.com/Attractions-g293986-Activities-c56-Amman_Amman_Governorate.html"
                      className="navbar-brand float-none"
                      >
                      <img
                        height="400px"
                        width="275px"
                        src={`${process.env.PUBLIC_URL}/Ads/ad1.gif`}
                        alt="Gamecity logo"
                        />
                    </a>
                    <br/>
                    <a
                      href="https://www.facebook.com/AmmanFC/"
                      className="navbar-brand float-none"
                      >
                      <img
                        height="400px"
                        width="275px"
                        src={`${process.env.PUBLIC_URL}/Ads/football.jpg`}
                        alt="Gamecity logo"
                        />
                    </a>
                    <br/>
                    <a
                      href="https://www.facebook.com/SwishBasketballAcademyjo/"
                      className="navbar-brand float-none"
                      >
                      <img
                        height="400px"
                        width="275px"
                        src={`${process.env.PUBLIC_URL}/Ads/basketball.jpg`}
                        alt="Gamecity logo"
                        />
                    </a>
                    <br/>
                    <a
                      href="https://www.powerade.com/"
                      className="navbar-brand float-none"
                      >
                      <img
                        height="400px"
                        width="275px"
                        src={`${process.env.PUBLIC_URL}/Ads/soccer.jpg`}
                        alt="Gamecity logo"
                        />
                    </a>
                    <br/>
                    <a
                      href="http://www.tajlifestyle.com/node/472"
                      className="navbar-brand float-none"
                      >
                      <img
                        height="400px"
                        width="275px"
                        src={`${process.env.PUBLIC_URL}/Ads/karting.jpg`}
                        alt="Gamecity logo"
                        />
                    </a>
                    <br/>
                    <a
                      href="https://www.thisisamman.com/en/1129"
                      className="navbar-brand float-none"
                      >
                      <img
                        height="400px"
                        width="275px"
                        src={`${process.env.PUBLIC_URL}/Ads/tennis.jpg`}
                        alt="Gamecity logo"
                        />
                    </a>                  </MDBCol>
          
          <MDBCol md = "10" style={{ marginTop: "20px"}}>
            <Link
              to="/games/new"
              className="btn btn-white btn-block"
              style={{ borderRadius: "2rem", width: "100%" }}
            >
              New Game
            </Link>
            
            <br></br>
            <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexGrow: 1 }}>
              <p style={{ fontSize: "18px", color: "#fff" }}>Governorates:</p>
              <div>
                <select onChange={mappedFiltered}>
                  <option value="">All</option>
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
            </div>

            <div style={{ display: "flex" }}>
              <p style={{ fontSize: "18px", color: "#fff" }}>Games:</p>

              <div>
                <select onChange={mappedFiltered}>
                  <option value="">All</option>
                  <option value="Paintball">Paintball</option>
                  <option value="Football">Football</option>
                  <option value="Karting">Karting</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Laser Tag">Laser Tag</option>
                  <option value="Vollyball">Vollyball</option>
                  <option value="Rock Climbing">Rock Climbing</option>
                  <option value="Horseback Riding">Horseback Riding</option>
                  <option value="Handball">Handball</option>
                  <option value="Tafila">Tennis</option>
                  <option value="Running">Running</option>
                  <option value="Other..">Other..</option>
                </select>
              </div>
              </div>
            </div>


          <div>
            {value === false ? (
            <div>
            {games.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
            .map((game) => {
              return (
                <div
                  className="container p-2 border"
                  style={{
                    marginTop: "20px",
                    borderRadius: "2rem",
                    background: "#fff",
                    width: "100%",
                    marginLeft: "-0.001px"
                  }}
                >
                  <div key={game._id}>
                    <br />
                    <p
                      style={{
                        marginLeft: "10px",
                        color: "#414f5e",
                        opacity: "80%",
                        fontSize: "16px",
                        fontFamily: "Century Gothic",
                      }}
                    >
                      @{game.username}
                    </p>

                    <p
                      style={{
                        marginLeft: "10px",
                        fontSize: "20px",
                        fontFamily: "Century Gothic",
                        fontWeight: "bold",
                      }}
                    >
                      <Link
                        to={`/games/${game._id}`}
                        style={{ color: "#192a3a" }}
                      >
                        {game.gameName}
                      </Link>
                    </p>

                    <p
                      style={{
                        marginLeft: "10px",
                        color: "#414f5e",
                        fontSize: "14px",
                        fontFamily: "Century Gothic",
                      }}
                    >
                      {game.createdAt}
                    </p>

                    <MDBContainer>
                      <MDBRow>
                        <MDBCol>
                          <img
                            src={game.selectedFile}
                            width="60%"
                            alt="game post"
                          />
                        </MDBCol>
                        <MDBCol>
                          <br />
                          <br />
                          <br />
                          <br />
                          <MDBRow>
                            <span
                              style={{
                                color: "#414f5e",
                                fontSize: "16px",
                                fontFamily: "Century Gothic",
                                marginLeft: "-100px",
                              }}
                              key={game.gameGovernorate}
                            >
                              Governorate:
                              <span
                                style={{
                                  color: "#192a3a ",
                                  fontSize: "16px",
                                  fontFamily: "Century Gothic",
                                  fontWeight: "bold",
                                  marginRight: "50px",
                                }}
                              >
                                Jordan/{game.gameGovernorate}
                              </span>
                            </span>

                            <span
                              style={{
                                color: "#414f5e",
                                fontSize: "16px",
                                fontFamily: "Century Gothic",
                              }}
                            >
                              Date:
                              <span
                                style={{
                                  color: "#192a3a ",
                                  fontSize: "16px",
                                  fontFamily: "Century Gothic",
                                  fontWeight: "bold",
                                }}
                              >
                                {game.gameDate}
                              </span>
                            </span>
                          </MDBRow>
                          <MDBRow>
                            <span
                              style={{
                                color: "#414f5e",
                                fontSize: "16px",
                                fontFamily: "Century Gothic",
                                marginLeft: "-100px",
                                marginTop: "10px",
                              }}
                            >
                              Game:
                              <span
                                style={{
                                  color: "#192a3a",
                                  fontSize: "16px",
                                  fontFamily: "Century Gothic",
                                  fontWeight: "bold",
                                  marginRight: "158px",
                                }}
                              >
                                {game.gameType}
                              </span>
                            </span>

                            <span
                              style={{
                                color: "#414f5e",
                                fontSize: "16px",
                                fontFamily: "Century Gothic",
                                marginTop: "10px",
                                marginLeft: "-25px"
                              }}
                            >
                              Duration:
                              <span
                                style={{
                                  color: "#192a3a ",
                                  fontSize: "16px",
                                  fontFamily: "Century Gothic",
                                  fontWeight: "bold",
                                }}
                              >
                                {game.gameDuration}
                              </span>
                            </span>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>

                      <br />
                      <div style={{ display: "flex" }}>
                        {/* {window.location.username !== game.likeCount ? ( */}
                        {/* <a href="/">
                          <button
                            variant="contained"
                            className="btn btn-light "
                            onClick={() =>
                              dispatch(unlikePost(game, commentField))
                            }
                          >
                            Unlike
                          </button>
                        </a> */}
                        {/* // ) : ( */}
                        {/* <a href="/">
                          <button
                            name={game._id}
                            variant="contained"
                            className="btn btn-light "
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
                        </a> */}
                        {/* )} */}
                        <a href="/">
                          <button
                            name={game._id}
                            variant="contained"
                            className="btn btn-light "
                            onClick={() =>
                              dispatch(joinPost(game, commentField))
                            }
                          >
                            Join {game.joinCount.length}
                            {/* {console.log(game.joinCount[0].username)} */}
                          </button>
                        </a>

                        <a href="/">
                          <button
                            name={game._id}
                            variant="contained"
                            className="btn btn-light "
                            onClick={() =>
                              dispatch(unjoinPost(game, commentField))
                            }
                          >
                            Unjoin
                          </button>
                        </a>

                        <button
                          name={game._id}
                          variant="contained"
                          className="btn btn-light "
                        >
                          <Link
                            to={{
                              pathname: `/chat/${game._id}`,
                              state: { postId: game._id },
                            }}
                            style={{ color: "black" }}
                          >
                            Join Room
                          </Link>
                        </button>
                      </div>

                      {game.joinCount.map((joined, i) => {
                        return (
                          <div key={i}>
                            <h6>joined: @{joined.username}</h6>
                          </div>
                        );
                      })}

                      <br />

                      <form>
                        <div className="form-group" style={{ display: "flex" }}>
                          <input
                            name={game._id}
                            id="inputGroup-sizing-sm"
                            type="text"
                            value={commentField.comment.name}
                            onChange={handleChangeComment}
                            className="input-sm"
                            style={{ width: "70%" }}
                            placeholder="Type in your comment here..."
                          />

                          <button
                            variant="contained"
                            className="btn btn-light"
                            onClick={handleSubmitComment}
                          >
                            Comment
                          </button>
                        </div>
                        <hr />

                        {game.comment.map((theComment, i) => {
                          return (
                            <div key={i}>
                              <p
                                style={{
                                  color: "#414f5e",
                                  fontSize: "12px",
                                  fontFamily: "Century Gothic",
                                }}
                              >
                                @{theComment.username}:
                                <span
                                  style={{
                                    color: "#192a3a ",
                                    fontSize: "14px",
                                    fontFamily: "Century Gothic",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {theComment.comment}
                                </span>
                              </p>

                              <hr />
                            </div>
                          );
                        })}
                      </form>
                    </MDBContainer>
                    <hr />
                  </div>
                </div>
              );
            })}
          </div>
            ):(
              filtered.map((game) => {
                console.log(game, "GAMEE");
                return (
                      <div
                        className="container p-2 border"
                        style={{
                          marginTop: "20px",
                          borderRadius: "2rem",
                          background: "#fff",
                          width: "70%",
                          marginLeft: "-0.001px"
                        }}
                      >
                        <div key={game._id}>
                          <br />
                          <p
                            style={{
                              marginLeft: "10px",
                              color: "#414f5e",
                              opacity: "80%",
                              fontSize: "16px",
                              fontFamily: "Century Gothic",
                            }}
                          >
                            @{game.username}
                          </p>
      
                          <p
                            style={{
                              marginLeft: "10px",
                              fontSize: "20px",
                              fontFamily: "Century Gothic",
                              fontWeight: "bold",
                            }}
                          >
                            <Link
                              to={`/games/${game._id}`}
                              style={{ color: "#192a3a" }}
                            >
                              {game.gameName}
                            </Link>
                          </p>
      
                          <p
                            style={{
                              marginLeft: "10px",
                              color: "#414f5e",
                              fontSize: "14px",
                              fontFamily: "Century Gothic",
                            }}
                          >
                            {game.createdAt}
                          </p>
      
                          <MDBContainer>
                            <MDBRow>
                              <MDBCol>
                                <img
                                  src={game.selectedFile}
                                  width="60%"
                                  alt="game post"
                                />
                              </MDBCol>
                              <MDBCol>
                                <br />
                                <br />
                                <br />
                                <br />
                                <MDBRow>
                                  <span
                                    style={{
                                      color: "#414f5e",
                                      fontSize: "16px",
                                      fontFamily: "Century Gothic",
                                      marginLeft: "-100px",
                                    }}
                                    key={game.gameGovernorate}
                                  >
                                    Governorate:
                                    <span
                                      style={{
                                        color: "#192a3a ",
                                        fontSize: "16px",
                                        fontFamily: "Century Gothic",
                                        fontWeight: "bold",
                                        marginRight: "50px",
                                      }}
                                    >
                                      Jordan/{game.gameGovernorate}
                                    </span>
                                  </span>
      
                                  <span
                                    style={{
                                      color: "#414f5e",
                                      fontSize: "16px",
                                      fontFamily: "Century Gothic",
                                    }}
                                  >
                                    Date:
                                    <span
                                      style={{
                                        color: "#192a3a ",
                                        fontSize: "16px",
                                        fontFamily: "Century Gothic",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {game.gameDate}
                                    </span>
                                  </span>
                                </MDBRow>
                                <MDBRow>
                                  <span
                                    style={{
                                      color: "#414f5e",
                                      fontSize: "16px",
                                      fontFamily: "Century Gothic",
                                      marginLeft: "-100px",
                                      marginTop: "10px",
                                    }}
                                  >
                                    Game:
                                    <span
                                      style={{
                                        color: "#192a3a ",
                                        fontSize: "16px",
                                        fontFamily: "Century Gothic",
                                        fontWeight: "bold",
                                        marginRight: "158px",
                                      }}
                                    >
                                      {game.gameType}
                                    </span>
                                  </span>
      
                                  <span
                                    style={{
                                      color: "#414f5e",
                                      fontSize: "16px",
                                      fontFamily: "Century Gothic",
                                      marginTop: "10px",
                                      marginLeft: "-25px"
                                    }}
                                  >
                                    Duration:
                                    <span
                                      style={{
                                        color: "#192a3a ",
                                        fontSize: "16px",
                                        fontFamily: "Century Gothic",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {game.gameDuration}
                                    </span>
                                  </span>
                                </MDBRow>
                              </MDBCol>
                            </MDBRow>
      
                            <br />
                            <div style={{ display: "flex" }}>
                              {/* {window.location.username !== game.likeCount ? ( */}
                              {/* <a href="/">
                                <button
                                  variant="contained"
                                  className="btn btn-light "
                                  onClick={() =>
                                    dispatch(unlikePost(game, commentField))
                                  }
                                >
                                  Unlike
                                </button>
                              </a> */}
                              {/* // ) : ( */}
                              {/* <a href="/">
                                <button
                                  name={game._id}
                                  variant="contained"
                                  className="btn btn-light "
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
                              </a> */}
                              {/* )} */}
                              <a href="/">
                                <button
                                  name={game._id}
                                  variant="contained"
                                  className="btn btn-light "
                                  onClick={() =>
                                    dispatch(joinPost(game, commentField))
                                  }
                                >
                                  Join {game.joinCount.length}
                                  {/* {console.log(game.joinCount[0].username)} */}
                                </button>
                              </a>
      
                              <a href="/">
                                <button
                                  name={game._id}
                                  variant="contained"
                                  className="btn btn-light "
                                  onClick={() =>
                                    dispatch(unjoinPost(game, commentField))
                                  }
                                >
                                  Unjoin
                                </button>
                              </a>
      
                              <button
                                name={game._id}
                                variant="contained"
                                className="btn btn-light "
                              >
                                <Link
                                  to={{
                                    pathname: `/chat/${game._id}`,
                                    state: { postId: game._id },
                                  }}
                                  style={{ color: "black" }}
                                >
                                  Join Room
                                </Link>
                              </button>
                            </div>
      
                            {game.joinCount.map((joined, i) => {
                              return (
                                <div key={i}>
                                  <h6>joined: @{joined.username}</h6>
                                </div>
                              );
                            })}
      
                            <br />
      
                            <form>
                              <div className="form-group" style={{ display: "flex" }}>
                                <input
                                  name={game._id}
                                  id="inputGroup-sizing-sm"
                                  type="text"
                                  value={commentField.comment.name}
                                  onChange={handleChangeComment}
                                  className="input-sm"
                                  style={{ width: "70%" }}
                                  placeholder="Type in your comment here..."
                                />
      
                                <button
                                  variant="contained"
                                  className="btn btn-light"
                                  onClick={handleSubmitComment}
                                >
                                  Comment
                                </button>
                              </div>
                              <hr />
      
                              {game.comment.map((theComment, i) => {
                                return (
                                  <div key={i}>
                                    <p
                                      style={{
                                        color: "#414f5e",
                                        fontSize: "12px",
                                        fontFamily: "Century Gothic",
                                      }}
                                    >
                                      @{theComment.username}:
                                      <span
                                        style={{
                                          color: "#192a3a ",
                                          fontSize: "14px",
                                          fontFamily: "Century Gothic",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {theComment.comment}
                                      </span>
                                    </p>
      
                                    <hr />
                                  </div>
                                );
                              })}
                            </form>
                          </MDBContainer>
                          <hr />
                        </div>
                      </div>
                )})
            )}
          
            </div>
          </MDBCol>

        </MDBRow>
      </MDBContainer>
      </div>
      <hr />
      <FooterPage />
    </div>
  );
}
