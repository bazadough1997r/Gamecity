const express = require("express");
const router = express.Router();
const { Chat } = require("../models/Chat");

router.get("/getChats/:id", function (req, res) {
  console.log(req.params.id,"reqqqqqqqqqqqqqqqqqqqqqqqqq")
  Chat.findOne({postId: req.params.id})
    .populate("sender")
    .exec((err, chats) => {
      console.log(chats,"chats CHATTSSSSS")
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    });
});

module.exports = router;
