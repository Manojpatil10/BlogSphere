const mongoose = require('mongoose');

const profile = new mongoose.Schema({
  refID: {
    type:String,
    require:true
  },
  Name: {
    type:String,
    require:true
  },
  Gender: {
    type:String,
    require:true
  },
  profileImg: {
    type:String,
    require:true
  }
});

const data = mongoose.model('userprofile', profile);
module.exports = data;