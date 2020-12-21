// import React, { useState, useEffect } from "react";
// import { get, patch } from 'axios';

// function ProfileEdit(props) {

//   const initialState = { 
//       username: '',
//       firstName: '',
//       lastName: '',
//       birthday: '',
//       city: '',
//       phoneNo: ''
//      }
//   const [user, setUser] = useState(initialState)

//   useEffect(function() {
//     async function getProfile() {
//       try {
//         const response = await get(`/api/profile/${props.match.params._id}`);
//         setUser(response.data);        
//       } catch(error) {
//         console.log(error);
//       }
//     }
//     getProfile();    
//   }, [props]);

//   function handleSubmit(event) {
//     event.preventDefault();
//     async function updateProfile() {
//       try {
//         await patch(`/api/profile/${user._id}`, user);
//         props.history.push(`/profile/${user._id}`);        
//       } catch(error) {
//         console.log(error);
//       }
//     }
//     updateProfile();
//   }

//   function handleChange(event) {
//     setUser({...profile, [event.target.name]: event.target.value
//     })
//   }

//   function handleCancel() {
//     props.history.push(`/profiles/${user._id}`);
//   }

//   return (
//     <div>
//       <h1>Edit</h1>
//       <hr/>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>profile name</label>
//           <input type="text" name="profileName" value={profile.profileName} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Content</label>
//           <textarea name="content" rows="5" value={profile.content} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="btn-group">
//           <button type="submit" className="btn btn-primary">Update</button>
//           <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ProfileEdit;