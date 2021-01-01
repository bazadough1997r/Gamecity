import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/index";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Profilegames from "../games/Profilegames";
//action  setGames
//set state
//map //if statmemnt
//const[]
function Profile({ userData, fetchUser }) {
  let { email } = useParams();
  console.log(email);
  useEffect(() => {
    fetchUser(email);
  }, [email, fetchUser]);

  return userData.loading ? (
    <h3>Loading</h3>
  ) : userData.error ? (
    <h3>{userData.error}</h3>
  ) : (
    <div>
      <h3>{window.localStorage.username}'s info:</h3>
      <div>
        <hr></hr>
        <img src={userData.user.url} alt="profile_pic" width="150px"></img>
        <Link
          to={{ pathname: `/editProfile/${userData.user.email}` }}
          className="btn btn-info float-right"
        >
          Edit
        </Link>
        {userData && userData.user && (
          <div>
            <h6>Username: {userData.user.username}</h6>
            <h6>
              Name: {userData.user.firstName} {userData.user.lastName}
            </h6>
            <h6>Email: {userData.user.email}</h6>
            <h6>City: Jordan/{userData.user.city}</h6>
            <h6>Phone number: {userData.user.phoneNo}</h6>
            <h6>Birthday: {userData.user.birthday}</h6>
          </div>
        )}
      </div>
      <Profilegames />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    email: window.localStorage.email,
    id: window.localStorage.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (email) => dispatch(fetchUser(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
