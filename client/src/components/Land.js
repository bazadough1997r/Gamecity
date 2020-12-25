import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Login from "./pages/login";

const Land = () => {
  return (
    <div>
        {/* <style> #Navigation { display: none } </style> */}
      <MDBContainer className="w-75 p-3">
        <hr />
        <MDBRow>
          <MDBCol sm={8}>
            <img
              height="50px"
              width="50px"
              src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
              alt="Gamecity logo"
            />
            <h3 style={{ textAlign: "center" }}>
              Gamesity is a community building games-based platform, designed to
              bring people from different places to play and have fun!
            </h3>
          </MDBCol>
          {/* <MDBCol md="6" style={{ marginTop: "20px" }}>
          <h1>desc</h1>
            <MDBContainer>
                    <MDBRow>
                      <MDBCol size="4">
                        
                      </MDBCol>
                      <MDBCol size="4">
                        
                      </MDBCol>
                    </MDBRow>
                   
                  </MDBContainer>
          </MDBCol> */}
          <MDBCol md="auto"></MDBCol>
          <MDBCol md="3">
            <Login />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Land;
