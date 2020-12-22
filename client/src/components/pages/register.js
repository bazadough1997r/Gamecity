import React, { useState } from 'react';
import  { registerUser } from '../../actions';
import { connect } from 'react-redux';


// import { Redirect } from 'react-router-dom';


const Register = (registerUser,isLoggedIn) => {
    console.log(isLoggedIn,"isLoggedInnnn")

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
        console.log([e.target.value])
    }

    const onsubmit = () =>{
        // if(firstName === "" || lastName === "" || username === "" || email === "" || city === "" || phoneNo === "" || birthday === "" || password === ""){
        //     return alert("Fill all empty fields please!")
        // } else 
        console.log(data)
        registerUser(firstName, lastName, username, email, city,phoneNo, birthday, password)
    }


    return (
        <div>
              <h1>REGISTER PAGE</h1>
            <label>First name</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="text" name = "firstName" value={firstName}></input>
            <br/>
            <label>Last name</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="text" name = "lastName" value={lastName}></input>
            <br/>
            <label>username</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="text" name = "username" value={username}></input>
            <br/>
            <label>Email</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="email" name = "email" value={email}></input>
            <br/>
            <label>city</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="text" name = "city" value={city}></input>
            <br/>
            <label>Phone No.</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="number" name = "phoneNo" value={phoneNo}></input>
            <br/>
            <label>Birthday</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="date" name = "birthday" value={birthday}></input>
            <br/>
            <label>Password</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="password" name = "password" value={password}></input>
            <br/>
            <br/>
            <button type= "submit" onClick= {()=> onsubmit()}>submit</button>
        </div>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, {registerUser})(Register);