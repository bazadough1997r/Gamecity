import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../../actions/index'
import { Link } from "react-router-dom";

function Profile({ userData, fetchUser, logOut }) {
  useEffect(() => {
    fetchUser();
  }, []);
  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <h2>Users List</h2>
      <div>
        {userData &&
          userData.user &&
          userData.user.map(userInfo => <p>{userInfo.name}</p>
          )}
          <button>Edit</button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    logOut: () => dispatch(logOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
