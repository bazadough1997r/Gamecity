import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import axios from "axios";
import { patch } from "axios";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { likePost, unlikePost, joinPost, unjoinPost, setGames } from "../../actions/index.js"

// import { heart } from "@fortawesome/free-solid-svg-icons";

// import { copyFileSync } from "fs";

export default function Profilegames() {

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

                  <p style = {{color: "#fff ", fontSize: "32px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                    <Link to={`/games/${game._id}`}>{game.gameName}</Link>
                  </p>
                  
                  <p style = {{color: "#b9b9b9", fontSize: "14px", fontFamily: "Century Gothic"}}>
                    {game.createdAt}
                  </p>
                  
                  {/* <MDBContainer> */}
                    <MDBRow>

                      <MDBCol>
                        <span style = {{color: "#b9b9b9", fontSize: "12px", fontFamily: "Century Gothic"}} key={game.gameGovernorate}>
                          Governorate:
                          <span style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                            Jordan/{game.gameGovernorate}
                          </span>
                        </span>

                        <span style = {{ marginLeft: "50px", color: "#b9b9b9", fontSize: "12px", fontFamily: "Century Gothic"}}>Game: 
                          <span style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                            {game.gameType}
                          </span>
                        </span>
                      </MDBCol>

                      <MDBCol size="12">
                        <span style = {{color: "#b9b9b9", fontSize: "12px", fontFamily: "Century Gothic"}}>
                          Date: 
                          <span style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                            {game.gameDate}
                          </span>
                        </span>

                        <span style = {{ marginLeft: "120px", color: "#b9b9b9", fontSize: "12px", fontFamily: "Century Gothic"}}>
                          Duration: 
                          <span style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                            {game.gameDuration}
                          </span>
                        </span>
                      </MDBCol>

                    </MDBRow>

                    <br/>

                    <img src={game.selectedFile} width="400px" alt="
                    Game Post" style = {{color: "#fff ", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}/>
                    
                    <br /><br />

                    <MDBRow>

                    <button 
                      name={game._id} 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      style = {{marginRight: "5px"}} 
                      onClick={() => dispatch(likePost(game, commentField), console.log(game, commentField, "commentField, like"))}
                    >
                      Like | {game.likeCount.length}
                    </button>

                    <button 
                      variant="contained"
                      className = "btn btn-light btn-sm"
                      style = {{marginRight: "5px"}}  
                      onClick={() => dispatch(unlikePost(game, commentField))}
                    >
                      Unlike
                    </button>

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
                          style = {{marginLeft:"-10px", width: "70%"}}
                          placeholder="Type in your comment here..."
                        />

                        <button 
                          variant="contained"
                          className = "btn btn-light btn-sm"
                          onClick={handleSubmitComment}>Comment</button>
                        
                        <br /> <br />

                        {game.comment.map((theComment, i) => {
                          return (

                            <div key={i}>
                              {/* {console.log(theComment)} */}
                              <p style = {{color: "#b9b9b9", fontSize: "14px", fontFamily: "Century Gothic"}}>
                                @{theComment.username}: 
                                <span style = {{color: "#fff ", fontSize: "16px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                                  {theComment.comment}
                                </span>
                              </p>

                              <hr color= "white"></hr>

                            </div>
                          )
                        })}
                    {/* </form> */}
                  {/* </MDBContainer> */}
                  <hr />
                </div>
              );
            } else {
                  console.log("no notifications for now")
                }
            })}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr />
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     games: state.games,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setGames: () => dispatch(setGames()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Profilegames);
