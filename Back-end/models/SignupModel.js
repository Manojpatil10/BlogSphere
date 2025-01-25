const mongoose = require("mongoose");

const Signup = new mongoose.Schema({
  username: {
    type:String,
    require:true
  },
  email: {
    type:String,
    require:true
  }, 
  password: {
    type:String,
    require:true
  }
});

const User = mongoose.model("Signup", Signup);

module.exports = User;