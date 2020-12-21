import React, { Component } from "react";
import { setGames } from "../../actions/index";
import { connect } from "react-redux";

export class SearchForm extends Component {
  onChange = (e) => {
    this.props.setGames(e.target.value);
  };

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
        <button type="submit" className="nav-item">
          Search
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  games: state.gameName, //lazim a3mil access sah
});

export default connect(mapStateToProps, { setGames })(SearchForm);
