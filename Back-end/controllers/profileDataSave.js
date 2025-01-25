const Profile = require('../models/ProfileData');

exports.profileDataSave=(req,res,next)=>{
  const {name,id,gender} = req.body;
  const image = req.files['profileImg'][0].path.replace('\\','/');

  // console.log(name,id,gender);
  // console.log(profileImg);

  const profileUrl = `http://localhost:8080/${image}`


  Profile.updateOne({refID:id},{$set:{Name:name,Gender:gender,profileImg:profileUrl}})
  .then((success)=>{
    // console.log(success)
    res.status(200).json({msg:'Profile updated successfully'})
  }).catch((error)=>{
    res.status(400).json({msg:'Error while updating profile'}) 
  })

  // Profile.findOne({refID:id}).then((success)=>{
  //   console.log(id)
  //   console.log(success)
  // }).catch((error)=>{
  //   console.log(error)
  // })   

}