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
  // style = {{backgroundImage: `url(${process.env.PUBLIC_URL + './Images/chatRoom.jpg'})`}}
  return userData.loading ? (
    <h3>Loading</h3>
  ) : userData.error ? (
    <h3>{userData.error}</h3>
  ) : (
    <div>
      <br/><br/><br/>
    <div>
      <div className= "container p-10 text-center" style = {{width: "60%", background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
      <h3 style = {{color: "#fff", fontSize: "28px", fontFamily: "Century Gothic"}}>{window.localStorage.username}'s info:</h3>
      {/* <hr /> */}
        <img src={userData.user.url} alt="profile_pic" width="150px" height = "150px" className = "rounded-circle"/>
        {userData && userData.user && (
          <div>
            <p style = {{color: "#666666", fontSize: "18px", fontFamily: "Century Gothic"}}>
              Username: 
              <span style = {{color: "#fff", fontSize: "18px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                {userData.user.username}
              </span>
            </p>
            <p>
              Name: {userData.user.firstName} {userData.user.lastName}
            </p>
            <p>Email: {userData.user.email}</p>
            <p>City: Jordan/{userData.user.city}</p>
            <p>Phone number: {userData.user.phoneNo}</p>
            <p>Birthday: {userData.user.birthday}</p>
          </div>
        )}
        <Link
          to={{ pathname: `/editProfile/${userData.user.email}` }}
          className="btn btn-info float-right"
        >
          Edit
        </Link>
      </div>
      <Profilegames />
    </div>
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
