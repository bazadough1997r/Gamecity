import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import FileBase from "react-file-base64";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({

    image: {
      maxHeight: "100vh",
      maxWidth: "500vh",
      backgroundImage: `url(${process.env.PUBLIC_URL + '../../Images/editPost.jpg'})`,
      backgroundRepeat: "no-repeat",
      alignContent: "center", 

    },
    paper: {
      margin: theme.spacing(6, 8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
      
    }
  }));

function GameEdit(props) {
  const classes = useStyles();

  const initialState = { 
    gameName: "",     
    gameType: "Select Game",
    gameDuration: "",
    gameDate: "",
    gameGovernorate: "Select Governorate",
    selectedFile: ""
  };

  const [game, setGame] = useState(initialState);

  useEffect(
    function () {
      async function getGame() {
        try {
          const response = await get(`/api/games/${props.match.params._id}`);
          console.log(response.data)
          setGame(response.data);
        } catch (error) {
          console.log(error, "useEffect in GameEdit /failed");
        }
      }
      getGame();
    },
    [props]
  );

  function handleSubmit(event) {
    event.preventDefault();
    async function updateGame() {
      try {
        await patch(`/api/games/${game._id}`, game);
        console.log(game._id, "ID from the edit")
        props.history.push(`/games/${game._id}`);
      } catch (error) {
        console.log(error);
      }
    }
    updateGame();
  }

  function handleChangeName(event) {
    // ...game spread operator so that the new character is added to the existing article value, otherwise it will just overwrite it.
    setGame({ ...game, gameName: event.target.value });
  }

  function handleChangeType(event) {
    setGame({ ...game, gameType: event.target.value });
  }

  function handleChangeGovernorate(event) {
    setGame({ ...game, gameGovernorate: event.target.value });
  }

  function handleChangeDate(event) {
    setGame({ ...game, gameDate: event.target.value });
  }

  function handleChangeDuration(event) {
    setGame({ ...game, gameDuration: event.target.value });
  }

  function handleCancel() {
    props.history.push(`/games/${game._id}`);
  }

  return (
    <Grid container component="main" className={classes.root} justify= "center">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              required
              value={game.gameName}
              onChange={handleChangeName}
              className="form-control"
              placeholder="Type in your post here..."
            />

            <br/><br/>

            <Select
              type="text"
              required
              value={game.gameGovernorate}
              onChange={handleChangeGovernorate}
              className="form-control"
              placeholder="Select Governorate"
            >
              <MenuItem value="SelectGovernorate">Select Governorate</MenuItem>
              <MenuItem value="Irbid"> Irbid</MenuItem>
              <MenuItem value="Ajloun"> Ajloun</MenuItem>
              <MenuItem value="Jerash"> Jerash</MenuItem>
              <MenuItem value="Mafraq"> Mafraq</MenuItem>
              <MenuItem value="Balqa"> Balqa</MenuItem>
              <MenuItem value="Amman"> Amman</MenuItem>
              <MenuItem value="Zarqa"> Zarqa</MenuItem>
              <MenuItem value="Madaba"> Madaba</MenuItem>
              <MenuItem value="Karak"> Karak</MenuItem>
              <MenuItem value="Tafilah"> Tafilah</MenuItem>
              <MenuItem value="Ma'an"> Ma'an</MenuItem>
              <MenuItem value="Aqaba"> Aqaba</MenuItem>
            </Select>

            <br/><br/>

            <Select
              type="text"
              required
              value={game.gameType}
              onChange={handleChangeType}
              className="form-control"
              placeholder="Select Game"
            >
              <MenuItem value="SelectGame"> Select Game</MenuItem>
              <MenuItem value="Paintball"> Paintball</MenuItem>
              <MenuItem value="Football"> Football</MenuItem>
              <MenuItem value="Karting"> Karting</MenuItem>
              <MenuItem value="Basketball"> Basketball</MenuItem>
              <MenuItem value="Laser Tag"> Laser Tag</MenuItem>
              <MenuItem value="Volleyball"> Volleyball</MenuItem>
              <MenuItem value="Rock Climbing"> Rock Climbing</MenuItem>
              <MenuItem value="Horseback Riding"> Horseback Riding</MenuItem>
              <MenuItem value="Handball"> Handball</MenuItem>
              <MenuItem value="Tennis"> Tennis</MenuItem>
              <MenuItem value="Running"> Running</MenuItem>
              <MenuItem value="Other.."> Others...</MenuItem>
            </Select>

            <br/>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="date"
              required
              value={game.gameDate}
              onChange={handleChangeDate}
              className="form-control"
            />

            <br/><br/>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              required
              value={game.gameDuration}
              onChange={handleChangeDuration}
              className="form-control"
              placeholder="Set game's duration"
            />

            <br/><br/>

            <Typography>Upload Image</Typography>
            <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setGame({ ...game, selectedFile: base64 })
                }
              />

            <br /><br/>

            <Button 
              fullWidth
              variant="contained"
              style={{color: "white", backgroundColor: "#070d13"}}
              type="submit" 
              value="Post"
            > 
              Post
            </Button>

            <br /><br/>

            <Button 
              fullWidth
              variant="contained"
              style={{color: "white", backgroundColor: "#070d13"}}            
              type="button" 
              onClick={handleCancel}
            > 
              Cancel 
            </Button>
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default GameEdit;

