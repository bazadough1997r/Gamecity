import React, { useState, useEffect } from "react";
import { get,put} from 'axios';
import { Link } from "react-router-dom";

const ProfileEdit = (props) => {
//     console.log(isLoggedIn,"isLoggedIn")
 
    
   
    const initialState = {
           firstName: "",
           lastName: "",
           username: "",
           city: "",
           phoneNo: "",
           birthday: "",
           
       }

       const [user,setUser]= useState(initialState);
//
  useEffect(function() {
    async function getProfile() {
      try {
        const response = await get(`/addUser/profile/${props.match.params.email}`);
        setUser(response.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getProfile();    
  }, [props]);



  async function handleSubmit(event) {
    console.log(props.match.params.email,"from ")
     event.preventDefault();
     console.log("user#1", user);

      try {
        await put(`/addUser/profile/editProfile/${props.match.params.email}`, user);
      } catch(error) {
        console.log(error);
      }

    }



  function handleChangefirstName(event) {
    setUser({ ...user, firstName: event.target.value });
  }

  function handleChangelastName(event) {
    setUser({ ...user, lastName: event.target.value });
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

 

 

  return (
    <div style={{ textAlign:"center" }} ><form  action="/login"  >
    <h2>Edit Profile</h2>
        <h3>Register</h3>
        <input onChange={handleChangefirstName} type="text" name = "firstName" value={user.firstName}  placeholder="first name"></input>
        <br/>
       
        <input onChange = {handleChangelastName} type="text" name = "lastName" value={user.lastName}  placeholder="last name"></input>
        
       
        <br/>
      
        <input onChange = {handleChangecity} type="text" name = "city" value={user.city}  placeholder="city"></input>
        <br/>
        <label>Phone number</label><br></br>
       
        <input onChange = { handleChangephoneNo} type="tel"  placeholder="07X-XXXX-XXX"  maxLength="10" name = "phoneNo" value={user.phoneNo} ></input>
        <br/>
        <label>Birthday</label><br></br>
        
        <input onChange = {handleChangebirthday} type="date" name = "birthday" value={user.birthday} ></input>
        <br/>
        <br></br>
        
        <br/>
        <br/>
        <button type="submit" value="Post" className="btn btn-primary"  onClick= {(e)=>handleSubmit (e)}>Save </button>
        <Link  to={{ pathname: `/profile/${window.localStorage.email}` }} className="btn btn-primary">Back</Link>

        <br/>
       
        </form>
    </div>
)
}

export default ProfileEdit; 
