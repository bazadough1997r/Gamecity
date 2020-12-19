import React, { useState, useEffect } from "react";
import { get, patch } from 'axios';

function GameEdit(props) {

  const initialState = { gameName: '', content: '' }
  const [game, setGame] = useState(initialState)

  useEffect(function() {
    async function getGame() {
      try {
        const response = await get(`/api/games/${props.match.params._id}`);
        setGame(response.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getGame();    
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();
    async function updateGame() {
      try {
        await patch(`/api/games/${game._id}`, game);
        props.history.push(`/games/${game._id}`);        
      } catch(error) {
        console.log(error);
      }
    }
    updateGame();
  }

  function handleChange(event) {
    setGame({...game, [event.target.name]: event.target.value})
  }

  function handleCancel() {
    props.history.push(`/games/${game._id}`);
  }

  return (
    <div>
      <h1>Edit {game.gameName}</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Game name</label>
          <input type="text" name="gameName" value={game.gameName} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" rows="5" value={game.content} onChange={handleChange} className="form-control" />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default GameEdit;