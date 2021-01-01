import React, { useState } from "react";
import { loginUser } from "../../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

const Login = ({ loginUser, isLoggedIn }) => {
  let [data, setData] = useState({
    email: "",
    password: "",
  });

  if (isLoggedIn) return <Redirect to="/games" />;

  let { email, password, username } = data;
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || username === "") {
      return swal("Please fill all required fields");
    } else loginUser(email, password, username);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Login</h3>
      <br />
      <input
        onChange={(e) => onChange(e)}
        type="username"
        name="username"
        value={username}
        placeholder="username"
      ></input>
      <br />
      <br />
      <input
        onChange={(e) => onChange(e)}
        type="email"
        name="email"
        value={email}
        placeholder="email address"
      ></input>
      <br />
      <br />
      <input
        onChange={(e) => onChange(e)}
        type="password"
        name="password"
        value={password}
        placeholder="password"
      ></input>
      <br />
      <br />
      <button type="submit" onClick={(e) => onsubmit(e)}>
        submit
      </button>
      <p>
        Register new account <a href="/addUser">SignUp</a>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.isLoggedIn,
});
export default connect(mapStateToProps, { loginUser })(Login);
