
// const express = require("express");
// const router = express.Router();
// const { Chat } = require("../models/Chat");

// router.get("/getChats/:id", function (req, res) {
//   Chat.find()
//     .populate("sender")
//     .exec((err, chats) => {
//       console.log(chats,"chats in chat router coming from db") //array of objects
//       if (err) return res.status(400).send(err);
//       res.status(200).send(chats);
//     });
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const { Chat } = require("../models/Chat");

router.get("/getChats/:id", async function (req, res) {
  // console.log(req.params.id,"reqqqqqqqqqqqqqqqqqqqqqqqqq")
 await Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      console.log(chats,"chats in chat router coming from db") //array of objects
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    });
});



module.exports = router;
