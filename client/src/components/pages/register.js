import React, { useState } from "react";
import { registerUser } from "../../actions";
import { connect } from "react-redux";

const Register = ({ registerUser, isLoggedIn }) => {
  let [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    city: "",
    phoneNo: "",
    birthday: "",
    password: "",
  });

  let {
    firstName,
    lastName,
    username,
    email,
    city,
    phoneNo,
    birthday,
    password,
  } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onsubmit = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      email === "" ||
      city === "" ||
      phoneNo === "" ||
      birthday === "" ||
      password === ""
    ) {
      console.log("Please fill all required fields");
    } else {
      registerUser(
        firstName,
        lastName,
        username,
        email,
        city,
        phoneNo,
        birthday,
        password
      );
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form action="/login" method="get">
        <h3>Register</h3>
        <input
          onChange={(e) => onChange(e)}
          type="text"
          name="firstName"
          value={firstName}
          required
          placeholder="first name"
        ></input>
        <br />

        <input
          onChange={(e) => onChange(e)}
          type="text"
          name="lastName"
          value={lastName}
          required={true}
          placeholder="last name"
        ></input>
        <br />

        <input
          onChange={(e) => onChange(e)}
          type="text"
          name="username"
          value={username}
          required={true}
          placeholder="username"
        ></input>
        <br />

        <input
          onChange={(e) => onChange(e)}
          type="email"
          name="email"
          value={email}
          required={true}
          placeholder="email"
        ></input>
        <br />

        <input
          onChange={(e) => onChange(e)}
          type="text"
          name="city"
          value={city}
          required={true}
          placeholder="city"
        ></input>
        <br />
        <label>Phone number</label>
        <br></br>

        <input
          onChange={(e) => onChange(e)}
          type="tel"
          placeholder="07X-XXXX-XXX"
          maxLength="10"
          name="phoneNo"
          value={phoneNo}
          required={true}
        ></input>
        <br />
        <label>Birthday</label>
        <br></br>

        <input
          onChange={(e) => onChange(e)}
          type="date"
          name="birthday"
          value={birthday}
          required={true}
        ></input>
        <br />
        <br></br>

        <input
          onChange={(e) => onChange(e)}
          type="password"
          name="password"
          value={password}
          required={true}
          placeholder="password"
        ></input>
        <br />
        <br />
        <button
          type="submit"
          onClick={() => onsubmit()}
          className="btn btn-primary"
        >
          submit
        </button>
        <br />
        <p>
          Already have an account? <a href="/land">Sign in</a>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.isLoggedIn,
});

export default connect(mapStateToProps, { registerUser })(Register);
