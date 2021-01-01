import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/index";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Profilegames from "../games/Profilegames"
//action  setGames
//set state
//map //if statmemnt
//const[]
function Profile({ userData, fetchUser }) {
 
  let {email}= useParams();
  console.log(email)
  useEffect(() => {
    fetchUser(email);
  },[email,fetchUser]);


 
  return userData.loading ? (<h2>Loading</h2>) : userData.error ? (<h2>{userData.error}</h2>) : (<div><h2>User Information</h2>
      <div>
        <hr></hr>
        {userData && userData.user && (
          <ul>
          -UserName:
          <li>{userData.user.username}</li>
          -FirstName:
          <li>{userData.user.firstName}</li>
          -LastName:
          <li>{userData.user.lastName}</li>
          -Email:
          <li>{userData.user.email}</li>
          -City:
          <li>{userData.user.city}</li>
          -PhoneNo:
          <li>{userData.user.phoneNo}</li>
          -Birthday:
          <li>{userData.user.birthday}</li>
          </ul>    
        )}
       <img src={userData.user.url} alt ="profile_pic" width="150px"></img>
                   <Link
              to={{ pathname: `/editProfile/${userData.user.email}` }}
              className="btn btn-info"
            >
              Edit
            </Link>
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
