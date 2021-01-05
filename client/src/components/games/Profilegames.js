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
      <hr />
      <h3>{window.localStorage.username}'s posts:</h3>
      <MDBContainer>
        <MDBRow>
        
          <MDBCol md="6" style={{ marginTop: "20px" }}>
            {games.map((game) => {
                if (game.username === window.localStorage.username) {
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
                
                    {game.joinCount.map((joined, i) => {
                      return (
                        <div key={i}>
                          <h6>joined: @{joined.username}</h6>
                        </div>
                      )}
                  
                      )}
                
            
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



