import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Login from "./pages/login";

const Land = () => {
  return (
    <div>
      {/* <style> #Navigation { display: none } </style> */}
      <MDBContainer className="w-75 p-3">
        <hr />
        <MDBRow className="d-flex align-items-center">
          <MDBCol sm="8" className="d-flex align-items-center">
            <div>
              <img
              style={{marginLeft:"auto", marginRight:"auto", display:"block"}}
              height="50px"
              width="50px"
              src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
              alt="Gamecity logo"
            />
              <h3 style={{ textAlign: "center" }}>Gamesity</h3>
              <h3 style={{ textAlign: "center" }}>
                is a community building games-based platform, designed to bring
                people from different places to play and have fun!
              </h3>
            </div>
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
          <MDBCol md="3" className="border d-flex align-items-center">
            <div>
              <Login />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Land;
