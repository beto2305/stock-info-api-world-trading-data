const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RoutineSchema = new Schema({
  created: {
    type: Date,
    required: true
  },

  delay: {
    type: Number,
    required: true,
    default: 600000 //10min
  },

  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Routine", RoutineSchema);
