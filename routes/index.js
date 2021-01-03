const express = require("express");
const { Mongoose } = require("mongoose");
const game = require("../models/game");
const router = express.Router();
const Game = require("../models/game");
const mongoose = require("mongoose");

//Get request to /games returns a JSON array of all game objects found in the database.
router.get("/games", function (req, res) {
  Game.find(function (err, games) {
    res.json(games);
  });
});


//Get request to /games/:id (:id is a variable representing an game's _id) returns a JSON object of the specified game if it exists, otherwise returns status 404 and "No result found"
router.get("/games/:id", function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (!game) {
      res.status(404).send("No result found");
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
      res.status(422).send("Game add failed");
    });
});

router.patch("/games/:id", function (req, res) {
  Game.findByIdAndUpdate(req.params.id, req.body)
    .then(function () {
      res.json("Game updated");
    })
    .catch(function (err) {
      res.status(422).send("Game update failed");
    });
});


router.patch("/games/:id/unlikePost", function (req, res) {
  var object = {likes: req.body.likes , username: req.body.username}
  // Game.findByIdAndUpdate(req.params.id, {likeCount: req.body.likeCount +1})     
  Game.findByIdAndUpdate(req.params.id, { $pull: {likeCount: object}}, {upsert: true, new: true}, (err, model) =>{
   })
    .then(function () {
      res.json("Game liked");
    })
    .catch(function (err) {
      throw err;
    });
});

router.patch("/games/:id/likePost", function (req, res) {
  // console.log(req.body, "i am the req.body")
  var object = {likes: req.body.likes , username: req.body.username}
  // Game.findByIdAndUpdate(req.params.id, {likeCount: req.body.likeCount +1})     
  Game.findByIdAndUpdate(req.params.id, { $addToSet: {likeCount: object}}, {upsert: true, new: true}, (err, model) =>{
    // console.log(model, "model")
    // console.log(err, "err") 
   })
    .then(function () {
      res.json("Game liked");
    })
    .catch(function (err) {
      throw err;
    });
});

router.patch("/games/:id/joinPost", function (req, res) {
  // console.log(req.body.comment, "i'm the req.body.comment")
  // console.log(req.body, "i'm the req.body from the join")

  var object = {joins: req.body.joins, username: req.body.username}
  Game.findByIdAndUpdate(req.params.id, { $addToSet: {joinCount: object}}, {upsert: true, new: true}, (err, model) =>{
  //  console.log(model, "model")
  //  console.log(err, "err") 
  })
  .then(function () {   
    res.json("Game joined");    
    })
    .catch(function (err) {
      res.status(422).send("Game join failed");
    });
});

router.patch("/games/:id/unjoinPost", function (req, res) {
  // console.log(req.body.comment, "i'm the req.body.comment")
  // console.log(req.body, "i'm the req.body from the join")

  var object = {joins: req.body.joins, username: req.body.username}
  Game.findByIdAndUpdate(req.params.id, { $pull: {joinCount: object}}, {upsert: true, new: true}, (err, model) =>{
  //  console.log(model, "model")
  //  console.log(err, "err") 
  })
  .then(function () {   
    res.json("Game joined");    
    })
    .catch(function (err) {
      res.status(422).send("Game join failed");
    });
});


router.patch("/games/:id/comment", function (req, res) {
  // console.log(req.body.comment, "i'm the req.body.comment")
  // console.log(req.body, "i'm the req.body")
  var object = {comment: req.body.comment, username: req.body.username}
  Game.findByIdAndUpdate(req.params.id, { $addToSet: {comment: object}}, {upsert: true, new: true}, (err, model) =>{
  //  console.log(model, "model")
  //  console.log(err, "err") 
  })
  .then(function () {   
    res.json("Game comment added");    
    })
    .catch(function (err) {
      res.status(422).send("Game update failed");
    });
});

router.delete("/games/:id", function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (!game) {
      res.status(404).send("Game not found");
    } else {
      Game.findByIdAndRemove(req.params.id)
        .then(function () {
          res.status(200).json("Game deleted");
          console.log("game deleted");
        })
        .catch(function (err) {
          res.status(400).send("Game delete failed.");
        });
    }
  });
});

module.exports = router;
