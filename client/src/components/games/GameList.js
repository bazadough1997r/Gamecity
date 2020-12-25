import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { post } from "axios";
import { Link } from "react-router-dom";
// import Register from "../pages/register"
// import Login from "../pages/login"
import LikeButton from "../likeButton.js";
// import { DELETE, LIKE } from '../../actions/index.js';
// import e from "cors";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import { Nav } from "react-bootstrap";
// import { Form } from "react-bootstrap";

export default function GameList(props) {
  const [games, setGames] = useState([]);
  // const [governerates, setGovernerates] = useState([]);

  const [game, setFields] = useState({ like: 0, comment: "" });
  const dispatch = useDispatch();

  function handleChangeComment(event) {
    setFields({ ...game, comment: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    post("/api/games", {
      like: game.like,
      comment: game.comment,
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
  };

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

  return (
    <div>
      <hr />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
            {/* <div className="control" style={{ minWidth: "300px" }}>
              <input
                onChange={(e) => {this.filterByInput(e)}}
                style={{ width: "100%" }}
                placeholder="Filter by"
                type="text"
              />
            </div> */}
            {/* <Form.Group
              controlId="exampleForm.SelectCustomSizeSm"
              onChange={onChangeGovernerates}
            >
              <Form.Control
                as="select"
                size="sm"
                custom
                style={{
                  width: 155,
                  color: "white",
                  border: "orange",
                  margin: "50px 0px 10px 250px",
                  background: "#212121",
                }}
              >
                <option value="">Select by type</option>
                <option value="Amman">Amman</option>
                <option value="Jerash">Jerash</option>
              </Form.Control>
            </Form.Group> */}
            {/* <Nav fill variant="tabs" defaultActiveKey="/" style={{ marginTop: "20px" }}>
              <Nav.Item>
                <Nav.Link href="/">Amman</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/">Irbid</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/">Ajloun</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/">Jerash</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/">Mafraq</Nav.Link>
              </Nav.Item>
            </Nav> */}
            {/* <div style={{ marginTop: "20px" }}>
              <h6>
                Governorates
                <nav className="navbar navbar-light bg-light">
                  <form className="form-inline">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Irbid
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Ajloun
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Jerash
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Mafraq
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Balqa
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Amman
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Zarqa
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Madaba
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Karak
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Tafilah
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Ma'an
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Aqaba
                    </button>
                  </form>
                </nav>
              </h6>

              <h6>
                Games
                <nav className="navbar navbar-light bg-light">
                  <form className="form-inline">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Paintball
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Football
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Karting
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Basketball
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Laser Tag
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Volleyball
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Rock Climbing
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Horseback Riding
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Handball
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Tennis
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Running
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      Others..
                    </button>
                  </form>
                </nav>
              </h6>
            </div> */}
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
                    <img src={game.selectedFile} width="250px" alt="post pic" />
                    <br />
                    <form onSubmit={handleSubmit}>
                      {/* <button onClick={setFields({...game, like: game.like++})}>Likes: {game.like}</button> */}
                      <LikeButton />
                      <br />
                      <div className="form-group">
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
                      </div>
                    </form>
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
    </div>
  );
}
