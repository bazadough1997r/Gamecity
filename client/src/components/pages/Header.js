import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from '@material-ui/core/CardMedia';
import { AppBar, Collapse, IconButton, Toolbar } from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Century Gothic"
    },
    appBar: {
        background: "none",
        fontFamily: "Century Gothic"
    },
    appBarWrapper: {
        width: "80%",
        margin: "0 auto"
    },
    appBarLogo: {
        // flexGrow: "1"
    },
    gamesityTitle: {
        fontWeight: "bold",
        fontSize: "2.2rem",
        // color: "#325479"       
    },
    icon: {
        color: "#fff",
        fontSize: "2rem"
    },
    body: {
        color: "#fff",
        fontFamily: "Century Gothic",
        fontSize: "2rem"

    },
    body2: {
        color: "#fff",
        fontFamily: "Century Gothic",
        fontSize: "1.65rem"

    },
    container: {
        textAlign: "center"
    },
    expandIcon: {
        color: "#fff",
        fontSize: "2rem",
    }
}));

export default function Header() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, [])
    return (
        <div className = {classes.root} id = "header">
            <AppBar className = {classes.appBar} elevation = {0}>
                <Toolbar className = {classes.appBarWrapper}>
                    {/* <h4 className = {classes.appBarLogo}>Gamesity</h4> */}
                    <img
                        className = {classes.appBarLogo}
                        height="30px"
                        width="30px"
                        src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
                        alt="Gamecity logo"
                        />
                    {/* <IconButton>
                        <SortIcon className = {classes.icon} />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
            <Collapse in = {checked}  
                {...(checked ? { timeout: 1000 } : {})}
                collapsedHeight = {50}
            >
                <div className = {classes.container}>
                    <h3 className = {classes.body} >
                        Welcome to <span className = {classes.gamesityTitle}>Gamesity</span>
                    </h3>
                    <h4 className = {classes.body2}>
                        Now, let's start playing
                    </h4>
                    <Scroll to= "aboutus-login-cards" smooth = {true} >
                        <IconButton>
                            <ExpandMoreIcon className = {classes.expandIcon}/>
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>
        </div>
    )
}

// function Navigation() {
//     var value = false;
//     if (window.localStorage.length > 0) {
//       value = true;
//     } else {
//       value = false;
//     }
  
//     return (
//       <div>
//         {value === false ? (
//           <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
//             <div className="container">
//               <ul className="nav justify-content-start ">
//                 <li className="nav-item">
//                   <a href="/" className="navbar-brand">
//                     <img
//                       height="30px"
//                       width="30px"
//                       src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
//                       alt="Gamecity logo"
//                     />
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//         ) : (
//           <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
//             <div className="container">
//               <ul className="nav justify-content-start ">
//                 <li className="nav-item">
//                   <NavLink
//                     exact
//                     className="nav-link"
//                     activeClassName="active"
//                     to="/"
//                     style={{ color: "white" }}
//                   >
//                     <img
//                       height="30px"
//                       width="30px"
//                       src={`${process.env.PUBLIC_URL}/Logo/GamecityLogo.png`}
//                       alt="Gamecity logo"
//                     />
//                   </NavLink>
//                 </li>
//               </ul>
//               <ul className="nav justify-content-start">
//                 <li className="nav-item">
//                   <SearchForm />
//                 </li>
//               </ul>
//               <ul className="nav justify-content-end ">
//                 <li className="nav-item">
//                   <NavLink
//                     exact
//                     className="nav-link"
//                     activeClassName="active"
//                     to="/games"
//                     style={{ color: "white" }}
//                   >
//                     Games
//                   </NavLink>
//                 </li>
//                 {/* <li className="nav-item">
//                   <NavLink
//                     exact
//                     className="nav-link"
//                     activeClassName="active"
//                     to="/notifications"
//                     style={{ color: "white" }}
//                   >
//                     Notifications
//                   </NavLink>
//                 </li> */}
//                 <li className="nav-item">
//                   <NavLink
//                     exact
//                     className="nav-link"
//                     activeClassName="active"
//                     to="/chat"
//                     style={{ color: "white" }}
//                   >
//                     Chat Rooms
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink
//                     exact
//                     className="nav-link"
//                     activeClassName="active"
//                     to={"/profile/" + useremail}
//                     style={{ color: "white" }}
//                   >
//                     Profile
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     exact
//                     className="nav-link"
//                     activeClassName="active"
//                     to="/land"
//                     style={{ color: "white" }}
//                     onClick={() => logout()}
//                   >
//                     Logout
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//         )}
//       </div>
//     );
//   }