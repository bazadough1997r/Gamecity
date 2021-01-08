import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { patch } from "axios";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { likePost, unlikePost, joinPost, unjoinPost } from "../../actions/index.js"

export default function Profilegames() {

  const [commentField, setComment] = useState({ comment: "", id: "", username: window.localStorage.username, joins: 0, likes: 0 });
  const [games, setGames] = useState([]);
  const dispatch = useDispatch();
  function handleChangeComment(event) {
    setComment({ ...commentField, comment: event.target.value, id: event.target.name, username: window.localStorage.username });
  }


function handleSubmitComment(event) {
    event.preventDefault();
    async function comment() {
      try {
        await patch(`/api/games/${commentField.id}/comment`, commentField);
        // console.log(commentField.id, "ID from the edit")
        games.history.push(`/games/${commentField.id}/comment`);
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
      <MDBContainer>
        <MDBRow>

          <MDBCol>
            {games.map((game) => {
                if (game.username === window.localStorage.username) {
              return (

                <div key={game._id}>

                  <p style = {{color: "#fff ", fontSize: "24px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                    <Link to={`/games/${game._id}`}>{game.gameName}</Link>
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

                    {/* <button 
                      name={game._id} 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      style = {{marginRight: "5px", marginLeft:"15px"}} 
                      onClick={() => dispatch(likePost(game, commentField), console.log(game, commentField, "commentField, like"))}
                    >
                      Like | {game.likeCount.length}
                    </button> */}

                    {/* <button 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      style = {{marginRight: "5px"}}  
                      onClick={() => dispatch(unlikePost(game, commentField))}
                    >
                      Unlike
                    </button> */}

                    <button 
                      name={game._id} 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      onClick={() => dispatch(joinPost(game, commentField))}
                    >
                      Join | {game.joinCount.length}
                    </button>

                    <button 
                      name={game._id} 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      onClick={() => dispatch(unjoinPost(game, commentField))}
                    >
                      Unjoin
                    </button>

                    </MDBRow>

                    {game.joinCount.map((joined, i) => {
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
                          )
                        })}

                  {/* <hr color = "white" /> */}
                </div>
              );
            } else {
                  console.log("you didn't post anything yet")
                }
                return null;
            })}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr />
    </div>
  );
}
