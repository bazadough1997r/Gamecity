// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import axios from "axios";

// export default function Filter() {
//   const [games, setGames] = useState([]);
//   const dispatch = useDispatch();

//     function handleChangeGovernorates(e) {
//       console.log(e.target.value, "lsning to change in filter#1")
//     }

//     function handleChangeGames(e) {
//       console.log(e.target.value, "lsning to change in filter#2")
//     }


//     useEffect(function () {
//       async function getGames() {
//         try {
//           const response = await axios.get("/api/games");
//           setGames(response.data);
//         } catch (error) {
//           console.log("error", error);
//         }
//       }
//       getGames();
//     }, []);

//     return (
//       <div>
//         <div>
//           Governorates:
//           <select onChange={handleChangeGovernorates}>
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

//         <div>
//           Games:{" "}
//           <select onChange={handleChangeGames}>
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
//   }

