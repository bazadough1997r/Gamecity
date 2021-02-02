import React, { useState } from "react";
import { registerUser } from "../../actions";
import { connect } from "react-redux";
import { storage } from "../firebase/index";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: "200vh",
    maxWidth: "500vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "../Images/registerProfile.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    alignContent: "center",
  },
  paper: {
    margin: theme.spacing(-1, 5),
    maxHeight: "200vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
  },
}));

const Register = ({ registerUser, isLoggedIn }) => {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);

  let [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    city: "",
    phoneNo: "",
    birthday: "",
    password: "",
    url: "",
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

  function handleChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else console.log("error in onchangeimg");
  }

  function handleUpload(e) {
    console.log("image from the register", image);
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error, "error");
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setURL(url);
            console.log(url);
          });
      }
    );
  }

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
        password,
        url
      );
    }
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              size="small"
              label="First Name"
              autoFocus
              onChange={(e) => onChange(e)}
              type="text"
              name="firstName"
              value={firstName}
            />

            <TextField
              variant="outlined"
              label="Last Name"
              margin="normal"
              required
              fullWidth
              onChange={(e) => onChange(e)}
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Last Name"
              size="small"
            />

            <TextField
              variant="outlined"
              label="Username"
              margin="normal"
              required
              fullWidth
              onChange={(e) => onChange(e)}
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              size="small"
            />

            <TextField
              variant="outlined"
              label="E-mail"
              margin="normal"
              required
              fullWidth
              onChange={(e) => onChange(e)}
              type="email"
              name="email"
              value={email}
              placeholder="E-mail"
              size="small"
            />

            <TextField
              variant="outlined"
              label="City"
              margin="normal"
              required
              fullWidth
              onChange={(e) => onChange(e)}
              type="text"
              name="city"
              value={city}
              placeholder="City"
              size="small"
            />

            <TextField
              variant="outlined"
              label="Phone Number"
              margin="normal"
              required
              fullWidth
              autoFocus
              onChange={(e) => onChange(e)}
              type="tel"
              placeholder="07X-XXXX-XXX"
              maxLength="10"
              name="phoneNo"
              value={phoneNo}
              size="small"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => onChange(e)}
              type="date"
              name="birthday"
              value={birthday}
              size="small"
            />

            <TextField
              variant="outlined"
              label="Password"
              margin="normal"
              required
              fullWidth
              onChange={(e) => onChange(e)}
              type="password"
              name="password"
              value={password}
              placeholder="password"
              size="small"
            />

            <Typography>Add Image</Typography>
            <input type="file" onChange={handleChange} />

            <Button
              variant="contained"
              style={{ color: "white", backgroundColor: "#070d13" }}
              onClick={handleUpload}
            >
              Upload
            </Button>

            <img
              width="25px"
              src={url || "http://via.placeholder.com/100x150"}
              alt="placeholder"
            />

            <br />
            <br />

            <Button
              className={classes.submitButton}
              fullWidth
              variant="contained"
              style={{ color: "white", backgroundColor: "#070d13" }}
              type="submit"
              onClick={() => onsubmit()}
            >
              Submit
            </Button>

            <br />

            <p>
              Already have an account? <a href="/land">Sign in</a>
            </p>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.isLoggedIn,
});
export default connect(mapStateToProps, { registerUser })(Register);
