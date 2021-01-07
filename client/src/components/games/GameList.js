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
                    </p>
                    
                    <MDBContainer>
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

            </MDBCol>
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

// import React, { useState, useEffect } from "react";
// import { useDispatch, connect } from "react-redux";
// import axios from "axios";
// import { patch } from "axios";
// import Filter from "./Filter";
// import { Link } from "react-router-dom";
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import { likePost, unlikePost, joinPost, unjoinPost, setGames } from "../../actions/index.js"
// import GameRendered from "../games/GameRendered";
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import { IconButton } from "@material-ui/core";
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
// // import GameList2 from "./GameList2"


// // import Chat from '../pages/Chat';
// // import { heart } from "@fortawesome/free-solid-svg-icons";

// // import { copyFileSync } from "fs";

// const useStyles = makeStyles({
//   card: {
//     width: 550,
//     height: 600
//   },
//   buttons: {
//     // padding: 10
//   },
//   newGameButton: {
//     width: 550,
//   },
//   notifications: {
//       // width: "80%",
//       marginRight: 50,
//       marginLeft: 50
//   },
//   ad:{
//     // marginRight: 10,
//     // marginLeft: 50
//   }
// });

// function GameList(props) {
//   const classes = useStyles();

//   const [commentField, setComment] = useState({ comment: "", id: "", username: window.localStorage.username, joins: 0, likes: 0 });
//   const [games, setGames] = useState([]);
//   const dispatch = useDispatch();
//   console.log(games, "games for the warning")
//   function handleChangeComment(event) {
//     setComment({ ...commentField, comment: event.target.value, id: event.target.name, username: window.localStorage.username });
//   }


//   function handleSubmitComment(event) {
//     event.preventDefault();
//     async function comment() {
//       try {
//         await patch(`/api/games/${commentField.id}/comment`, commentField);
//         // console.log(commentField.id, "ID from the edit")
//         props.history.push(`/games/${commentField.id}/comment`);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     comment();
//   }

//   useEffect(function () {
//     async function getGames() {
//       try {
//         const response = await axios.get("/api/games");
//         setGames(response.data);
//       } catch (error) {
//         console.log("error", error);
//       }
//     }
//     getGames();
//   }, []);

//   // conditional rendering for notifications
//   var useremail = window.localStorage.email;
//   var value = false;
//   if (window.localStorage.length > 0) {
//     value = true;
//   } else {
//     value = false;
//   }

//   return (
//     <div>
//       {/* <GameList2/> */}
//       <br/><br/><br/>
//       <Grid container direction = "row" justify= "center" alignItems="flex-start">
//         <Grid item  xs={6} sm ={3} className= {classes.notifications}>
//             <br></br>
//             <Filter />

//             {/* Notifications part */}
//             <hr></hr>

