const profile = require('../models/ProfileData');

exports.navProfile=(req,res,next)=>{
  const userId = req.userId;

  profile.findOne({refID:userId}).then((success)=>{
    // console.log(success)
    res.status(200).json(success);
  }).catch((error)=>{
    console.log(error)
  })
}