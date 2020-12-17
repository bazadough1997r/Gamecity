
var bodyParser=require('body-parser')
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var dotenv=require('dotenv');

require('dotenv').config();




// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());

//Startpoint of all routes
// app.use('/posts', router);

var app = express();
var PORT = process.env.PORT || 3000;
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
   .catch((error)=> console.log(error.message) ) 

mongoose.set('useFindAndModify', false)
app.use(express.json())

const addUserRouter = require('./routes/route.js');
app.use('/addUser', addUserRouter);