import { JOIN_ROOM } from "../actions";

export default function joinRoomReducer(state = {}, action) {
  switch (action.type) {
    case JOIN_ROOM:
      return { ...state, room: action.payload };

    default:
      return state;
  }
}
