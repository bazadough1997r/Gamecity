import React, { Component } from "react";

export default class SearchForm extends Component {
  searchHandler = (e) => {
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        window.find(e.target.value);
      } else if(!(e.target.value)) {
        console.log("not found!!")
      }
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          className="nav-item"
          name="searchText"
          placeholder="Search.. "
          onClick={this.searchHandler}
        />
      </div>
    );
  }
}
