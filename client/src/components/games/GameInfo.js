import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { setGame, removeGame } from "../../actions";

//this component dispatches two different actions, setGame and removeGame

//Pass in props as a parameter because we will be accessing the game id in the component from the params prop.
function GameInfo(props) {
  //Call the react-redux useSelector hook to get the game object from the Redux store and assign it to the component's state.
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  //The useEffect hook takes a second argument called the dependency array that instructs React to rerun the effect only when the listed elements in the array change. React will post a warning in the console if you leave something out.
  useEffect(
    function () {
      axios
        .get(`/api/games/${props.match.params._id}`)
        .then(function (response) {
          dispatch(setGame(response.data));
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    [dispatch, props]
  );

  function handleDelete() {
    axios
      .delete(`/api/games/${game._id}`)
      .then(function () {
        dispatch(removeGame(game._id));
        props.history.push("/");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }

  return (
    <div>
      <h2>{game.gameName}</h2>
      <small>id: {game._id}</small>
      <p>{game.content}</p>
      <div className="btn-group">
        <Link
          to={{ pathname: `/games/${game._id}/edit` }}
          className="btn btn-info"
        >
          Edit
        </Link>
        <button className="btn btn-danger" type="button" onClick={handleDelete}>
          Delete
        </button>
        <Link to="/" className="btn btn-secondary">
          Close
        </Link>
      </div>
      <hr />
    </div>
  );
}

export default GameInfo;
//useEffect: The React useEffect hook essentially replaces the lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount). Use it when we need to rerender our component.
