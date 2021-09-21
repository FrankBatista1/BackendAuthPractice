const express = require('express');
const { findById } = require('../models/User');
const router = express.Router();

const Meeting = require('../models/Meeting');
const validateJwt = require('../middlewares/validateJwt')

//GET
router.get('/', validateJwt, async (req,res) => {
  const meetings = await Meeting.find();
  try {
    return res.status(200).json(meetings)
  } catch (error) {
    return res.status(500).json({meetings: "Couldn't get the meetings"})
  }
});
// GET 1
router.get('/meeting/:id', async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  try {
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({message: "Couldn't get field"})
  }
})
//POST 
router.post('/meeting', async (req, res) => {
    const meetingCreated = await Meeting.create({
      concept: req.body.concept,
      date: req.body.date,
      startingtime: req.body.startingtime,
      user: req.body.user
    })
})
//PUT UPDATE
router.put('/meeting/:id', async (req, res) => {
  const meetingToUpdate = await Meeting.findByIdAndUpdate(req.params.id, req,body, {new: true});
  try {
    return res.status(202).json(meetingToUpdate)
  } catch (error) {
    return res.status(500).json({message: "Couldn't update the meeting"})
  }
})
//DELETE
router.delete('/meeting/:id', async (req, res) => {
  const meetingToDelete = await Meeting.findByIdAndDelete(req.params.id);
  try {
    return res.status(202).json({message: "Meeting deleted"})
  } catch (error) {
    return res.status(500).json({message: "Error could not delete the meeting"})
  }
})

module.exports = router;