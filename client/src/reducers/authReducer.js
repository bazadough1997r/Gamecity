import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_ERROR
  // LOG_OUT,
} from "../actions/index";
const initialState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  username: localStorage.getItem("username"),
  isLoggedIn: false,
  errors: {},
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("email", payload.email);
      localStorage.setItem("username", payload.username);
      return {
        ...state,
        isLoggedIn: true,
        token: payload.token,
        email: payload.email,
        username: payload.username,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default authReducer;

// import {
//     REGISTER_SUCCESS,
//     REGISTER_FAILURE,
//     LOGIN_SUCCESS,
//     LOGIN_FAILURE,
//     AUTH_ERROR
//     // ,
//     // LOAD_USER
// } from '../actions/index'
// const initialState = {
//     token: localStorage.getItem('token'),
//     isLoggedIn: false,
//     errors: {}
// }
// const authReducer = (state = initialState, action) => {
//     const { type, payload } = action;
//     switch (type) {
//         case REGISTER_SUCCESS:
//             localStorage.setItem('token', payload.token)
//             return {
//                 ...state,
//                 isLoggedIn: true
//             }
//         case LOGIN_SUCCESS:
//             localStorage.setItem('token', payload.token)
//             return {
//                 ...state,
//                 isLoggedIn: true
//             }
//         // case LOAD_USER:
//         //     localStorage.getItem('token')
//         //     return {
//         //         ...state,
//         //         isLoggedIn: true
//         //     }
//         case LOGIN_FAILURE:
//         case REGISTER_FAILURE:
//         case AUTH_ERROR:
//             localStorage.removeItem('token');
//             return {
//                 ...state,
//                 isLoggedIn: false,
//                 errors: payload
//             }
//         default:
//             return state;
//     }
// }
// export default authReducer;