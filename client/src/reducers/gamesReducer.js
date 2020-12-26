//Import SET_GAMES && ADD_GAME from the actions folder.
import { SET_GAMES, ADD_GAME, REMOVE_GAME, REPLACE_GAME, LIKE_GAME } from "../actions";

//Declare our reducer function with two arguments, state and action. Set the initial state to an empty games array.
const initialState = { games: [] };

export default function gamesReducer(state = initialState, action) {
  //Use a switch statement to match the action type. If the action type is SET_GAMES it returns the games data to update the store with.
  switch (action.gameName) {
    //You need a default case. If there is no match, the reducer will just return the current state.
    case SET_GAMES:
      return action.games;
    //Add the action type to the switch statement. It adds the new game to the beginning of the existing games array from the store's current state.
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
            gameType: action.game.gameType,
            gameDate: action.game.gameDate,
            gameDuration: action.game.gameDuration,
            gameGovernorate: action.game.gameGovernorate,
            selectedFile: action.game.selectedFile
          };
        } else return game;
      });

    case LIKE_GAME:
    // case UNLIKE_GAME:
    return state.map(function (game) {
      if (game._id === action.game._id) {
        return {
          ...game,
          // gameName: action.game.gameName,
          // gameType: action.game.gameType,
          // gameDate: action.game.gameDate,
          // gameDuration: action.game.gameDuration,
          // gameGovernorate: action.game.gameGovernorate,
          // selectedFile: action.game.selectedFile,
          likeCount: action.game.likeCount
        };
      } else return game;
    });

    default:
      return state;
  }
}
