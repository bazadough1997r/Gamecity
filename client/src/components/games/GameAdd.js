// Import useState which will allow us to add state to a functional component.
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { post } from "axios";
// import FileBase from "react-file-base64";
//Import the addGame function from the Actions file.
import { addGame } from "../../actions";
import { set } from "mongoose";
//Import the storage from firebase file
import {storage} from "../../firebase";
import UploadImage from "../../UploadImage.jpg"

function GameAdd(props) {
  const initialState = { 
    gameName: "", 
    gameType: "Select Game", 
    gameDuration: "",  
    gameDate: "", 
    gameGovernorate: "Select Governorate",
    // selectedFile: ""
    // imageData: {
    image: "",
    url: "",
    progress: 0,
    error: ""
    // }
  };

  // const [image, setImage] = useState(null);
  // const [url, setUrl] = useState("");
  // const [progress, setProgress] = useState(0);
  // const [error, setError] = useState("");

  //useState: UseState is a two element array that contains the current state as the
  //first element and a function to update it as the second. Here we're assigning the
  //(const) variable "game" to the current state value, and "setFields" to the update function.
  const [game, setFields] = useState(initialState);
  const dispatch = useDispatch();

  //Every time a user types a character in a form input field the onChange property calls the handleChange
  //handler function passing the event object as an implicit argument. The event object includes the target
  //(i.e., the form field element) which has attributes for field name and value.
  function handleChangeName(event) {
    // ...game spread operator so that the new character is added to the existing article value, otherwise it will just overwrite it.
    setFields({ ...game, gameName: event.target.value });
  }

  function handleChangeType(event) {
    setFields({ ...game, gameType: event.target.value });
  }

  function handleChangeGovernorate(event) {
    setFields({ ...game, gameGovernorate: event.target.value });
  }

  function handleChangeDate(event) {
    setFields({ ...game, gameDate: event.target.value });
  }

  function handleChangeDuration(event) {
    setFields({ ...game, gameDuration: event.target.value });
  }
  function handleChangeImage(event) {
    const file = event.target.files[0];
      if (file) {
        //Check file type
        const fileType = file["type"];
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
          setFields({ ...game, error: ""});
          setFields({ ...game, image: file });
          // console.log(file);
        }else {
        setFields({ ...game, error: "Please select an image to upload"})
      } 
      }
  }

  function handleUpload(event) {
    if(game.image) {
      //Images is the folder in firebase that contains the images
      const uploadTask = storage.ref(`images/${game.image.name}`).put(game.image);
      uploadTask.on(
        "state_changed",
        snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes)
            )
            setFields({ ...game, progress: progress})
        },
        error => {
          setFields({ ...game, error : error })
        },
        () => {
          storage.ref("images").child(game.image.name).getDownloadURL().then(url => {
            setFields({ ...game, url : url })
            setFields({ ...game, progress: 0})
          });
        }
      );
    } else {
      setFields({...game, error: "Error, please choose an image to upload"})
    }
  }

  // function handleChangeImage(event) {
  //   const file = event.target.files[0];
  //     if (file) {
  //       //Check file type
  //       const fileType = file["type"];
  //       const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  //       if (validImageTypes.includes(fileType)) {
  //         setError("");
  //         setImage(file));
  //         // console.log(file);
  //       }else {
  //       setError("Please select an image to upload")
  //     } 
  //     }
  // }

  // function handleUpload(event) {
  //   if(image) {
  //     //Images is the folder in firebase that contains the images
  //     const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //     uploadTask.on(
  //       "state_changed",
  //       snapshot => {
  //           const progress = Math.round(
  //             (snapshot.bytesTransferred / snapshot.totalBytes)
  //           )
  //           setProgress(progress)
  //       },
  //       error => {
  //         setError(error)
  //       },
  //       () => {
  //         storage.ref("images").child(image.name).getDownloadURL().then(url => {
  //           setUrl(url)
  //           setProgress(0);
  //         });
  //       }
  //     );
  //   } else {
  //     setError("Error, please choose an image to upload")
  //   }
  // }

  


  //When the user presses the submit button it calls the handleSubmit function. This is where our API post
  //request is sent with the game object sent as the payload. If it successfully posts it will send back
  //the new game object. Then we dispatch the addGame action passing in the new game object.
  function handleSubmit(event) {
    event.preventDefault();
    // if (!game.gameName || !game.gameType || !game.gameDate || !game.gameDuration || !game.gameGovernorate) return;
    post("/api/games", { 
      gameName: game.gameName, 
      gameType: game.gameType, 
      gameDate: game.gameDate, 
      gameDuration: game.gameDuration, 
      gameGovernorate: game.gameGovernorate,
      selectedFile: game.selectedFile
    })
      .then(function (response) {
        dispatch(addGame(response.data));
      })
      .then(function () {
        props.history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleCancel() {
    props.history.push("/");
  }

  return (
    <div>
      <h4>What's your next game?..</h4>
      
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Post</label>
          <input
            type="text"
            required
            value={game.gameName}
            onChange={handleChangeName}
            className="form-control"
            placeholder="Type in your post here..."
          />
        </div>

        {/* LOCATION- Drop DOWN MENU */}
        <div className="form-group">
          <label>Governorate</label>
          <select
            type="text"
            required
            value={game.gameGovernorate}
            onChange={handleChangeGovernorate}
            className="form-control"
            placeholder="Select Governorate"
          >

            <option value = "SelectGovernorate">Select Governorate</option>
            <option value = "Amman"> Amman</option>
            <option value = "Jerash"> Jerash</option>
            <option value = "Irbid"> Irbid</option>
            <option value = "Balqa"> Balqa</option>
            <option value = "Zarqa"> Zarqa</option>
            <option value = "Madaba"> Madaba</option>
            <option value = "Mafraq"> Mafraq</option>
            <option value = "Ajloun"> Ajloun</option>

          </select>
        </div>

      {/* SELECT GAME- DROPDOWN */}
        <div className="form-group">
        <label>Game</label>
          <select
            type="text"
            required
            value={game.gameType}
            onChange={handleChangeType}
            className="form-control"
            placeholder="Select Game"
          >

            <option value = "SelectGame"> Select Game</option>
            <option value = "Paintball"> Paintball</option>
            <option value = "Football"> Football</option>
            <option value = "Karting"> Karting</option>
            <option value = "Basketball"> Basketball</option>
            <option value = "Laser Tag"> Laser Tag</option>
            <option value = "Volleyball"> Volleyball</option>
            <option value = "Rock Climbing"> Rock Climbing</option>
            <option value = "Horseback Riding"> Horseback Riding</option>

          </select>
        </div>

        {/* DATE- CALENDAR DATE */}
        <div className="form-group">
        <label>Date</label>
          <input
            type="date"
            required
            value={game.gameDate}
            onChange={handleChangeDate}
            className="form-control"
          />
        </div>

        {/* DURATION- SET TIME */} 
        <div className="form-group">
          <label>Game Duration</label>
          <input
            type="text"
            required
            value={game.gameDuration}
            onChange={handleChangeDuration}
            className="form-control"
            placeholder="Set game's duration"
          />
        </div>

        {/* IMAGE- Upload Image */}
        <div className = "form-group">
        <label>Upload Image</label>
        <br/> 
          {/* <FileBase
            type = "file" 
            multiple = {false} 
            onDone = {({base64}) => setFields({...game, selectedFile: base64})}
          />
        </div> */}
         <div>
           <input
             type = "file"
             onChange = {handleChangeImage}
            /> {" "}
            <button onClick = {handleUpload}>Upload</button>
          </div>
          <div>
            {game.progress > 0? <game.progress value = {game.progress} max = "100"/> : ""}
           <p> {game.error} </p>
          </div>
          {game.url ? (
            <img src = {game.url} alt = "image" />
          ) : (
            <img src = {UploadImage} alt = "UploadImage" />
          )} 
        </div>

        <div className="btn-group">
         
          <button type="submit" value="Post" className="btn btn-primary"> Submit </button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary"> Cancel </button>

        </div>
      </form>
    </div>
  );
}

export default GameAdd;

//NOTE: we'll use the useDispatch hook to modify the Redux store.
