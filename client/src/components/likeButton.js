import React, { Component } from 'react';

export default class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = { like: 0, join: 0 };
    }
    render() {
      return (
        <div className="App">
          <button
            onClick={() => {
            this.setState({ like: this.state.like + 1 });}}>Likes: {this.state.like}</button>
          <button
            onClick={() => {
            this.setState({ join: this.state.join + 1 });
            }}
          >Join: {this.state.join}</button>
        </div>
      );
    }
  }