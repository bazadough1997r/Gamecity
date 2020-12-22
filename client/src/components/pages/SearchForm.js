import React, { Component } from "react";
// import {searchGame} from "../../actions/index";
// import { connect } from "react-redux";
// import axios from "axios";

export default class SearchForm extends Component {
//   onChange = (e) => {
//     // this.props.searchGame(e.target.value);
//     dispatch(searchGame(5))
//   };
  handleSearch() {
    // dispatch(searchGame(game._id))
    // axios
    //   .delete(`/api/games/${game._id}`)
    //   .then(function () {
    //     dispatch(searchGame(game._id));
    //     props.history.push("/");
    //   })
    //   .catch(function (error) {
    //     console.log(error, "error from search -RawanB");
    //   });
  }


  render() {
    return (
      <div>
        <input
          type="text"
          className="nav-item"
          name="searchText"
          placeholder="Search.. "
          onChange={this.onChange}
        />
        <button type="submit" className="nav-item"  onClick={this.handleSearch} >
          Search
        </button>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   games: dispatch.gameName, //lazim a3mil access sah
// });

// export default connect(mapDispatchToProps, { searchGame })(SearchForm);
