// // import React, { useState, useEffect } from "react";
// // import { useDispatch } from "react-redux";
// // import axios from "axios";
// // import { post } from "axios";
// // import { Link } from "react-router-dom";
// // import LikeButton from "../likeButton.js";
// // import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// // import Filter from './Filter'
// // import { connect } from 'react-redux';
// // import  { setGames } from '../../actions';

// //   const GameList = (props) => {
  
// //   const [games, setGames] = useState([]);
// //   console.log(props, "ana props belGAMELIST")

// //   const [game, setFields] = useState({ like: 0, comment: "" });
// //   const dispatch = useDispatch();

// //   function handleChangeComment(event) {
// //     setFields({ ...game, comment: event.target.value });
// //   }

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     post("/api/games", {
// //       like: game.like,
// //       comment: game.comment,
// //     })
// //       .then(function (response) {
// //         dispatch(GameList(response.data));
// //       })
// //       .then(function () {
// //         props.history.push("/");
// //       })
// //       .catch(function (error) {
// //         console.log(error);
// //       });
// //   };

// //   useEffect(function () {
// //     async function getGames() {
// //       try {
// //         const response = await axios.get("/api/games");
// //         setGames(response.data);
// //       } catch (error) {
// //         console.log(error, "error from  useEffect in GameList");
// //       }
// //     }
// //     getGames();
// //   }, []);

// //   return (
// //     <div>
     
// //       <hr />
     
// //       <MDBContainer>
// //         <MDBRow>
// //           <MDBCol md="3" style={{ marginTop: "20px" }}>
    
// //           </MDBCol>
// //           <MDBCol md="6">
// //             {props.games.filteredItems.map((game) => {
// //               return (
// //                 <div key={game._id}>
// //                   <h4>
// //                     <Link to={`/games/${game._id}`}>{game.gameName}</Link>
// //                   </h4>
// //                   <MDBContainer>
// //                     <MDBRow>
// //                       <MDBCol size="4">
// //                         <h6 key={game.gameGovernorate}>
// //                           Jordan/{game.gameGovernorate}
// //                         </h6>
// //                         <h6>Game: {game.gameType}</h6>
// //                       </MDBCol>
// //                       <MDBCol size="4">
// //                         <h6>Date: {game.gameDate}</h6>
// //                         <h6>Duration: {game.gameDuration}</h6>
// //                       </MDBCol>
// //                     </MDBRow>
// //                     <img src={game.selectedFile} width="250px" alt="soora"/>
// //                     <br />
// //                     <form onSubmit={handleSubmit}>
// //                       {/* <button onClick={setFields({...game, like: game.like++})}>Likes: {game.like}</button> */}
// //                       <LikeButton />
// //                       <br />
// //                       <div className="form-group">
// //                         <input
// //                           type="text"
// //                           value={game.comment}
// //                           onChange={handleChangeComment}
// //                           className="form-control"
// //                           placeholder="Type in your comment here..."
// //                         />
// //                         <button type="Submit">Comment</button>
// //                         <br />
// //                         <h6>{game.comment}</h6>
// //                       </div>
// //                     </form>
// //                   </MDBContainer>
// //                   <hr/>
// //                 </div>
// //               );
// //             })}
// //           </MDBCol>
// //           <MDBCol md="3">
// //             <h2 style={{ marginTop: "20px" }}>
// //               <Link to="/games/new" className="btn btn-primary float-right">
// //                 Build a team!
// //               </Link>
// //             </h2>
// //           </MDBCol>
// //         </MDBRow>
// //       </MDBContainer>
// //       <hr />
// //     </div>
// //   );
// // }

// // const mapStateToProps = state => ({
// //   games: state.games
// // })


// // export default connect(mapStateToProps, {setGames})(GameList);
// import React, { useState, useEffect } from "react";
// import Filter from './Filter'
// import { useDispatch } from "react-redux";
// import  { setGames } from '../../actions';
// import axios from "axios";
// import { post } from "axios";
// import { Link } from "react-router-dom";
// import { connect } from 'react-redux';
// import LikeButton from "../likeButton.js";
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";


// function GameList(props) {

//   // const {setGames, games} = props;
//   const [games, setGames] = useState([]);

//   console.log("props.games.filteredItems)", props.games.filteredItems)
//   console.log("games", games)
//   console.log("props", props)
  

//   const [game, setFields] = useState({ like: 0, comment: "" });
//   const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     post("/api/games", {
//       like: game.like,
//       comment: game.comment,
//     })
//       .then(function (response) {
//         dispatch(GameList(response.data));
//       })
//       .then(function () {
//         props.history.push("/");
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   useEffect(function () {
//     async function getGames() {
//       try {
//         const response = await axios.get("/api/games");
//         console.log("HI")
//         setGames(response.data);
//       } catch (error) {
//         console.log(error, "error from  useEffect in GameList");
//       }
//     }
//     getGames();
//   },  []);
//   // second argument if it's []: I only want you to run your callback when this Component mounts for the first time and that's it.
// // []  By using [] we tell useEffect() that there are no properties we want you to watch and then run your callback when they change. Just run once.
//   return (
//     <div>
//       <hr />
//       <MDBContainer>
//         <MDBRow>
//           <MDBCol md="3">
//           </MDBCol>
//             <Filter />
//           <MDBCol md="6" style={{ marginTop: "20px" }}>
//             {games.map((game) => {
//               return (
//                 <div key={game._id}>
//                   <h4>
//                     <Link to={`/games/${game._id}`}>{game.gameName}</Link>
//                   </h4>
//                   <MDBContainer>
//                     <MDBRow>
//                       <MDBCol size="4">
//                         <h6 key={game.gameGovernorate}>
//                           Jordan/{game.gameGovernorate}
//                         </h6>
//                         <h6>Game: {game.gameType}</h6>
//                       </MDBCol>
//                       <MDBCol size="4">
//                         <h6>Date: {game.gameDate}</h6>
//                         <h6>Duration: {game.gameDuration}</h6>
//                       </MDBCol>
//                     </MDBRow>
//                     <img src={game.selectedFile} width="250px" alt="game post"/>
//                     <br />
//                     <form onSubmit={handleSubmit}>
//                       <LikeButton />
//                       <br />
//                     </form>
//                   </MDBContainer>
//                   <hr/>
//                 </div>
//               );
//             })}
//           </MDBCol>
//           <MDBCol md="3">
//             <h2 style={{ marginTop: "20px" }}>
//               <Link to="/games/new" className="btn btn-primary float-right">
//                 Build a team!
//               </Link>
//             </h2>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//       <hr />
//     </div>
//   );
// }

// // const mapStateToProps = state => ({
// //   games: state.games
// // })
// const mapStateToProps = (state) => {
//   return {
//     games: state.games,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setGames: () => dispatch(setGames()),
//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(GameList);


import React, { useState, useEffect } from "react";
import Filter from './Filter'
import { useDispatch } from "react-redux";
import  { setGames } from '../../actions';
import axios from "axios";
import { post } from "axios";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import LikeButton from "../likeButton.js";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";


function GameList(props) {

  // const {setGames, games} = props;
  const [games, setGames] = useState([]);

  console.log("props.games.filteredItems)", props.games.filteredItems)
  console.log("games", games)
  console.log("props", props)
  

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
        console.log("HI")
        setGames(response.data);
      } catch (error) {
        console.log(error, "error from  useEffect in GameList");
      }
    }
    getGames();
  },  []);
  // second argument if it's []: I only want you to run your callback when this Component mounts for the first time and that's it.
// []  By using [] we tell useEffect() that there are no properties we want you to watch and then run your callback when they change. Just run once.
  return (
    <div>
      <hr />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
          </MDBCol>
            <Filter />
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
                    <img src={game.selectedFile} width="250px" alt="game post"/>
                    <br />
                    <form onSubmit={handleSubmit}>
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
      <hr />
    </div>
  );
}

// const mapStateToProps = state => ({
//   games: state.games
// })
const mapStateToProps = (state) => {
  return {
    games: state.games,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGames: () => dispatch(setGames()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameList);