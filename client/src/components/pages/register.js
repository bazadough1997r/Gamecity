import React, { useState } from 'react';

const Login = () => {
    let [data, setData] = useState ({
        email: "",
        password: ""
    })

    let { email, password } = data


    const onChange = (e)=> {

        setData({...data, [e.target.name]: e.target.value})
        console.log([e.target.value])
    }

    const onsubmit = () =>{
        console.log(data)
    }

    


    return (
        <div>
            <label>Email</label>
            <br/>
            <input onChange = {(e)=> onChange(e) } type="email" name = "email" value={email}></input>
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

export default Login;