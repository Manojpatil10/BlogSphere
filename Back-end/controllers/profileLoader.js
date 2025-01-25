const Profile = require('../models/ProfileData');
const Signup = require('../models/SignupModel')

exports.profilLoader=(req,res,next)=>{
  const userId = req.userId
  // console.log(userId);

  Signup.findOne({_id:userId}).then((user)=>{
    // console.log(user)

    Profile.findOne({refID:userId}).then((profile)=>{
      console.log(profile)
      res.status(200).json({email:user.email,profile:profile});
    }).catch((error)=>{
      res.status(400).json({msg:'User not find'});
    })
  }).catch((error)=>{
    res.status(400).json({msg:'User not find'});
  })
}