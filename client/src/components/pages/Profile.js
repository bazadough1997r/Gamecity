import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/index";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Profilegames from "../games/Profilegames";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import FooterPage from "./Footer";

function Profile({ userData, fetchUser }) {
  let { email } = useParams();
  // console.log(email);

  useEffect(() => {
    fetchUser(email);
  }, [email, fetchUser]);

  return userData.loading ? (

    <div style = {{backgroundImage: `url(${process.env.PUBLIC_URL + '.././Images/chatRoom.jpg'})`, height: "100vh"}}>
      
      <br/><br/><br/>
      
      <div className= "container col p-10 text-center" style = {{width: "60%", background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
        <p style = {{color: "#fff", fontSize: "28px", fontFamily: "Century Gothic"}}>
          Loading...
        </p>
      </div>
      
    </div>

  ) : userData.error ? (

    <div style = {{backgroundImage: `url(${process.env.PUBLIC_URL + '.././Images/chatRoom.jpg'})`, height: "100vh"}}>
      
      <div className= "container col p-10 text-center" style = {{width: "60%", background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
        <p style = {{color: "#fff", fontSize: "28px", fontFamily: "Century Gothic"}}>
          {userData.error}
        </p>
      </div>
      <div>
      <br/><br/>
      <FooterPage/>
    </div>
    </div>

  ) : (

    <div style = {{backgroundImage: `url(${process.env.PUBLIC_URL + '.././Images/chatRoom.jpg'})`, height: "100vh"}} >
      
      <br/><br/>
      
      <MDBContainer>
        <div>
        <MDBRow>
        <MDBCol md="6">

          <div className= "container col p-10 text-center" style = {{width: "60%", background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
          
          <p style = {{color: "#fff", fontSize: "28px", fontFamily: "Century Gothic", marginBottom: "5px"}}>
            @{window.localStorage.username}'s Profile:
          </p>

            <img src={userData.user.url} alt="profile_pic" width="125px" className = "rounded-circle"/>
            
            {userData && userData.user && (

              <div>

                <p style = {{color: "#b9b9b9", fontSize: "18px", fontFamily: "Century Gothic", marginTop: "5px"}}>
                  Username:   
                  <span style = {{color: "#fff ", fontSize: "18px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                    {userData.user.username}
                  </span>
                </p>

                <p style = {{color: "#b9b9b9", fontSize: "18px", fontFamily: "Century Gothic"}}> 
                  Name: 
                  <span style = {{color: "#fff ", fontSize: "18px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                  {userData.user.firstName} {userData.user.lastName}
                  </span>
                </p>

                <p style = {{color: "#b9b9b9", fontSize: "18px", fontFamily: "Century Gothic"}}>Email: 
                  <span style = {{color: "#fff ", fontSize: "18px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                    {userData.user.email}
                  </span> 
                </p>
                
                <p style = {{color: "#b9b9b9", fontSize: "18px", fontFamily: "Century Gothic"}}>City: Jordan/
                  <span style = {{color: "#fff ", fontSize: "18px", fontFamily: "Century Gothic", fontWeight: "bold"}}>              
                    {userData.user.city}
                  </span>
                </p>

                <p style = {{color: "#b9b9b9", fontSize: "18px", fontFamily: "Century Gothic"}}>Phone number: 
                  <span style = {{color: "#fff ", fontSize: "18px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                    {userData.user.phoneNo}
                  </span>  
                </p>

                <p style = {{color: "#b9b9b9", fontSize: "18px", fontFamily: "Century Gothic"}}>Birthday: 
                  <span style = {{color: "#fff ", fontSize: "18px", fontFamily: "Century Gothic", fontWeight: "bold"}}>
                    {userData.user.birthday}
                  </span>
                </p>

                  <Link
                    to={{ pathname: `/editProfile/${userData.user.email}` }}
                    variant="contained"
                    className = "btn btn-light btn-block btn-lg"
                    >
                    Edit Profile
                  </Link>
                  <br/>
              </div>
            )}
        </div>
        </MDBCol>

        <div className= "container col" style = {{overflowY: "scroll", height: "510px", width: "60%", background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
          <Profilegames/>
        </div>
        
      </MDBRow>
      </div>
    </MDBContainer>
    <div>
      <br/><br/>
      <FooterPage/>
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
