import { GET_CHATS } from "../actions";

export default function gameReducer(state = {}, action) {
  switch (action.type) {
    case GET_CHATS:
      return {...state, chats: action.payload}; 
    default:
      return state;
  }
}




