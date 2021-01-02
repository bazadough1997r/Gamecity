import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import { setGames } from "../../actions/index.js";

function Notifications(props) {
  const [games, setGames] = useState([]);
  console.log(games, "games for the warning");

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

      {/* /////////////////////////////////////JOINS////////////////////////////////////////////////// */}
      <div>
        <hr></hr>
        {props.games.filteredItems.map((game) => {
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
        })}
      </div>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
