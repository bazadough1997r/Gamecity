import React, { useState } from 'react';
import  { registerUser } from '../../actions';
import { connect } from 'react-redux';
// import ReduxForm from './registerForm1'
import swal from 'sweetalert';
// import swal from '@sweetalert/with-react'



// import { Redirect } from 'react-router-dom';


const Register = ({ registerUser, isLoggedIn }) => {
    // console.log(isLoggedIn,"isLoggedIn")

    // if(isLoggedIn) return <Redirect to="/"/>
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


    const onChange = (e)=> {

        setData({...data, [e.target.name]: e.target.value})
        // console.log([e.target.value])
    }

    const onsubmit = () =>{
    //     if (username.length<5) {
    //     return swal(
    //         "Please fill your username and try to make it 5 characters or more!");
    //     }
    //     if (phoneNo.length<10) {
    //         return swal
    //            ( "Please enter your phone number,  10 numbers!");
    //         }
    //    if (password.length<5) {
    //     return swal
    //         ("Please enter your password and try to make it more than 5 characters!");        }
    
    //     else {
       
        registerUser(firstName, lastName, username, email, city,phoneNo, birthday, password)
        
        
        
    }
    

    return (
        <div><form data-toggle="validator" role="form">
            <h1>REGISTER PAGE</h1>
            <label>First name</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="text" name = "firstName" value={firstName}  required></input>
            <br/>
            <label>Last name</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="text" name = "lastName" value={lastName} required={true}></input>
            <br/>
            <label>username</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="text" name = "username" value={username} required={true}></input>
            <br/>
            <label>Email</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="email" name = "email" value={email} required={true}></input>
            <br/>
            <label>city</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="text" name = "city" value={city} required={true}></input>
            <br/>
            <label>Phone No.</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="number" name = "phoneNo" value={phoneNo} required={true}></input>
            <br/>
            <label>Birthday</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="date" name = "birthday" value={birthday} required={true}></input>
            <br/>
            <label>Password</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="password" name = "password" value={password}   required={true}></input>
            <br/>
            <br/>
            <button type= "submit" onClick= {()=> onsubmit()}>submit</button>
            <br/>
            <p>Already have an account? <a href="/login">Sign in</a></p>
            </form>
        </div>
    )
    }


// function mapStateToProps(state) {
//     console.log(state,"fsdfsd")
//   }

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
    
})


export default connect(mapStateToProps, {registerUser})(Register);