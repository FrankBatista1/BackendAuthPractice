
const {generateJwt} = require('../middlewares/generateJWT')
const bycypt = require('bcryptjs')
const User = require('../models/User')

exports.singUp = async(req,res) => {
  const testEmail = await User.findOne({email: req.body.email});// gets the provided email in the db
  if(testEmail) {// if exist
    return res.status(500).json({mesasge: "Email already exist"})// Usually don't show that already exist for security purposes
  }
  const userToCreate = await User.create(req.body);// create() an object in the database with the object(req.body)
  try {
    const salt = bycypt.genSaltSync();//iterations of ecnryption 
    userToCreate.password = bycypt.hashSync(req.body.password, salt);// encrypts the password 
    userToCreate.save();//pased to the database
    return res.status(201).json(userToCreate);// shows the user created with the password encrypted
  } catch (error) {
    return res.status(500).json({message: "Couldn't create user"});
  }
}

/*Login
 -check that emails exist
 -it that check passes 
    - check that the req.body.password === User.password
  -if that passes then we return a JWT (token)
*/

exports.login = async (req, res) => {
  const {email,password} = req.body;

  const userExist = await User.findOne({email});
  if(!userExist){
    return res.status(400).json({message: "User whit that email does not exist"})// "Error whit the server" in production for secure purposes
  }
  const validPassword = bycypt.compareSync(password, userExist.password);// validating the password returns true or false
  if (!validPassword) {
    return res.status(500).json({message: 'incorrect credentials'});// if its incorrect break the code 
  }
  const token = await generateJwt(userExist._id)//gets the value of the key id (uid => userid) and generates a token 
  return res.json({user: userExist, token})//respons with the user and the token
}

  