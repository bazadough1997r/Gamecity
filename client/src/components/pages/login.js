import React, { useState } from 'react';
import { loginUser } from '../../actions';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';


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

    const onsubmit = () =>{
        if(email === "" || password === ""){
             return swal("Please fill all required fields")
        }else 
        loginUser(email, password)
        // swal({
        //     title: "Login succssesfully!",
        //     icon: "success",
        //   });
    }

    return (
        <div style={{ textAlign:"center" }}>
            <h3>Login</h3>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="email" name = "email" value={email} placeholder="email address"></input>
            <br/>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="password" name = "password" value={password} placeholder="password"></input>
            <br/>
            <br/>
            <button type= "submit" onClick= {()=> onsubmit()} >Login</button>
            <p>you don't have an account? <a href="/addUser">signup</a></p>
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