import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Filter from './Filter'
import { connect } from 'react-redux';
import  { setGames } from '../../actions';

  const GameList = (props) => {
  const [games, setGames] = useState([]);
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

  return (
    <div>
      <Filter />
      <hr />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
          </MDBCol>
          <MDBCol md="6">
            {props.games.filteredItems.map((game) => {
              return (
                <div key={game._id}>
                  <h4>
                    <Link to={`/games/${game._id}`}>{game.gameName}</Link>
                  </h4>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol size="4">
                        <h6>Jordan/{game.gameGovernorate}</h6>
                        <h6>Game: {game.gameType}</h6>
                      </MDBCol>
                      <MDBCol size="4">
                        <h6>Date: {game.gameDate}</h6>
                        <h6>Duration: {game.gameDuration}</h6>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
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
      <hr />
    </div>
  );
}

const mapStateToProps = state => ({
  games: state.games
})

export default connect(mapStateToProps, {setGames})(GameList);

