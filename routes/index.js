const express = require("express");
const router = express.Router();
const Game = require("../models/game");

//Get request to /games returns a JSON array of all game objects found in the database.
router.get("/games", function (req, res) {
  console.log("hello")
  Game.find(function (err, games) {
    res.json(games);
  });
});

//Get request to /games/:id (:id is a variable representing an game's _id) returns a JSON object of the specified game if it exists, otherwise returns status 404 and "No result found"
router.get("/games/:id", function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (!game) {
      res.status(404).send("No result found, Rawans route");
    } else {
      res.json(game);
    }
  });
});

router.post("/games", function (req, res) {
  let game = new Game(req.body);
  game
    .save()
    .then((game) => {
      res.send(game);
    })
    .catch(function (err) {
      res.status(422).send("Game add failed/ Rawans route");
    });
});

router.patch("/games/:id", function (req, res) {
  Game.findByIdAndUpdate(req.params.id, req.body)
  
    .then(function () {
      res.json("Game updated");
    })
    .catch(function (err) {
      res.status(422).send("Game update failed/ Rawans route");
    });
});

router.delete("/games/:id", function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (!game) {
      res.status(404).send("Game not found/ Rawan route");
    } else {
      Game.findByIdAndRemove(req.params.id)
        .then(function () {
          res.status(200).json("Game deleted");
          console.log("game deleted")
        })
        .catch(function (err) {
          res.status(400).send("Game delete failed.");
        });
    }
  });
});

module.exports = router;

//Rawaaaaaaaaaan is testinggggggg