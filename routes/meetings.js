const express = require('express');
const { findById } = require('../models/User');
const router = express.Router();
const {getMeetingsById, getMeetingById, createAMeeting, updateAMeeting, deleteMeeting} = require('../controllers/meetingController')
const Meeting = require('../models/Meeting');
const {validateJwt} = require('../middlewares/validateJwt')

//GET
router.get('/', validateJwt, getMeetingsById)
// GET 1
router.get('/meeting/:id', validateJwt, getMeetingById)
//POST 
router.post('/meeting', validateJwt, createAMeeting)
//PUT UPDATE
router.put('/meeting/:id', validateJwt, updateAMeeting)
//DELETE
router.delete('/meeting/:id', validateJwt, deleteMeeting)

module.exports = router;