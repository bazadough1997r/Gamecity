<<<<<<< HEAD
import { combineReducers } from "redux";
import games from "./gamesReducer";
import game from "./gameReducer";
import profileReducer from './profileReducer';


//Our app will have two reducer functions, one for an array of games, and one for a specific game. When you have more than one reducer you need to combine them into a single reducer object using Redux's combineReducers method.
export default combineReducers({
  games: games,
  game: game,
  user: profileReducer,
});
=======
// import { combineReducers } from 'redux'
// //import the reducers you added

// export default combineReducers ({
//     //insert all the reducers you have here
// })
>>>>>>> a13bf32053c730febeedfcf91470e99946d3787d
