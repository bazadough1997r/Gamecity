import PostSchema from '../models/postSchema.js';
import ProfileSchema from '../models/profileSchema.js';

export const getPosts = async (req, res) => {
  try {

    const postSchema = await PostSchema.find();
    res.status(200).json(postSchema);

  } catch (error) {

    res.status(404).json({ message : error.message });

  }
};

export const createPost = async (req, res) => { 
  const post = req.body;
  const newPost = new PostSchema(post)

  try {

    await newPost.save();
    res.status(201).json(newPost);

  } catch (error) {
    
    res.status(409).json({ message: error.message });

  }
};


// export const createuser = async (req, res) => {
//   const user=new profileSchema({
//     name:req.body.name,
//     id:req.body.id,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email ,
//     city: req.body.city,
//     phoneNo: req.body.phoneNo,
//     birthday: Datereq.body.birthday,
//     password: req.body.password
//   });
//   try{
//     const savedUser=await user.save();
//     res.send(savedUser);
//   }catch(err){
//     res.status(400).send(err)
//   }


// };