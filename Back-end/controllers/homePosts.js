const posts = require('../models/blogData');

exports.homePosts=(req,res,next)=>{
  posts.find().then((success)=>{
    // console.log(success)
    res.status(200).json(success)
  }).catch((error)=>{
    console.log(error)
  })
}