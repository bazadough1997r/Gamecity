import React, { useState, useEffect } from "react";
import { get, patch } from 'axios';
import { storage } from "../firebase/index"

const ProfileEdit = ({ registerUser, isLoggedIn,props}) => {
    console.log(isLoggedIn,"isLoggedIn")
 
    const [image , setImage,user,setUser]= useState(null);
    const [ url,setURL]= useState(null);
       let [data, setData] = useState ({
           firstName: "",
           lastName: "",
           username: "",
           email: "",
           city: "",
           phoneNo: "",
           birthday: "",
           password: ""
       })
       let { firstName, lastName, username, email, city, phoneNo, birthday, password  } = data

  useEffect(function() {
    async function getProfile() {
      try {
        const response = await get(`/${props.match.params.email}/editProfile`);
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
        await patch(`/${user.email}/editProfile`, user);
        props.history.push(`/${user.email}/editProfile`);        
      } catch(error) {
        console.log(error);
      }
    }
    updateProfile();
  }

//   function handleChange(event) {
//     setUser({...user, [event.target.name]: event.target.value
//     })
//   }


  const onChange = (e)=> {

    setData({...data, [e.target.name]: e.target.value})
}
// function handleUpload(e){

//     console.log("imageeeeeeeee",image)
//            e.preventDefault();
//           const uploadTask = storage.ref(`/images/${image.name}`).put(image);
//           uploadTask.on("state_changed",(snapshot) => {},
//             (error) => {
//               console.log(error, "error");
//             },
//             () => {
//               storage
//                 .ref("images")
//                 .child(image.name)
//                 .getDownloadURL()
//                 .then((url) => {
//                   setURL(url)
//                   console.log(url)
//                 });
//             }
//           );     
//   }

 

  return (
    <div style={{ textAlign:"center" }} ><form  action="/login"  >
    <h2>Edit Profile</h2>
        <h3>Register</h3>
        <input onChange = {(e)=> onChange(e) } type="text" name = "firstName" value={firstName}  required placeholder="first name"></input>
        <br/>
       
        <input onChange = {(e)=> onChange(e) } type="text" name = "lastName" value={lastName} required={true} placeholder="last name"></input>
        <br/>
        
        <input onChange = {(e)=> onChange(e) } type="text" name = "username" value={username} required={true} placeholder="username"></input>
        <br/>
       
        <input onChange = {(e)=> onChange(e) } type="email" name = "email" value={email} required={true} placeholder="email"></input>
        <br/>
      
        <input onChange = {(e)=> onChange(e) } type="text" name = "city" value={city} required={true} placeholder="city"></input>
        <br/>
        <label>Phone number</label><br></br>
       
        <input onChange = {(e)=> onChange(e) } type="tel"  placeholder="07X-XXXX-XXX"  maxLength="10" name = "phoneNo" value={phoneNo} required={true}></input>
        <br/>
        <label>Birthday</label><br></br>
        
        <input onChange = {(e)=> onChange(e) } type="date" name = "birthday" value={birthday} required={true}></input>
        <br/>
        <br></br>
        
        <input onChange = {(e)=> onChange(e) } type="password" name = "password" value={password}   required={true} placeholder="password"></input>
        <br/>
        <br/>
        
        <button type= "submit" onClick= {()=> handleSubmit()} className="btn btn-primary">submit</button>
        <br/>
       
        </form>
    </div>
)
}

export default ProfileEdit;