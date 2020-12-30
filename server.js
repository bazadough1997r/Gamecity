const jwt = require("jsonwebtoken");
const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");


const mongoose = require("mongoose");
const router = require("./routes/index");


const path = require("path");
const PORT = process.env.PORT || 3001;
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();


const server = require("http").createServer(app)
// const io = require("socket.io")(server)
const uri = process.env.MONGODB_URI;


app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(require('cors')())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);




const { Chat } = require("./models/Chat")


const connect = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});



mongoose.connection.once("open", () => {
  console.log("Connected to the Database.");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error : " + err);
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// const http = require("http").createServer(app)
// const io = require("socket.io")(http)


const io = require("socket.io")(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
  }
})
// server.listen(3001)
io.on("connection", socket => {
  socket.on("Input Chat Message", msg => {
    // console.log(msg,"msg")
    connect.then(db => {
      try {
        let chat = new Chat({message: msg.chatMessage, sender: msg.username, type: msg.type})//FILL_ME
        console.log(msg.chatMessage,"msg.chatMessage")
        console.log(msg.username,"msg.username")
        console.log(msg.type,"msg.type")
        chat.save((err, doc) => {
          console.log(doc)
          console.log(err)
          if(err)
          
          console.log("hello")

          // Chat.find({"username": doc.username})
          // .populate("sender")
          // .exec((err, doc)=>{
          //   return io.emit("Output Chat Message", doc)
          // })
        })
      } catch (error){
        console.error(error)

      }
    })

  })
})



server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
global.authenticateToken = function (req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};




const addUserRouter = require("./routes/route.js");
app.use("/addUser", addUserRouter);




// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server);
// const config = require("./config/key");

// const mongoose = require("mongoose");
// const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// const { Chat } = require("./models/Chat");

// app.use('/api/users', require('./routes/users'));


// io.on("connection", socket => {

//   socket.on("Input Chat Message", msg => {

//     connect.then(db => {
//       try {
//           let chat = new Chat({ message: msg.chatMessage, sender:msg.userID, type: msg.type })

//           chat.save((err, doc) => {
//             if(err) return res.json({ success: false, err })

//             Chat.find({ "_id": doc._id })
//             .populate("sender")
//             .exec((err, doc)=> {

//                 return io.emit("Output Chat Message", doc);
//             })
//           })
//       } catch (error) {
//         console.error(error);
//       }
//     })
//    })

// })


// //use this to show the image you have in node js server to client (react js)
// //https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
// app.use('/uploads', express.static('uploads'));

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {

//   // Set static folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// const port = process.env.PORT || 5000

// server.listen(port, () => {
//   console.log(`Server Running at ${port}`)
// });
