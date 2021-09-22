const Meeting = require('../models/Meeting')

exports.getMeetingsById = (async (req,res) => {
  const meetings = await Meeting.find().populate("users");// populate('users') shows the entire object not just the id within the Schema.Types.ObjectId
  try {
    return res.status(200).json(meetings)
  } catch (error) {
    return res.status(500).json({meetings: "Couldn't get the meetings"})
  }
})
exports.getMeetingById = (async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  try {
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({message: "Couldn't get field"})
  }
})
exports.createAMeeting = (async (req, res) => {
  const meetingCreated = await Meeting.create({
    concept: req.body.concept,
    date: req.body.date,
    startingtime: req.body.startingtime,
    user: req.body.user
  })
  try {
    return res.status(202).json(meetingCreated);
  }catch (error){
    return res.status(500).json({message: "Couldn't create a meeting"})
  }
})
exports.updateAMeeting =  (async (req, res) => {
  const meetingToUpdate = await Meeting.findByIdAndUpdate(req.params.id, req,body, {new: true});
  try {
    return res.status(202).json(meetingToUpdate)
  } catch (error) {
    return res.status(500).json({message: "Couldn't update the meeting"})
  }
})

exports.deleteMeeting =  (async (req, res) => {
  await Meeting.findByIdAndDelete(req.params.id);
  try {
    return res.status(202).json({message: "Meeting deleted"})
  } catch (error) {
    return res.status(500).json({message: "Error could not delete the meeting"})
  }
})