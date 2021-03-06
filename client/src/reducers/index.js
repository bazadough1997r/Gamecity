import { combineReducers } from "redux";
import games from "./gamesReducer";
import game from "./gameReducer";
import profileReducer from "./profileReducer";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import joinRoomReducer from "./joinRoomReducer";

//The app will have two reducer functions, one for an array of games, and one for a specific game. When you have more than one reducer you need to combine them into a single reducer object using Redux's combineReducers method.
export default combineReducers({
  games: games,
  game: game,
  user: profileReducer,
  authReducer: authReducer,
  chat: chatReducer,
  joinRoom: joinRoomReducer,
});
