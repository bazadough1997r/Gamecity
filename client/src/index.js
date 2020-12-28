import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import rootReducer from "./reducers";
//Import the setGames method from the actions folder
import { setGames } from "./actions";

const devTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// import { composeWithDevTools } from 'redux-devtools-extension'
export const store = createStore(rootReducer,devTool(applyMiddleware(thunk, logger)));

/*We are applying the dispatch method directly to the store object. It is calling the setGames 
method which will do an API call then use an action to get the data in the store. This is the only 
time we will apply the dispatch method directly on the store. The rest of the actions will be 
dispatched from our components.*/

store.dispatch(setGames());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
