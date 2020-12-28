import React, { useState } from 'react';
import { loginUser } from '../../actions';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


const Login = ( {loginUser, isLoggedIn} ) => {
      
   console.log(isLoggedIn, "isLoggedIn")
    let [data, setData] = useState ({
        email: "",
        password: ""
    })

  if(isLoggedIn) return <Redirect to="/games"/>

    let {  email, password  } = data
    const onChange = (e)=> {
        setData({...data, [e.target.name]: e.target.value})
    }

    const onsubmit = (e) =>{
        e.preventDefault()
        if(email === "" || password === ""){
            alert("Fill all feilds")
        }else 
        loginUser(email, password)
    }

    


    return (
        <div>
            <h1>LOGIN PAGE</h1>
            <label>Email</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="email" name = "email" value={email}></input>
            <br/>
            <label>Password</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="password" name = "password" value={password}></input>
            <br/>
            <br/>
            <button type= "submit" onClick= {(e)=> onsubmit(e)}>submit</button>
            <p>Register new account <a href="/addUser">SignUp</a></p>

        </div>
    )
}


// function mapStateToProps(state) {
//     console.log(state,"prrrrr")
//   }

const mapStateToProps = state =>({
    isLoggedIn: state.authReducer.isLoggedIn

})
export default connect(mapStateToProps, {loginUser})(Login);