const {Schema, model} = require('mongoose')

const MeetingSchema =  Schema(
  {
    concept: {
      type: String,
      require: true,

    },
    date :{
      type: Date,
      required: true
    },
    startingtime: {
      type: String,
      required: true
    },
    users: 
    {type: [Schema.Types.ObjectId],
    required: true},
    duration: {
      type: Number,
      required: true 
    }
  }
)

module.exports = model("Meetings", MeetingSchema)