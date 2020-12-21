import React, { useState } from 'react';


    const Signup = () => {
        let [data, setData] = useState ({
            
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            city: "",
            phoneNo:"",
            Birthday:"",
            password: ""
        })
        let {firstname,lastname, username, email,city,phoneNo,Birthday ,password} = data
        const onChange = (e)=> {
            setData({...data, [e.target.name]: e.target.value})
            console.log(data)
        }
        const onsubmit = () =>{
            console.log(data)
        }

 
  return(
        <div>
            <form >
                <div>
                <label >FirstName</label>
                <input type="text" 
                placeholder="Enter FirstName"
                name = "firstname" 
                value={firstname}
                onChange = {(e)=> onChange(e) }
                />
                </div>
                <div>
                <label >LastName</label>
                <input type="text" 
                onChange = {(e)=> onChange(e) }
                placeholder="Enter LastName"
                name = "lastname" 
                value={lastname}
                />
                </div>
                <div>
                <label >UserName</label>
                <input type="text" 
                name = "username" 
                value={username}
                 onChange = {(e)=> onChange(e) }
                placeholder="UserName"
                />
                </div>
                <div >
                    <label >Email</label>
                    <input type="email" 
                     placeholder="Email"
                     name = "email" 
                     value={email}
                     onChange = {(e)=> onChange(e) }
                    />
                </div>
                <div >
                    <label >City</label>
                    <input type="text" 
                     placeholder="city"
                     name = "city" 
                     value={city}
                     onChange = {(e)=> onChange(e) }
                    />
                </div>
                <div >
                    <label >PhoneNo</label>
                    <input type="text" 
                    placeholder="PhoneNo"
                    name = "phoneNo" 
                    value={phoneNo}
                    onChange = {(e)=> onChange(e) }
                    />
                </div>
                <div >
                    <label >Birthday</label>
                    <input type="Date" 
                    placeholder="Birthday"
                    name = "Birthday" 
                    value={Birthday}
                    onChange = {(e)=> onChange(e) }
                    />
                </div>
                <div >
                    <label >Password</label>
                    <input type="password" 
                    placeholder="password"
                    name = "password" 
                    value={password}
                    onChange = {(e)=> onChange(e) }
                    />
                </div>
                <button 
                    type="submit" 
                    onClick= {()=> onsubmit()}
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Signup;
