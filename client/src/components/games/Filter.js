// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { filterGames, filterByType } from "../../actions";


// class Filter extends Component {

//     render() {
//       // console.log(this.props.Governorates, "this.props.Governorates")
//       // console.log(this.props.filteredGames, "this.props.filteredGames")
//       // console.log(this.props.games, "this.props.games")
//     return !this.props.filteredGames ? (
//       <div>Loading...</div>
//     ) : (
//       <div className="filter">
//         <div className="filter-governorate">
//           Governorates:{" "}
//           <select
//             value={this.props.Governorates}
//             onChange={(e) =>
//               this.props.filterGames(this.props.games, e.target.value)
//             }
//           >
//             <option value="">ALL</option>
//             <option value="Irbid">Irbid</option>
//             <option value="Ajloun">Ajloun</option>
//             <option value="Jerash">Jerash</option>
//             <option value="Mafraq">Mafraq</option>
//             <option value="Balqa">Balqa</option>
//             <option value="Amman">Amman</option>
//             <option value="Zarqa">Zarqa</option>
//             <option value="Madaba">Madaba</option>
//             <option value="Karak">Karak</option>
//             <option value="Tafila">Tafila</option>
//             <option value="Ma'an">Ma'an</option>
//             <option value="Aqaba">Aqaba</option>
//           </select>
          
//         </div>
//         <div className="filter-type">
//           Games:{" "}
//           <select
//             value={this.props.type}
//             onChange={(e) =>
//               this.props.filterByType(this.props.filteredGames, e.target.value)
//             }
//           >
//             <option value="">ALL</option>
//             <option value="Paintball">Paintball</option>
//             <option value="Football">Football</option>
//             <option value="Karting">Karting</option>
//             <option value="Basketball">Basketball</option>
//             <option value="Laser Tag">Laser Tag</option>
//             <option value="Vollyball">Vollyball</option>
//             <option value="Rock Climbing">Rock Climbing</option>
//             <option value="Horseback Riding">Horseback Riding</option>
//             <option value="Handball">Handball</option>
//             <option value="Tafila">Tennis</option>
//             <option value="Running">Running</option>
//             <option value="Other..">Other..</option>
//           </select>
          
//         </div>
//       </div>
//     );
//  }

// }

// const mapStateToProps = state => ({
//    type: state.games.type,
//     games: state.games.games,
//     Governorates: state.games.Governorates,
//     filteredGames: state.games.filteredItems,
// })

// export default connect(mapStateToProps, {filterGames, filterByType})(Filter);
