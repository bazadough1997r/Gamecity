import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (

    <MDBFooter color="#00060c" className="footer font-small pt-4  p-3">
      <MDBContainer fluid className="text-center text-md-left" style = {{padding:"16px", fontFamily: "Century Gothic"}}>
        <MDBRow className = "d-flex justify-content-around">
          <MDBCol md="3" className="text-center">
            <p className="title" style = {{fontSize: "16px", letterSpacing: "1.5px", lineHeight: "1.5"}}>About Us</p> <br />
            <p style = {{fontSize: "12px", letterSpacing: "1.5px", lineHeight: "1.5"}}>
                Gamesity, a new social media platform specifically catered towards playing and interacting
                with the community. We all have this problem of really wanting to go and play a game, but we 
                don't have enough people to complete the team. We here at Gamesity, that's our aim. Well here,
                 you don't just get the chance to complete your team, but meet new friends, mingle, plan, and finally
                 get together.
            </p>
          </MDBCol>
          <MDBCol md="3" className="text-center">
            <h6 className="title" style = {{fontSize: "16px", letterSpacing: "1.5px", lineHeight: "1.5"}}>Contact Us</h6> <br />
              <p style = {{fontSize: "14px", letterSpacing: "1.5px", lineHeight: "1.5"}}>
                  ADDRESS 
                  <br />
              Al- Sha'ab St. 29, Al-Jandaweel, Amman, Jordan <br /><br />
              PHONE # <br />
              <span style = {{fontSize: "12px", letterSpacing: "1.5px", lineHeight: "1.5"}}>
                <a href="tel:+962 7 980 7680">Call us at +962 7 980 7680</a> <br />
                <a href="tel:+962 7 800 7680">Call us at +962 7 800 7680</a> <br /><br />
              </span>
                E-MAIL
              <br />
              <span style = {{fontSize: "12px", letterSpacing: "1.5px", lineHeight: "1.5"}}>
                <a href = "mailto:gamesity@gamesity.com">gamesity@gamesity.com</a>
              </span>
              </p>
          </MDBCol>
        </MDBRow>

      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Gamesity - All Rights Reserved
        </MDBContainer>
      </div>
    </MDBFooter>

  );
}
export default FooterPage;