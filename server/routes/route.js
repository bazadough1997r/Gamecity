
const router = require('express').Router();
const AddUser = require('../models/profileSchema');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');


router.route('/').get((req, res) => {
      AddUser.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  
  });
  
  router.route('/adduser').post(async (req, res) => {
    
  //checking if the number already signed up
  const firstnameadded = await AddUser.findOne({ firstName: req.body.firstName,})
 
  const lastnameadded = await AddUser.findOne({ lastName: req.body.lastName,})
    //checking if the username is used
   
  const useradded = await AddUser.findOne({username: req.body.username})
  if (useradded) return res.status(402).send("there is an account with this username,please choose another one?");
  const username = req.body.username;

  const emailadded = await AddUser.findOne({email: req.body.email})
  if (emailadded ) return res.status(402).send("there is an account with this email ,please choose another one?");
  


  //hashing password

  const salt = await bcrypt.genSalt(10)
  const hashedPassword =  await bcrypt.hash(req.body.password, salt)
  const city= req.body.city;
  const phoneNo=req.body.phoneNo;
  const birthday=birthday.body.birthday;
//every thing is readdy here we send the data to the server  
   const newUser = new AddUser({username:username,password:hashedPassword,
    firstName:firstName,
    lastName: lastName,
    username: username,
    email: email ,
    city: city,
    phoneNo: phoneNo,
    birthday: birthday});
   try{

   const saveUser= await newUser.save()
      res.send({saveUser:newUser._id})
     console.log(token)
   }catch(err){
     res.status(400).send(err)
   }
  
 
    });

    ///loggingggg in
    router.route('/login').post(async (req, res) => {

    //checking if the username is signed up 

      const user = await AddUser.findOne({username: req.body.username})
      if (!user) {return res.status(400).send("there is no account with this username,please check your username?")};

    //checking if password is correct

      const validpassword = await bcrypt.compare(req.body.password, user.password)
      if (!validpassword) return res.status(400).send('Password not correct');

    //creat and send a token
    
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET );
     res.header('addUser-token',token).send(token);
     //console.log(res.header)
       });
  

    module.exports= router;