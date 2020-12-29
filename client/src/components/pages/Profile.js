import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/index";
import { Link , useParams} from "react-router-dom";


function Profile({ userData, fetchUser, logOut }) {
  let {email}= useParams();
  console.log(email)
  useEffect(() => {
    fetchUser(email);
  }, []);

  return userData.loading ? (<h2>Loading</h2>) : userData.error ? (<h2>{userData.error}</h2>) : (<div><h2>User Information</h2>
      <div>
        {userData &&
          userData.user &&
          <ul>
          <li>{userData.user.username}</li>
          <li>{userData.user.firstName}</li>
          <li>{userData.user.lastName}</li>
          <li>{userData.user.email}</li>
          <li>{userData.user.city}</li>
          <li>{userData.user.phoneNo}</li>
          <li>{userData.user.birthday}</li>
          <li>{userData.user._id}</li>
          </ul>
                                              
        }
        <Link
          to={{ pathname: `/profile/${fetchUser._id}/edit` }}
          className="btn btn-info"
        >
          Edit
        </Link>
        {/* <button onClick = {() => logOut()}> logOut</button> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    email : window.localStorage.email,
    id : window.localStorage.id

  };
 
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (email) => dispatch(fetchUser(email)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
