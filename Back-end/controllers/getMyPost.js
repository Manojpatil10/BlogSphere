const blogPost = require('../models/blogData');

exports.getMyPost=(req,res,next)=>{
  const userId = req.userId

  // console.log(userId);

  blogPost.find({refId:userId}).then((success)=>{
    // console.log(success)
    res.status(200).json(success);
  }).catch((error)=>{
    console.log(error)
  })
}