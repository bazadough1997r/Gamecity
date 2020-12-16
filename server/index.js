import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './routes/route.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Startpoint of all routes
app.use('/posts', router);

const CONNECTION_URL = 'mongodb+srv://gamecity:gamecity@gamecity.bw3we.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
   .catch((error)=> console.log(error.message) )

mongoose.set('useFindAndModify', false)