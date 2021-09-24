const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  getMeetingsById,
  getMeetingById,
  createAMeeting,
  updateAMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");
const Meeting = require("../models/Meeting");
const { validateJwt, isAdmin, hasRole } = require("../middlewares/validateJwt");
const { validateFields } = require("../middlewares/validateFields");


//GET
router.get("/", getMeetingsById);
// GET 1
router.get("/meeting/:id", validateJwt, getMeetingById);
//POST
router.post(
  "/meeting",
  [
    validateJwt,
    check("concept", "Name field is required").not().isEmpty(),
    check("duration", "Duration of the meeting is requried").not().isEmpty(),
    check("date", "A date is required for a meeting").not().isEmpty(),
    check("users", "At least one user is required for a meeting").isLength({min: 1}),
    check("startingTime", "You need to declare a strating time").not().isEmpty(),
    hasRole,
    isAdmin,
    validateFields
  ],
  createAMeeting
);
//PUT UPDATE
router.put("/meeting/:id", validateJwt, updateAMeeting);
//DELETE
router.delete("/meeting/:id", validateJwt, deleteMeeting);

module.exports = router;
