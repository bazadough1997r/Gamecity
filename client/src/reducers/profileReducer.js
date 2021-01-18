import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  EDIT_PROFILE,
} from "../actions/index";

const initialState = {
  loading: false,
  user: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        user: [],
        error: action.payload,
      };
    case EDIT_PROFILE:
      return state.map(function (user) {
        if (user.email === action.user.email) {
          return {
            ...state,
            firstName: action.user.firstName,
            lastName: action.user.lastName,
            email: action.user.email,
            city: action.user.city,
            phoneNo: action.user.phoneNo,
            birthday: action.user.birthday,
            url: action.user.url,
          };
        } else return user;
      });
    default:
      return state;
  }
};

export default reducer;
