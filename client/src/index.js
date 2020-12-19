import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import rootReducer from "./reducers";
//Import the setGames method from the actions folder
import { setGames } from "./actions";

// import { composeWithDevTools } from 'redux-devtools-extension'


ReactDOM.render(
<App />,
document.getElementById("root")
);
