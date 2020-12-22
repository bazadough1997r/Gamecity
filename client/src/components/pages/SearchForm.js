import React, { Component } from "react";

export default class SearchForm extends Component {
  searchHandler = (e) => {
    window.addEventListener("keydown", function (e) {
      var result =[];
      window.find(e.target.value);
      if (e.keyCode === 13) {
        e.preventDefault();
        result.push(e.target.value)
        // window.find(e.target.value);
      }
      console.log(result)
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
