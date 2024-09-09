const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  adminname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;