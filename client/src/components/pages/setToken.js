import axios from "axios";

export const setToken = (token) => {
  if (token) axios.defaults.headers.common["addUser-token"] = token;
  else delete axios.defaults.headers.common["addUser-token"];
};
