import React, { useState, useEffect } from "react";
import { get, put } from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import FooterPage from "./Footer";

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: "100vh",
    maxWidth: "500vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "../Images/editProfile.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    alignContent: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
}));

const ProfileEdit = (props) => {
  const classes = useStyles();

  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    phoneNo: "",
    birthday: "",
  };

  const [user, setUser] = useState(initialState);

  useEffect(
    function () {
      async function getProfile() {
        try {
          const response = await get(
            `/api/profile/${props.match.params.email}`
          );
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      getProfile();
    },
    [props]
  );

  async function handleSubmit(event) {
    event.preventDefault();
    //  console.log("user#1", user);

    try {
      await put(`/api/profile/editProfile/${props.match.params.email}`, user);
      alert("Profile info were successfully saved!");
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangefirstName(event) {
    setUser({ ...user, firstName: event.target.value });
  }

  function handleChangelastName(event) {
    setUser({ ...user, lastName: event.target.value });
  }

  function handleChangecity(event) {
    setUser({ ...user, city: event.target.value });
  }

  function handleChangephoneNo(event) {
    setUser({ ...user, phoneNo: event.target.value });
  }

  function handleChangebirthday(event) {
    setUser({ ...user, birthday: event.target.value });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="First Name"
              autoFocus
              onChange={handleChangefirstName}
              type="text"
              name="firstName"
              value={user.firstName}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChangelastName}
              type="text"
              name="lastName"
              value={user.lastName}
              placeholder="Last Name"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChangecity}
              type="text"
              name="city"
              value={user.city}
              placeholder="City"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChangephoneNo}
              type="tel"
              placeholder="07X-XXXX-XXX"
              maxLength="10"
              name="phoneNo"
              value={user.phoneNo}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChangebirthday}
              type="date"
              name="birthday"
              value={user.birthday}
            />

            <br />

            <Button
              fullWidth
              variant="contained"
              style={{ color: "white", backgroundColor: "#070d13" }}
              type="submit"
              value="Post"
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </Button>

            <br />
            <br />

            <Link
              exact
              activeClassName="active"
              to={"/profile/" + window.localStorage.email}
            >
              <Button
                fullWidth
                variant="contained"
                style={{ color: "white", backgroundColor: "#070d13" }}
              >
                Profile
              </Button>
            </Link>
          </form>
        </div>
      </Grid>
      {/* <FooterPage/> */}
    </Grid>
  );
};

export default ProfileEdit;
