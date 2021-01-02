import React, { useState } from 'react';
import  { registerUser } from '../../actions';
import { connect } from 'react-redux';
import { storage } from "../firebase/index"
<<<<<<< HEAD



const Register = ({ registerUser, isLoggedIn }) => {
    console.log(isLoggedIn, "isLoggedIn")
   
    const [image, setImage] = useState(null);
    const [url, setURL] = useState(null);
    let [data, setData] = useState({
=======
const Register = ({ registerUser, isLoggedIn}) => {
    console.log(isLoggedIn,"isLoggedIn")
 const [image , setImage]= useState(null);
 const [ url,setURL]= useState(null);
    let [data, setData] = useState ({
>>>>>>> 694b63233bc4082926f654d3accd1a7c7afc5dca
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        city: "",
        phoneNo: "",
        birthday: "",
        password: "",
        url:""
    })
<<<<<<< HEAD

   

    let { firstName, lastName, username, email, city, phoneNo, birthday, password } = data


    const onChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value })
=======
    let { firstName, lastName, username, email, city, phoneNo, birthday, password  } = data
    const onChange = (e)=> {
        setData({...data, [e.target.name]: e.target.value})
>>>>>>> 694b63233bc4082926f654d3accd1a7c7afc5dca
    }
    function handleChange(e)  {
        if (e.target.files[0]) {
<<<<<<< HEAD
            setImage(
                e.target.files[0],
            );
        } else console.log("error in onchangeimg");

    }


    function handleUpload(e) {
        
        
        e.preventDefault();

        console.log("imageeeeeeeee", image)
        if(image===null){
            alert("You should choose File First")
        }else{
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on("state_changed", (snapshot) => { },
            (error) => {
                console.log(error, "error");
            },


            () => {
                storage
=======
          setImage(
             e.target.files[0],
          );
         } else console.log("error in onchangeimg");
     }
    function handleUpload(e){
        console.log("imageeeeeeeee",image)
        e.preventDefault();
              const uploadTask = storage.ref(`/images/${image.name}`).put(image);
              uploadTask.on("state_changed",(snapshot) => {},
                (error) => {
                  console.log(error, "error");
                },
                () => {
                  storage
>>>>>>> 694b63233bc4082926f654d3accd1a7c7afc5dca
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                      setURL(url)
                      console.log(url)
                    });
<<<<<<< HEAD
            }
        );
    }}






    const onsubmit = () => {
        if (firstName === "" || lastName === "" || username === "" || email === "" || city === "" || phoneNo === "" || birthday === "" || password === "") {
=======
                }
              );     
      }
    const onsubmit = () =>{
        if(firstName === "" || lastName === "" || username === "" || email === "" || city === "" || phoneNo === "" || birthday === "" || password === ""){
>>>>>>> 694b63233bc4082926f654d3accd1a7c7afc5dca
            console.log("Please fill all required fields");
        } else {
        registerUser(firstName, lastName, username, email, city,phoneNo, birthday, password,url)
        }   
    }
    return (
        <div style={{ textAlign:"center" }} ><form  action="/land"  >
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
            <label>Add Image </label>
            <input
                      type = "file"
                      onChange = {handleChange}/>
                      <button onClick = {handleUpload}>Upload</button>
                      <br />
                      <img width="50px" src = {url || "http://via.placeholder.com/100x150"} alt = "placeholder" />
                  <br />
            <button type= "submit" onClick= {()=> onsubmit()} className="btn btn-primary">submit</button>
            <br/>
            <p>Already have an account? <a href="/land">Sign in</a></p>
            </form>
        </div>
    )
    }
const mapStateToProps = state => ({
    isLoggedIn: state.authReducer.isLoggedIn
})
export default connect(mapStateToProps, {registerUser})(Register);