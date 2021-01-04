import { get } from "axios";
import axios from "axios";
import { setToken } from "../components/pages/setToken";
// import { response } from "express";

export const FETCH_ALL = "FETCH_ALL";

/////////////////////////////////////////////////////Actions for GAMES/////////////////////////////////////////////////////
//setGames() will make our API call and use the dispatch method to send an action to the reducer.
export const SET_GAMES = "SET_GAMES";
export function setGames() {
  return function (dispatch) {
    //We don't need to use the full URL, just the path. We added the domain portion as a proxy in the client/package.json file.
    return get("/api/games")
      .then(function (response) {
        dispatch({
          type: SET_GAMES,
          payload: response.data,
        });
        //if we get a successful response we will call the dispatch method and send an Action. In this case the action type is SET_GAMES, and we are sending the API response data with the action as a payload called "games." Then the reducer will add it to the store.
      })
      .catch(function (error) {
        console.log(
          error,
          "error from the actions/index.js (setGames) -RawanB"
        );
      });
  };
}

export const LIKE_GAME = "LIKE_GAME";
export function likePost( game, commentField, callback ) {
  return async function (dispatch) {
    return axios
      .patch(`/api/games/${game._id}/likePost`, game)
      .then(function (data) {
        callback();
        dispatch({ type: LIKE_GAME, payload: data });
      })
      .catch(function (error) {
        console.log(error, "error from the actions");
      });
  };
}
       

export const UNLIKE_GAME = "UNLIKE_GAME";
export function unlikePost(game, commentField, callback) {
  return async function (dispatch) {
    return axios.patch(`/api/games/${game._id}/unlikePost`,commentField)
      .then (function(data) {
        callback();
        dispatch({ type: UNLIKE_GAME, payload: data})

      })
      .catch(function (error) {
        console.log(error, "error from the actions")
      })
  }
}

export const JOIN_GAME = "JOIN_GAME";
export function joinPost(game, commentField, callback) {
  console.log(game, "game")
  console.log(commentField, "game")
  console.log(callback, "callback")
  return async function (dispatch) {
    return axios.patch(`/api/games/${game._id}/joinPost`, commentField)
      .then (function(data) {
        callback();
        dispatch({ type: JOIN_GAME, payload: data})
        console.log(data)
      })
      .catch(function (error) {
        console.log(error, "error from the actions")
      })
  }
}

export const UNJOIN_GAME = "UNJOIN_GAME";
export function unjoinPost(game, commentField, callback) {
  return async function (dispatch) {
    return axios.patch(`/api/games/${game._id}/unjoinPost`, commentField)
      .then (function(data) {
        callback();
        dispatch({ type: JOIN_GAME, payload: data})
        console.log(data)
      })
      .catch(function (error) {
        console.log(error, "error from the actions");
      });
  };
}

export const ADD_COMMENT = "ADD_COMMENT";
export function comment(commentField) {
  console.log(commentField, "commentField")
  return {
    type: ADD_COMMENT,
    commentField: commentField,
  };
}

//The only thing we are doing in this action is passing on the game object to the reducer.
export const ADD_GAME = "ADD_GAME";
export function addGame(game) {
  return {
    type: ADD_GAME,
    game: game,
  };
}

export const SET_GAME = "SET_GAME";
export function setGame(game) {
  return {
    type: SET_GAME,
    game: game,
  };
}

export const REMOVE_GAME = "REMOVE_GAME";
export function removeGame(_id) {
  return {
    type: REMOVE_GAME,
    _id: _id,
  };
}

export const REPLACE_GAME = "REPLACE_GAME";
export function replaceGame(game) {
  return {
    type: REPLACE_GAME,
    game: game,
  };
}

/////////////////////////////////////////////////////Actions for USER/////////////////////////////////////////////////////
export const SET_USER = "SET_USER";
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}



export const EDIT_PROFILE = "EDIT_PROFILE";
export function updateProfile(user) {
  return {
    type: EDIT_PROFILE,
    user: user,
  };

}

export const fetchUser = (email) => {
  console.log(email,"email from action ")
  return (dispatch) => {

    dispatch(fetchUserRequest());
    axios.get("/addUser/profile/"+email) 
      .then((payload) => {
        let user = payload.data;
        console.log(user,"from client")
        dispatch(fetchUserSuccess(user));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUserFailure(error.message));
      });
  };
};

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const LOAD_USER = "LOAD_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));
  }
  try {
    const response = await axios.get("/addUser");
    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const registerUser = (
  firstName,
  lastName,
  username,
  email,
  city,
  phoneNo,
  birthday,
  password,
  url
) => async (dispatch) => {
  try {
    const body = {
      firstName,
      lastName,
      username,
      email,
      city,
      phoneNo,
      birthday,
      password,
      url
    };
    const response = await axios.post("/addUser", body);
    window.location = "/login";

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data.id,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error,
    });
  }
};

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const loginUser = (email, password, username) => async (dispatch) => {
  try {
    const body = { email, password, username };
    const response = await axios.post("addUser/login", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    window.location = "/";
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error,
    });
  }
};

/////////////////////////////////////////////////////Actions for FILTERS/////////////////////////////////////////////////////

export const FILTER_GAMES_BY_GOVERNORATES = "FILTER_GAMES_BY_GOVERNORATES";
export const filterGames = (games, Governorates) => (dispatch) => {
  dispatch({
    type: FILTER_GAMES_BY_GOVERNORATES,
    payload: {
      //payload is an object that has the items

      Governorates: Governorates,
      items:
        Governorates === "" // now if items are empty
          ? games // return all games
          : //else
            games.filter((x) => x.gameGovernorate.indexOf(Governorates) >= 0),
      //I want you to filter the games based on their governorates
    },
  });
};

export const FILTER_GAMES_BY_TYPE = "FILTER_GAMES_BY_TYPE";
export const filterByType = (games, type) => (dispatch) => {
  dispatch({
    type: FILTER_GAMES_BY_TYPE,
    payload: {
      //payload is an object that has the items

      type: type,
      items:
        type === "" // now if items are empty
          ? games // return all games
          : //else
            games.filter((x) => x.gameType.indexOf(type) >= 0),
      //I want you to filter the games based on their governorates
    },
  });
};

/////////////////////////////////////////////////////Actions for CHATT/////////////////////////////////////////////////////
export const CHAT_SERVER = "/api/chat";
export const GET_CHATS = "GET_CHATS";
export const getChats = () => async (dispatch) => {
  const response = await axios.get(`${CHAT_SERVER}/getChats`);
  dispatch({
    type: GET_CHATS,
    payload: response.data,
  });
};

export const AFTER_POST_MESSAGE = "AFTER_POST_MESSAGE";
export const afterPostMessage = (data) => {
  return {
    type: AFTER_POST_MESSAGE,
    payload: data,
  };
};
