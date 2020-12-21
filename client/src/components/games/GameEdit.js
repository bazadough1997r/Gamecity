import React, { useState, useEffect } from "react";
import { get, patch } from "axios";

function GameEdit(props) {
  const initialState = { gameName: "", content: "" };
  const [game, setGame] = useState(initialState);

  useEffect(
    function () {
      async function getGame() {
        try {
          const response = await get(`/api/games/${props.match.params._id}`);
          setGame(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      getGame();
    },
    [props]
  );

  function handleSubmit(event) {
    event.preventDefault();
    async function updateGame() {
      try {
        await patch(`/api/games/${game._id}`, game);
        props.history.push(`/games/${game._id}`);
      } catch (error) {
        console.log(error);
      }
    }
    updateGame();
  }

  function handleChangeName(event) {
    // ...game spread operator so that the new character is added to the existing article value, otherwise it will just overwrite it.
    setGame({ ...game, gameName: event.target.value });
  }

  function handleChangeType(event) {
    setGame({ ...game, gameType: event.target.value });
  }

  function handleChangeGovernorate(event) {
    setGame({ ...game, gameGovernorate: event.target.value });
  }

  function handleChangeDate(event) {
    setGame({ ...game, gameDate: event.target.value });
  }

  function handleChangeDuration(event) {
    setGame({ ...game, gameDuration: event.target.value });
  }

  function handleCancel() {
    props.history.push(`/games/${game._id}`);
  }

  return (
    <div>
      <h1>Edit</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Post</label>
          <input
            type="text"
            required
            value={game.gameName}
            onChange={handleChangeName}
            className="form-control"
            placeholder="Type in your post here..."
          />
        </div>

        {/* LOCATION- Drop DOWN MENU */}
        <div className="form-group">
          <label>Governorate</label>
          <select
            type="text"
            required
            value={game.gameGovernorate}
            onChange={handleChangeGovernorate}
            className="form-control"
            placeholder="Select Governorate"
          >
            <option value="SelectGovernorate">Select Governorate</option>
            <option value="Amman"> Amman</option>
            <option value="Jerash"> Jerash</option>
            <option value="Irbid"> Irbid</option>
            <option value="Balqa"> Balqa</option>
            <option value="Zarqa"> Zarqa</option>
            <option value="Madaba"> Madaba</option>
            <option value="Mafraq"> Mafraq</option>
            <option value="Ajloun"> Ajloun</option>
          </select>
        </div>

        {/* SELECT GAME- DROPDOWN */}
        <div className="form-group">
          <label>Game</label>
          <select
            type="text"
            required
            value={game.gameType}
            onChange={handleChangeType}
            className="form-control"
            placeholder="Select Game"
          >
            <option value="SelectGame"> Select Game</option>
            <option value="Paintball"> Paintball</option>
            <option value="Football"> Football</option>
            <option value="Karting"> Karting</option>
            <option value="Basketball"> Basketball</option>
            <option value="Laser Tag"> Laser Tag</option>
            <option value="Volleyball"> Volleyball</option>
            <option value="Rock Climbing"> Rock Climbing</option>
            <option value="Horseback Riding"> Horseback Riding</option>
          </select>
        </div>

        {/* DATE- CALENDAR DATE */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            required
            value={game.gameDate}
            onChange={handleChangeDate}
            className="form-control"
          />
        </div>

        {/* DURATION- SET TIME */}
        <div className="form-group">
          <label>Game Duration</label>
          <input
            type="text"
            required
            value={game.gameDuration}
            onChange={handleChangeDuration}
            className="form-control"
            placeholder="Set game's duration"
          />
        </div>

        <div>
          <button type="submit" value="Post" className="btn btn-primary">
            {" "}
            Update{" "}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            {" "}
            Cancel{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GameEdit;
