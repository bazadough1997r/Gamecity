import { SET_GAMES, ADD_GAME, REMOVE_GAME, REPLACE_GAME, FILTER_GAMES_BY_GOVERNORATES, FILTER_GAMES_BY_TYPE, LIKE_GAME, JOIN_GAME, ADD_COMMENT } from "../actions";

//Import SET_GAMES && ADD_GAME from the actions folder.
// import { SET_GAMES, ADD_GAME, REMOVE_GAME, REPLACE_GAME, LIKE_GAME, JOIN_GAME } from "../actions";
//Declare our reducer function with two arguments, state and action. Set the initial state to an empty games array.
const initialState = { games: [], filteredItems: [], Governorates: "", type: "" };
export default function gamesReducer(state = initialState, action) {
  // console.log(state,"state for games reducer laih undefined")
  //Use a switch statement to match the action type. If the action type is SET_GAMES it returns the games data to update the store with.
  switch (action.type) {
    //You need a default case. If there is no match, the reducer will just return the current state.
    case SET_GAMES:
      return {...state,
        games: action.payload,
        filteredItems: action.payload 
      };

    case ADD_GAME:
      return {...state,
        game: action.game,
      };
    case REMOVE_GAME:
      // console.log(...state, "amaaaneh")
      return {...state.filter((game) => game._id !== action._id)}
    case REPLACE_GAME:
      return state.map(function (game) {
        if (game._id === action.game._id) {
          return {
            ...state,
            gameName: action.game.gameName,
            gameType: action.game.gameType,
            gameDurartion: action.game.gameDuration,
            gameDate: action.game.gameDate,
            selectedFile: action.game.selectedFile,
            likeCount: action.game.likeCount,
            joinCount: action.game.joinCount
          };
        } else return game;
      });
    case FILTER_GAMES_BY_GOVERNORATES:
      return {
        ...state,
        Governorates: action.payload.Governorates,//these ones are coming from the action payload
        filteredItems: action.payload.items
      }
      case FILTER_GAMES_BY_TYPE:
        return {
          ...state,
          type: action.payload.type,//these ones are coming from the action payload
          filteredItems: action.payload.items
        }
      case LIKE_GAME:
        return state.map(function (game) {
          if (game._id === action.game._id) {
            return {
              ...game,
              gameName: action.game.gameName,
              gameType: action.game.gameType,
              gameDurartion: action.game.gameDuration,
              gameDate: action.game.gameDate,
              selectedFile: action.game.selectedFile,
              likeCount: action.game.likeCount,
              joinCount: action.game.joinCount,
              comment: action.game.comment

            };
          } else return game;
        });
        case JOIN_GAME:
          return state.map(function (game) {
            if (game._id === action.game._id) {
              return {
                ...game,
                gameName: action.game.gameName,
                gameType: action.game.gameType,
                gameDurartion: action.game.gameDuration,
                gameDate: action.game.gameDate,
                selectedFile: action.game.selectedFile,
                likeCount: action.game.likeCount,
                joinCount: action.game.joinCount,
                comment: action.game.comment
              };
            } else return game;
          });
          case ADD_COMMENT:
            return state.map(function (commentField) {
              if (commentField.id === action.commentField.id) {
                return {
                  ...commentField,
                  comment: action.commentField.comment
                };
              } else return commentField;
            });
    default:
      return state;
  }
}