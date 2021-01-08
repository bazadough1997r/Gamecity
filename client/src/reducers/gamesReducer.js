import {
  SET_GAMES,
  ADD_GAME,
  REMOVE_GAME,
  REPLACE_GAME,
  LIKE_GAME,
  UNLIKE_GAME,
  JOIN_GAME,
  UNJOIN_GAME,
  ADD_COMMENT,
} from "../actions";

//Declare our reducer function with two arguments, state and action. Set the initial state to an empty games array.
const initialState = {
  games: [],
};
export default function gamesReducer(state = initialState, action) {
  // console.log(state,"state for games reducer laih undefined")
  //Use a switch statement to match the action type. If the action type is SET_GAMES it returns the games data to update the store with.
  switch (action.gameName) {
    //You need a default case. If there is no match, the reducer will just return the current state.
    case SET_GAMES:
      return action.games;

      case ADD_GAME:
        return [action.game, ...state];

        case REMOVE_GAME:
          return state.filter((game) => game._id !== action._id);

    case REPLACE_GAME:
      return state.map(function (game) {
        if (game._id === action.game._id) {
          // console.log(action.game.likeCount,"action.game.likeCount")
          return {
            ...game,
            gameName: action.game.gameName,
            gameType: action.game.gameType,
            gameDurartion: action.game.gameDuration,
            gameDate: action.game.gameDate,
            selectedFile: action.game.selectedFile,
            likeCount: action.game.likeCount,
            joinCount: action.game.joinCount,
          };
          
        } else return game;
      });

    case UNLIKE_GAME:
    case LIKE_GAME:
      // console.log("hellooooo")
      return state.map(function (game, commentField) {
        // console.log(game, "game in reducer")
        // console.log(commentField, "commentField in reducer")
        if (game._id === action.game._id) {
       console.log(action.commentField.joinCount,"action.commentField.joinCount")
          return {
            ...commentField,
            joinCount: action.commentField.joinCount,
            username: action.commentField.username,
          };
        } else return commentField;
      });

    case UNJOIN_GAME:
    case JOIN_GAME:
      return state.map(function (game, commentField) {
        if (game._id === action.game._id) {
          return {
            ...commentField,
            joinCount: action.commentField.joinCount,
            username: action.commentField.username,
          };
        } else return commentField;
      });

    case ADD_COMMENT:
      return state.map(function (commentField) {
        if (commentField.id === action.commentField.id) {
          return {
            ...commentField,
            comment: action.commentField.comment,
            username: action.commentField.username,
          };
        } else return commentField;
      });

    default:
      return state;
  }
}
