import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBContainer } from "mdbreact";

export default  function Notifications() {
  const [games, setGames] = useState([]);

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
      <hr></hr>
      <div>
        <h6>Comments notifications </h6>
        {games.map((game) => {
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
          return null;
        })}
      </div>

      {/* /////////////////////////////////////JOINS////////////////////////////////////////////////// */}
      <div>
        <hr></hr>
        <h6>Join notifications </h6>
        {games.map((game) => {
          if (game.username === window.localStorage.username) {
            return (
              <div key={game._id}>
                <MDBContainer>
                  <form>
                    <div className="form-group">
                      {game.joinCount.map((joined, i) => {
                        return (
                          <div key={i}>
                            <h6>
                              @{joined.username} wants to join your next game:{" "}
                              <Link to={`/games/${game._id}`}>
                                {game.gameName}
                              </Link>
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
          return null
        })}
      </div>
    </div>
  );
}



