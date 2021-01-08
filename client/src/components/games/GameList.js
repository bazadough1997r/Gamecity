import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { patch } from "axios";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { likePost, unlikePost, joinPost, unjoinPost } from "../../actions/index.js"
import Notifications from "./Notifications";

export default function GameList() {

  const [commentField, setComment] = useState({ comment: "", id: "", username: window.localStorage.username, joins: 0, likes: 0 });
  const [games, setGames] = useState([]);
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

  //Filter by governorate
  function handleChangeGovernorates(e) {
  var x  = games.filter(game => game.gameGovernorate === e.target.value)
  games.map(game => console.log(x, "filtered by Gov"))
}

  //Filter by game
  function handleChangeGames(e) {
    var x  = games.filter(game => game.gameType === e.target.value)
    games.map(game => console.log(x, "filtered by Game"))
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
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3" style = {{ marginLeft: "-75px"}}>
         
          <br></br>
             
              <p style = {{ fontSize: "18px", fontWeight: "bold", color: "#070d13" }}>
                Governorates: 
              </p>

              <select onChange={handleChangeGovernorates}>
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

              <div>
              <p style = {{ fontSize: "18px", fontWeight: "bold", color: "#070d13" }}>
                Games:
              </p>

              <select onChange={handleChangeGames}>
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

              <Notifications/>

            </MDBCol>
            <div>
      <MDBContainer>
        <MDBRow>

          <MDBCol size = "8" style = {{marginLeft: "150px"}}>
            {games.map((game) => {
              return (
                // <div>
                <div key={game._id} className= "container p-3 border" style = {{marginTop: "20px", borderRadius: "2rem"}}>
                  <p style = {{color: "#192a3a", opacity: "80%", fontSize: "18px", fontFamily: "Century Gothic"}}>
                    @{game.username}
                  </p>
                  <p style = {{fontSize: "24px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                    <Link to={`/games/${game._id}`} style = {{ color: "#192a3a"}}>{game.gameName}</Link>
                  </p>
                  
                  <p style = {{color: "#b9b9b9", fontSize: "14px", fontFamily: "Century Gothic"}}>
                    {game.createdAt}
                  </p>
                  
                  {/* <MDBContainer> */}
                    <MDBRow>
                      <MDBCol>
                      <img src={game.selectedFile} width="40%" alt="Game Post" style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}/>
                      </MDBCol>
                      <MDBCol>
                        <br/>
                      <MDBRow>

                        <span style = {{color: "#b9b9b9", fontSize: "12px", fontFamily: "Century Gothic", marginLeft: "-110px"}} key={game.gameGovernorate}>
                          Governorate:
                          <span style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold", marginRight: "20px"}}>
                            Jordan/{game.gameGovernorate}
                          </span>
                        </span>

                        <span style = {{color: "#b9b9b9", fontSize: "12px", fontFamily: "Century Gothic",}}>
                          Date: 
                          <span style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold", }}>
                            {game.gameDate}
                          </span>
                        </span>

                      {/* </MDBCol> */}
                      </MDBRow>
                      <MDBRow>
                      {/* <MDBCol> */}

                        <span style = {{ color: "#b9b9b9", fontSize: "12px", fontFamily: "Century Gothic", marginLeft: "-110px", marginTop: "5px"}}>Game: 
                          <span style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                           {game.gameType}
                          </span>
                        </span>

                        <span style = {{ color: "#b9b9b9", fontSize: "12px", fontFamily: "Century Gothic", marginLeft: "110px", marginTop: "5px"}}>
                          Duration: 
                          <span style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                            {game.gameDuration}
                          </span>
                        </span>
                        
                      </MDBRow>
                      </MDBCol>
                    </MDBRow>

                    <br />

                    <MDBRow>

                    <a href="/">
                    <button 
                      name={game._id} 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      style = {{marginRight: "5px", marginLeft:"15px"}} 
                      onClick={() => dispatch(likePost(game, commentField), console.log(game, commentField, "commentField, like"))}
                    >
                      Like | {game.likeCount.length}
                    </button>
                    </a>

                    <a href="/">
                    <button 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      style = {{marginRight: "5px"}}  
                      onClick={() => dispatch(unlikePost(game, commentField))}
                    >
                      Unlike
                    </button>
                    </a>

                    <a href="/">
                    <button 
                      name={game._id} 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      onClick={() => dispatch(joinPost(game, commentField))}
                    >
                      Join | {game.joinCount.length}
                    </button>
                    </a>

                    <a href="/">
                    <button 
                      name={game._id} 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      onClick={() => dispatch(unjoinPost(game, commentField))}
                    >
                      Unjoin
                    </button>
                    </a>
                      
                    <button
                      name={game._id} 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                    >
                      <Link 
                        to={{pathname: `/chat/${game._id}`, state: { postId: game._id}}}         
                        style = {{color: "black"}}
                      >
                        Join Room
                      </Link>
                    </button>

                    </MDBRow>

                    {game.joinCount.map((joined, i) => {
                      // console.log(joined,"joined")
                      return (

                        <div key={i}>
                          <p style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic"}}>
                            Player: @{joined.username}
                          </p>
                        </div>

                      )}                  
                      )}
                      
                    {/* <form> */}
                        <input
                          name={game._id}
                          id="inputGroup-sizing-sm"
                          type="text"
                          value={commentField.comment.name}
                          onChange={handleChangeComment}
                          className="input-sm"
                          style = {{ width: "70%", height: "30px"}}
                          placeholder="Type in your comment here..."
                        />

                        <button 
                          variant="contained"
                          className = "btn btn-light btn-sm"
                          onClick={handleSubmitComment}>Comment</button>

                        {game.comment.map((theComment, i) => {
                          return (

                            <div key={i}>
                              {/* {console.log(theComment)} */}
                              <p style = {{color: "#b9b9b9", fontSize: "14px", fontFamily: "Century Gothic", marginTop: "5px"}}>
                                @{theComment.username}: 
                                <span style = {{color: "#fff ", fontSize: "16px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                                  {theComment.comment}
                                </span>
                              </p>

                              <hr color= "white"></hr>

                            </div>
                          );
                        })}

                  {/* <hr color = "white" /> */}
                </div>
                // </div>
              );
            
            })}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr />
    </div>
{/* 
            
            <MDBCol md="6" style={{ marginTop: "20px" }}>
              {games.map((game) => {
                return (
                  <div className= "container" style = {{background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
                  <div key={game._id}>
                    <br/>
                    <p style = {{color: "#fff", fontSize: "18px", fontFamily: "Century Gothic"}}>
                      @{game.username}
                    </p>
                   
                    <p style = {{color: "#fff ", fontSize: "24px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                      <Link to={`/games/${game._id}`}>{game.gameName}</Link>
                    </p>
                    
                    <p style = {{color: "#b9b9b9", fontSize: "14px", fontFamily: "Century Gothic"}}>
                      {game.createdAt}
                    </p> */}
                    
                    {/* <MDBContainer>
                      <MDBRow>
                        <MDBCol size="4">

                          <span style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                            Jordan/{game.gameGovernorate}
                          </span>

                          <span>Game: 
                            <span>{game.gameType}</span>
                          </span>
                          
                        </MDBCol>

                        <MDBCol size="4">

                          <span>Date: 
                            <span>{game.gameDate}</span>
                          </span>

                          <span>Duration: 
                            <span>{game.gameDuration}</span>
                          </span>

                        </MDBCol>
                      </MDBRow>

                      <img src={game.selectedFile} width="250px" alt="game post" />
                     
                      <br />

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

                      <Link 
                        to={{pathname: `/chat/${game._id}`, state: { postId: game._id}}}         
                      >
                        Join Room
                      </Link>
              

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
                                <h6>@{theComment.username}: {theComment.comment}</h6>
                              </div>

                            )
                          })}

                        </div>
                      </form>
                    </MDBContainer>
                    <hr />
                  </div>
                  </div>
                  
                );
              })}

            </MDBCol> */}
            <MDBCol md="3">

              <br></br>

              <h2>
                <Link to="/games/new" className="btn btn-primary float-none">
                  Build a team!
                </Link>
              </h2> 
              <br></br>
              <a href="https://www.tripadvisor.com/Attractions-g293986-Activities-c56-Amman_Amman_Governorate.html" 
                className="navbar-brand float-none">
                
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

