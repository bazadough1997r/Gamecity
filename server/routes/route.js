
const express = require('express');
const AddUser = require('../models/profileSchema');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

const router = express.Router();


// router.route('/').get((req, res) => {
router.get('/',authenticateToken, async(req,res) => {
      AddUser.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  
});

///loggingggg in
router.post('/login', async (req, res) => {
      //checking if the username is signed up 
        const user = await AddUser.findOne({username: req.body.username})
        if (!user) {return res.status(400).send("there is no account with this username,please check your username?")};
  
      //checking if password is correct
        const validpassword =  bcrypt.compareSync(req.body.password, user.password)  //await bcrypt.compare(req.body.password, user.password)
        if (!validpassword) return res.status(400).send('Password not correct');
  
      //creat and send a token
      
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET );
       res.header('addUser-token',token).json({token});
       //console.log(res.header)
});

router.post('/', authenticateToken,  async (req, res) => {
    
  //checking if the number already signed up
  // const firstnameadded = await AddUser.findOne({ firstName: req.body.firstName})
  // const lastnameadded = await AddUser.findOne({ lastName: req.body.lastName})

  //checking if the username is used 
  const useradded = await AddUser.findOne({$or: [
                                                  {email: req.body.email},
                                                  {username: req.body.username}
                                                ]
                                          })  
  if (useradded) return res.status(402).send("There is an account with same Username or Email,please choose another one?");
  const username  = req.body.username;
  const firstName = req.body.firstName
  const lastName  = req.body.lastName
  const email     = req.body.email;
  const city      = req.body.city;
  const phoneNo   = req.body.phoneNo;
  const birthday  = req.body.birthday;
  // const emailadded = await AddUser.findOne({email: req.body.email})
  // if (emailadded ) return res.status(402).send("there is an account with this email ,please choose another one?");
  


  //hashing password

  // const salt = await bcrypt.genSalt(10)
  const hashedPassword =  bcrypt.hashSync(req.body.password, 10) // await bcrypt.hash(req.body.password, salt)
 console.log('hashedPassword',hashedPassword)
//every thing is readdy here we send the data to the server  
   const newUser = new AddUser({
    username:username,
    password:hashedPassword,
    firstName:firstName,
    lastName: lastName,
    email: email ,
    city: city,
    phoneNo: phoneNo,
    birthday: birthday});
   try{

   const saveUser= await newUser.save()
      res.json({saveUser:newUser._id})
   }catch(err){
     res.status(400).send(err)
   }
  
 
});



module.exports= router;