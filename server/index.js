const jwt =require('jsonwebtoken');
var bodyParser=require('body-parser')
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var dotenv=require('dotenv');

require('dotenv').config();


var app = express();
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Startpoint of all routes
// app.use('/posts', router);

global.authenticateToken = function (req, res, next) {
   // Gather the jwt access token from the request header
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]

   if (token == null) return res.sendStatus(401) // if there isn't any token
 
   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
     console.log(err)
     if (err) return res.sendStatus(403)
     req.user = user
     next() // pass the execution off to whatever request the client intended
   })
 }

var PORT = process.env.PORT || 3000;
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
   .catch((error)=> console.log(error.message) ) 

mongoose.set('useFindAndModify', false)
// app.use(express.json())

const addUserRouter = require('./routes/route.js');
app.use('/addUser', addUserRouter);