import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Collapse } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { loginUser } from "../../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

const useStyles = makeStyles({
  root: {
    width: 430,
    height: 550,
    background: "rgba(0,0,0,0.5)",
    alignContent: "center"
  },
  title: {
    fontFamily: "Century Gothic",
    fontWeight: "semi-bold",
    fontSize: "2rem",
    color: "#fff"
  },
  signUp: {
    fontFamily: "Century Gothic",
    fontSize: "1rem",
    color: "#fff",
  },
  media: {
    height: 225,
  },
  description: {
    fontFamily: "Century Gothic",
    fontSize: "1rem",
    color: "#ddd"      
  },
  textField: {
    backgroundColor: "#fff"
  },
  button: {
    fontFamily: "Century Gothic",
    fontSize: "1rem",
    backgroundColor: "#fff"
  }
});


const Login = ({ loginUser, isLoggedIn }, checked) => {
  let [data, setData] = useState({
    email: "",
    password: "",
  });

  const classes = useStyles();

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
  <Collapse in = {checked} {...(checked ? { timeout: 1000 } : {})} >
   <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image= {process.env.PUBLIC_URL + `/Images/login.jpg`}
        title="Login"
      />
      <CardContent>
        {/* <Typography 
          gutterBottom 
          variant="h5" 
          component="h1" 
          className = {classes.title}
          >
            Login
          </Typography> */}
              <TextField 
                id="standard-size-small" 
                variant="outlined"
                className = {classes.textField} 
                style = {{width: 390}}
                onChange={(e) => onChange(e)}
                type="username"
                name="username"
                value={username}
                placeholder="username"
                />
              <br /><br />
              <TextField 
                id="standard-size-small" 
                variant="outlined" 
                className = {classes.textField}
                style = {{width: 390}}
                onChange={(e) => onChange(e)}
                type="email"
                name="email"
                value={email}
                placeholder="email address"
                />
              <br /><br />
              <TextField 
                id="standard-size-small" 
                variant="outlined"
                className = {classes.textField}
                style = {{width: 390}} 
                onChange={(e) => onChange(e)}
                type="password"
                name="password"
                value={password}
                placeholder="password"
                />
              <br /><br />       
              <Button 
                style = {{width: 390}}
                type="submit" onClick={(e) => onsubmit(e)} className = {classes.button}>
                Submit
              </Button>
              <br />
              <Typography className = {classes.signUp} style = {{textAlign: "center"}}>
                Don't have an account? <a href="/addUser">SignUp</a>
              </Typography>
      </CardContent>
    </Card>
    </Collapse>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.isLoggedIn,
});
export default connect(mapStateToProps, { loginUser })(Login);
