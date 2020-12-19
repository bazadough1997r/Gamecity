// Import useState which will allow us to add state to a functional component.
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { post } from "axios";
//Import the addGame function from the Actions file.
import { addGame } from "../../actions";

function GameAdd(props) {
  const initialState = { gameName: "", content: "" };
  //useState: UseState is a two element array that contains the current state as the
  //first element and a function to update it as the second. Here we're assigning the
  //(const) variable "game" to the current state value, and "setFields" to the update function.
  const [game, setFields] = useState(initialState);
  const dispatch = useDispatch();

  //Every time a user types a character in a form input field the onChange property calls the handleChange
  //handler function passing the event object as an implicit argument. The event object includes the target
  //(i.e., the form field element) which has attributes for field name and value.
  function handleChange(event) {
    // ...game spread operator so that the new character is added to the existing article value, otherwise it will just overwrite it.
    setFields({ ...game, [event.target.name]: event.target.value });
  }

  //When the user presses the submit button it calls the handleSubmit function. This is where our API post
  //request is sent with the game object sent as the payload. If it successfully posts it will send back
  //the new game object. Then we dispatch the addGame action passing in the new game object.
  function handleSubmit(event) {
    event.preventDefault();
    if (!game.gameName || !game.content) return;
    post("/api/games", { gameName: game.gameName, content: game.content })
      .then(function (response) {
        dispatch(addGame(response.data));
      })
      .then(function () {
        props.history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleCancel() {
    props.history.push("/");
  }

  return (
    <div>
      <h4>What's your next game?..</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="gameName"
            required
            value={game.gameName}
            onChange={handleChange}
            className="form-control"
            placeholder="game name"
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            rows="5"
            required
            value={game.content}
            onChange={handleChange}
            className="form-control"
            placeholder="Content"
          />
        </div>
        <div className="btn-group">
          <input type="submit" value="Post" className="btn btn-primary" />
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default GameAdd;

//NOTE: we'll use the useDispatch hook to modify the Redux store.
