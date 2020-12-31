import React, { useState, useEffect } from "react";
import { get, patch } from 'axios';


const ProfileEdit = (props) => {
//     console.log(isLoggedIn,"isLoggedIn")
 
    
   
    const initialState = {
           firstName: "hh",
           lastName: "",
           username: "",
           email: "",
           city: "",
           phoneNo: "",
           birthday: "",
           password: ""
       }

       const [user,setUser]= useState(initialState);
//
  useEffect(function() {
    async function getProfile() {
      try {
        const response = await get(`/addUser/profile/"+${props.match.params.email}`);
        setUser(response.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getProfile();    
  }, [props]);



  function handleSubmit(event) {
    event.preventDefault();
    async function updateProfile(user) {
      try {
        await patch(`/profile/editProfile+${props.match.params.email}`, user);
        props.history.push(`/editProfile/${props.match.params.email}`);        
      } catch(error) {
        console.log(error);
      }
    }
    updateProfile();
  }



  function handleChangefirstName(event) {
    setUser({ ...user, firstName: event.target.value });
  }

  function handleChangelastName(event) {
    setUser({ ...user, lastName: event.target.value });
  }

  function handleChangeusername(event) {
    setUser({ ...user, username: event.target.value });
  }

  function handleChangeemail(event) {
    setUser({ ...user, email: event.target.value });
  }

  function handleChangecity(event) {
    setUser({ ...user, city: event.target.value });
  }

  
  function handleChangephoneNo(event) {
    setUser({ ...user, phoneNo: event.target.value });
  }


  
  function handleChangebirthday(event) {
    setUser({ ...user, birthday: event.target.value });
  }

  function handleChangepassword(event) {
    setUser({ ...user, password: event.target.value });
  }

 

  return (
    <div style={{ textAlign:"center" }} ><form  action="/login"  >
    <h2>Edit Profile</h2>
        <h3>Register</h3>
        <input onChange={handleChangefirstName} type="text" name = "firstName" value={user.firstName}  required placeholder="first name"></input>
        <br/>
       
        <input onChange = {handleChangelastName} type="text" name = "lastName" value={user.lastName} required={true} placeholder="last name"></input>
        <br/>
        
        <input onChange = {handleChangeusername } type="text" name = "username" value={user.username} required={true} placeholder="username"></input>
        <br/>
       
        <input onChange = {handleChangeemail} type="email" name = "email" value={user.email} required={true} placeholder="email"></input>
        <br/>
      
        <input onChange = {handleChangecity} type="text" name = "city" value={user.city} required={true} placeholder="city"></input>
        <br/>
        <label>Phone number</label><br></br>
       
        <input onChange = { handleChangephoneNo} type="tel"  placeholder="07X-XXXX-XXX"  maxLength="10" name = "phoneNo" value={user.phoneNo} required={true}></input>
        <br/>
        <label>Birthday</label><br></br>
        
        <input onChange = {handleChangebirthday} type="date" name = "birthday" value={user.birthday} required={true}></input>
        <br/>
        <br></br>
        
        <input onChange = {handleChangepassword} type="password" name = "password" value={user.password}   required={true} placeholder="password"></input>
        <br/>
        <br/>
        <button type="submit" value="Post" className="btn btn-primary">
            {" "}
            Update{" "}
          </button>
        {/* <button type= "submit" onClick= {()=>handleSubmit ()} className="btn btn-primary">submit</button> */}
        <br/>
       
        </form>
    </div>
)
}

export default ProfileEdit;