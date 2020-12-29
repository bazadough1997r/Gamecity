const express = require("express");
const AddUser = require("../models/profileSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();



router.get("/", async (req, res) => {
  AddUser.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get all user from  database 
router.get("/addUser", async (req, res) => {
  AddUser.find()
    .then((profileSchema) => res.json(profileSchema))
    .catch((err) => res.status(400).json("Error: " + err));
});

///loggingggg in
router.post("/login", async (req, res) => {
  //checking if the username is signed up
  const email = req.body.email;
  const username = req.body.username;
  console.log(req.body)
  // console.log(email, "Rawan")
  console.log(username, "Rawan")
  const user = await AddUser.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .send(
        "there is no account with this username,please check your username?"
      );
  }
  //checking if password is correct
  const validpassword = bcrypt.compareSync(req.body.password, user.password); //await bcrypt.compare(req.body.password, user.password)
  if (!validpassword) return res.status(400).send("Password not correct");
  //create and send a token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  console.log(token)
  res.header("addUser-token", token, email, username).json({ token, email, username });
});


router.post("/",  async (req, res) => {

  //checking if the username or email is used
  const useradded = await AddUser.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  console.log("user added");

  if (useradded)
    return res.status(400).send(
       "There is an account with same Username or Email,please choose another one?"
      );

     
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const city = req.body.city;
  const phoneNo = req.body.phoneNo;
  const birthday = req.body.birthday;
  //hashing password
  
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  // if (Password.length < 5)
  // return res.status(400).send({ msg: "The password need to be at least 5 characters long. " }); 
const username = req.body.username;
// console.log(username, "userrrrrrrrrrrrrr")
  

  //every thing is readdy here we send the data to the server  
  const newUser = await AddUser.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    city: city,
    phoneNo: phoneNo,
    birthday: birthday,
    password: hashedPassword,
  });


  console.log(newUser);
  try {
    const saveUser = await newUser.save();
    res.send({ id: newUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;