const express = require("express");
const router = express.Router();
const { Chat } = require("../models/Chat");

router.get("/getChats/:id", async function (req, res) {
  await Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      console.log(chats, "chats in chat router coming from db"); //array of objects
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    });
});

module.exports = router;
