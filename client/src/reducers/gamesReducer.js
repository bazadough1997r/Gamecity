//Import SET_GAMES && ADD_GAME from the actions folder.
import { SET_GAMES, ADD_GAME, REMOVE_GAME, REPLACE_GAME, FILTER_GAMES_BY_GOVERNORATES } from "../actions";

//Declare our reducer function with two arguments, state and action. Set the initial state to an empty games array.
const initialState = { games: [], items: [], filteredItems: [], Governorates: "" };
export default function gamesReducer(state = initialState, action) {
  //Use a switch statement to match the action type. If the action type is SET_GAMES it returns the games data to update the store with.
  switch (action.type) {
    //You need a default case. If there is no match, the reducer will just return the current state.
    case SET_GAMES:
      return {...state,
        games: action.payload,
        filteredItems: action.payload
      
      };
    //   switch (action.type) {
    //     //You need a default case. If there is no match, the reducer will just return the current state.
    //     case SET_GAMES:
    //       return {...state,
    //       items: action.payload
    //       };
    // //Add the action type to the switch statement. It adds the new game to the beginning of the existing games array from the store's current state.
    case ADD_GAME:
      return [action.game, ...state];
    case REMOVE_GAME:
      return state.filter((game) => game._id !== action._id);
    case REPLACE_GAME:
      return state.map(function (game) {
        if (game._id === action.game._id) {
          return {
            ...game,
            gameName: action.game.gameName,
            content: action.game.content,
            type: action.game.gameType,
          };
        } else return game;
      });
    case FILTER_GAMES_BY_GOVERNORATES:
      return {
        ...state,
        Governorates: action.payload.Governorates,//these ones are coming from the action payload
        filteredItems: action.payload.items
      }
    default:
      return state;
  }
}
