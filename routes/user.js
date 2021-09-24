
const express = require('express')
const router =  express.Router()
const {singUp, login} = require('../controllers/userController')
const { validateFields } = require('../middlewares/validateFields')
const { check } = require('express-validator')





router.post('/signup', [
  check("name", "Name field is required").not().isEmpty(),
  check("email", "Email field is required").isEmail(),
  check("password", "Password must be 8 characters long").isLength({min: 8}),
  validateFields
], singUp)

/*Login
 -check that emails exist
 -it that check passes 
    - check that the req.body.password === User.password
  -if that passes then we return a JWT (token)
*/

router.post('/login', [
  check("email", "Email field is required").isEmail(),
  check("password", "Password must be 8 characters long").isLength({min: 8})
],login)

  

module.exports = router;

