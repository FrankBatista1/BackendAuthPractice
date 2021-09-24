const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.validateJwt = (req, res, next) => {
  const token = req.header('Authorization');// Authorization saves the token previusly created 
  if (!token){// if is undefined
    return res.status(400).json({message: "Token not found"});
  }
  try {
    const uid = jwt.verify(token, 'ajifddfjioadsoijff9802349y8qrhuio');
    req.user = await.User.findById(uid)
    next();
  } catch (error) {
    res.status(401).json({message: "Invalid token"});
  }
}

exports.isAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({message: "Need validation first"});
  }
  const { role, name} = req.user;
  if (role !== 'ADMIN') {
    return res.status(401).json({meesage: `User ${name} does not have privileges for this operation`});
  }
  next();
}

exports.hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({message: "Need validation first"});
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({message: `The user doesn't contain any of these roles [${roles}]`})
    }
    next();
  }
}