//             <div>
//               <p style= {{fontSize: "20px", fontWeight: "bold"}}>{window.localStorage.username}'s Notifications </p>
//               {props.games.filteredItems.map((game) => {
//                 if (game.username === window.localStorage.username) {
//                   return (
//                     <div key={game._id}>
//                         <form>
//                           <div className="form-group">
//                             {game.comment.map((theComment, i) => {
//                               return (
//                                 <div key={i}>
//                                   <p style= {{fontSize: "12px"}}>
//                                     @{theComment.username} commented: "
//                                     {theComment.comment}" on "
//                                     <Link to={`/games/${game._id}`}>
//                                       {game.gameName}
//                                     </Link>
//                                     " post.
//                                   </p>
//                                   <hr/>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </form>
//                     </div>
//                   );
//                 } else {
//                   console.log("no notifications for now")
//                 }
//               }, null)}
//             </div>
//             {/* Notifications part done */}
//             </Grid>            
//             <Grid item  xs={12} sm={6} >
//                   <Button variant="outlined" color="primary" className = {classes.newGameButton} >
//                     <Link to="/games/new">
//                       New Game
//                     </Link>
//                   </Button> 
//             {props.games.filteredItems.map((game) => {
//               return (
//                 <div key={game._id}>
//                 <br/><br/>
//                 <Card className={classes.card}>
//                 <CardActionArea>
//                   <Grid>
//                   <CardMedia
//                     component="img"
//                     alt="Game Image"
//                     style={{ height: "150px" }} 
//                     image={game.selectedFile}
//                     title="Image goes here"
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h6" color="textSecondary" component="h5">@{game.username}</Typography>
//                     <Typography gutterBottom variant="h5" component="h2">
//                     <Link to={`/games/${game._id}`}>{game.gameName}</Link>
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" component="h6">{game.createdAt}</Typography>
//                     <Typography variant="body1"  component="h5">
//                       Location: Jordan/{game.gameGovernorate}, Game: {game.gameType}, Date: {game.gameDate}, Duration: {game.gameDuration} 
//                       <hr />
//                     </Typography>
//                     <IconButton >
//                     {/* {value === false ? ( */}
//                           <ThumbUpAltIcon className = {classes.buttons} name={game._id} onClick={() => dispatch(likePost(game, commentField))}/> 
//                           <ThumbDownAltIcon onClick={() => dispatch(unlikePost(game, commentField))}/>
//                       {/* // ) : ( */}
//                         {/* // )} */}
//                         <div>
//                           <PersonAddIcon name={game._id} onClick={() => dispatch(joinPost(game, commentField))}/>
//                           </div>
//                         <PersonAddDisabledIcon name={game._id} onClick={() => dispatch(unjoinPost(game, commentField))}/>
//                     </IconButton>
//                     <hr/>
//                     <Typography gutterBottom variant="body1" component="h5">Likes: {game.likeCount.length} | Joined: {game.joinCount.length}</Typography>
//                     {game.joinCount.map((joined, i) => {
//                       return (
//                         <div key={i}>
//                           <Typography gutterBottom variant="body2" component="h5">Joined: @{joined.username}</Typography>
//                         </div>
//                       )
//                     })}
//                     <hr/>
//                     <Grid  xs={6} sm= {3}>
//                         <TextField 
//                           id="standard-size-small" 
//                           variant="outlined"
//                           className = {classes.textField} 
//                           style = {{width: 390}}
//                           name={game._id}
//                           type="text"
//                           value={commentField.comment.name}
//                           onChange={handleChangeComment}
//                           className="form-control"
//                           placeholder="Type in your comment here..."
//                         />
//                         <Button onClick={handleSubmitComment}>Comment</Button>
//                         <br /> <br />
//                         {game.comment.map((theComment, i) => {
//                           return (
//                             <div key={i}>
//                               {/* {console.log(theComment)} */}
//                               <Typography>@{theComment.username}: {theComment.comment}</Typography>
//                             </div>
//                           )
//                         })}

//                       </Grid>
//                   </CardContent>
//                   </Grid>
//                 </CardActionArea>
//               </Card>
//                 </div>
//               );
//             })}
//             </Grid>

//             <br></br>
//             <br></br>
//             <Grid item className= {classes.ad}  >
//               <Link>
//                 <CardMedia
//                   component="img"
//                   alt="Game Image"
//                   style={{ height: "400px", width: "225px" }} 
//                   image={`${process.env.PUBLIC_URL}/Ads/ad1.gif`}
//                   title="Playstation 6, now available"
//                 />
//               </Link>
//             {/* <a href="https://www.tripadvisor.com/Attractions-g293986-Activities-c56-Amman_Amman_Governorate.html" className="navbar-brand float-none">
//                   <img
//                     height="300px"
//                     width="200px"
//                     src={`${process.env.PUBLIC_URL}/Ads/ad1.gif`}
//                     alt="Gamecity logo"
//                   />
//                 </a> */}
//             <div>
//             </div>
//       </Grid>
//       </Grid>
//       <hr />
//     </div>
//   );
// }

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

// export default connect(mapStateToProps, mapDispatchToProps)(GameList);
