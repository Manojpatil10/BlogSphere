const bcrypt = require('bcrypt');
const Signup = require('../models/SignupModel');
const Profile = require('../models/ProfileData');

exports.register=(req,res,next)=>{
  const {email,password} = req.body;
  const saltRounds = 10;

  // console.log(email)
  // console.log(password)

  Signup.findOne({email:email}).then((user)=>{
    // console.log(user)
    if(user){
      return res.status(400).json({msg:'User already exist'});
    }

    bcrypt.hash(password, saltRounds).then((hashedPass)=>{
      const signupData = new Signup({
        email:email,
        password:hashedPass
      })

      signupData.save().then((signup)=>{
        console.log(signup)
        
        const profileData = new Profile({
          refID:signup._id,
          Name:'',
          Gender:'',
          profileImg:''
        })

        profileData.save().then((success)=>{
          res.status(200).json({msg:'Registered successfully'});
        }).catch((error)=>{
          console.log('Error while saving profile refID',error);
        })
      }).catch((error)=>{
        console.log('Error while registering', error)
      })
    }).catch((error)=>{
      console.log('error while generating hashed password', error);
    })
  })
}