const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://gamecity:gamecity@gamecity.bw3we.mongodb.net/<dbname>?retryWrites=true&w=majority';

const PORT = process.env.PORT || 3000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
   .catch((error)=> console.log(error.message) ) 

mongoose.set('useFindAndModify', false)