import { get } from "axios";
import axios from 'axios';
import { setToken } from '../components/pages/setToken';


export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
// export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
// export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_ALL = 'FETCH_ALL';
export const SET_GAMES = "SET_GAMES";





//setGames() will make our API call and use the dispatch method to send an action to the reducer.
export function setGames() {
  return function (dispatch) {
    //We don't need to use the full URL, just the path. We added the domain portion as a proxy in the client/package.json file.
    return get("/api/games")
      .then(function (response) {
        dispatch({ type: SET_GAMES, games: response.data });
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

// export const LIKE_GAME = "LIKE_GAME";
// export function likePost(game) {
//     return function (dispatch) {
//         return patch(`/api/games/${game._id}/likePost`)
//           .then (function(data) {
//               // const newGame = JSON.stringify(game);
//               console.log(data, "game from actions")
//               dispatch({ type : LIKE_GAME, game: game})
//               console.log(game.likeCount,"this is the game likeCount from the actions!")
//               // console.log(response.data, "response.data")
      
//             })
//             .catch(function (error) {
//                 console.log(error, "error from the actions")
//               })
//           }
//         }
        
export const LIKE_GAME = "LIKE_GAME";
export function likePost(game, callback) {
  return async function (dispatch) {
    return axios.patch(`/api/games/${game._id}/likePost`,game)
      .then (function(data) {
        callback();
        dispatch({ type: LIKE_GAME, payload: data})

      })
      .catch(function (error) {
        console.log(error, "error from the actions")
      })
  }
}

export const JOIN_GAME = "JOIN_GAME";
export function joinPost(game, callback) {
  return async function (dispatch) {
    return axios.patch(`/api/games/${game._id}/joinPost`,game)
      .then (function(data) {
        callback();
        dispatch({ type: JOIN_GAME, payload: data})

      })
      .catch(function (error) {
        console.log(error, "error from the actions")
      })
  }
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
export const REMOVE_GAME = "REMOVE_GAME";
export function setGame(game) {
  return {
    type: SET_GAME,
    game: game,
  };
}

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

export const SET_USER = "SET_USER";
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users") //change
      .then((response) => {
        // response.data is the users
        const user = response.data;
        dispatch(fetchUserSuccess(user));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUserFailure(error.message));
      });
  };
};

// export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const fetchUserSuccess = user => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
export const fetchUserFailure = error => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error
  }
}


export const LOAD_USER = 'LOAD_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const loadUser = () => async dispatch => {
  if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
  }
  try {
   const response =  await axios.get('/addUser');
   dispatch({
     type: LOAD_USER,
     payload: response.data
   }) 
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error 
    })
  }
}
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const registerUser = ( firstName, lastName, username, email, city, phoneNo, birthday, password ) => async dispatch => {
  try {
     const body = { firstName, lastName, username, email, city, phoneNo, birthday, password }
     const response = await axios.post('/addUser', body);
     console.log(response.data.id, "responseee")
     window.location = '/login'
   dispatch({
     type: REGISTER_SUCCESS,
     payload: response.data.id
   })
   dispatch(loadUser())
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload:error
    })
  }
}
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const loginUser = (email, password) => async dispatch => {
  try {
   const body = {email, password}
   const response = await axios.post('addUser/login', body);
   console.log(response, "responseee")
   dispatch({
     type: LOGIN_SUCCESS,
     payload: response.data
   })
   window.location = '/games'
   dispatch(loadUser())
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:error
    })
  }
}