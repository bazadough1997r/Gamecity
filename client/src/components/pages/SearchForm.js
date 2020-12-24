import React, { Component } from "react";

export default class SearchForm extends Component {
  // searchHandler = (e) => {
  //   window.addEventListener("keydown", function (e) {
  //     if (e.keyCode === 13) {
  //       e.preventDefault();
  //       if (window.find(e.target.value) === false) {
  //         alert(e.target.value + " does not exist in this page!");
  //       } else {
  //         window.find(e.target.value);
  //       }
  //     }
  //   });
  // };

  searchHandler = (e) => {
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        if (window.find(e.target.value) === false) {
          alert(e.target.value + " does not exist in this page!");
        }
        if (window.find(e.target.value) === true) {
        }
      }
    });
  };

  render() {
    return (
      <div>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="searchText"
          onClick={this.searchHandler}
        />
      </div>
    );
  }
}
