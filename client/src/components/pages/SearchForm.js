import React, { Component } from "react";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }

  componentDidMount() {
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          if(e.target.value === ""){
            alert("please fill the search bar")
          }
          window.find(e.target.value)
        }    
      },
      false,
    );
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="form-control-sm"
          name="searchText"
          placeholder="Search.. "
          style = {{borderRadius: "0.25rem"}}
          onClick={this.searchHandler}
        />
      </div>
    );
  }
}

