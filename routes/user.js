const bycypt = require('bcryptjs')
const express = require('express')
const router =  express.Router()

const User = require('../models/User')

router.post('/signup', async(req,res) => {
  const testEmail = await User.findOne({email: req.body.email});
  if(testEmail) {
    return res.status(500).json({mesasge: "Email already exist"})
  }
  const userToCreate = await User.create(req.body);
  try {
    const salt = bycypt.genSaltSync();
    userToCreate.password = bycypt.hashSync(req.body.password, salt);
    userToCreate.save();
    return res.status(201).json(userToCreate);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create user"});
  }
})



module.exports = router;

