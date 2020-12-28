//gameReducer manages state and actions for a single game object, while the gamesReducer
//manages state and actions for an array of game objects.

import { SET_GAME } from "../actions";

export default function gameReducer(state = {}, action) {
  //Set the initial state to an empty object.
  switch (action.type) {
    case SET_GAME:
      return action.game; //If the action type is SET_GAME then the reducer returns the game data to be added to the store.
    default:
      return state;
  }
}




