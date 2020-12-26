import React, { Component } from "react";
import { connect } from "react-redux";
import { filterGames } from "../../actions";


class Filter extends Component {

    render() {
    return this.props.filteredGames ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-governorate">
          Filter{" "}
          <select
            value={this.props.Governorates}
            onChange={(e) =>
              this.props.filterGames(this.props.games, e.target.value)
            }
          >
            <option value="">ALL</option>
            <option value="Irbid">Irbid</option>
            <option value="Ajloun">Ajloun</option>
            <option value="Jerash">Jerash</option>
            <option value="Mafraq">Mafraq</option>
            <option value="Amman">Amman</option>
            <option value="Zarqa">Zarqa</option>
          </select>
        </div>
      </div>
    );
 }

}

const mapStateToProps = state => ({
    games: state.games.games,
    Governorates: state.games.Governorates,
    filteredGames: state.filteredItems,
})

export default connect(mapStateToProps, {filterGames})(Filter);
