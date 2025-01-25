const blogData = require('../models/blogData')

exports.blogDataSave=(req,res,next)=>{
  const {title,author,date,category,description} = req.body;
  const userId = req.userId
  const image = req.files['blogImg'][0].path.replace('\\','/');

  // console.log(title,author,date,category,description)
  // console.log(blogUrl);
  // console.log(userId);

  const blogUrl = `http://localhost:8080/${image}`

  const data = new blogData({
    Title: title,
    Author: author,
    Category: category,
    Date: date,
    Description: description,
    BlogImg: blogUrl,
    refId: userId
  })

  data.save().then((success)=>{
    console.log(success)
    res.status(200).json({msg:'Post added successfully!'})
  }).catch((error)=>{
    console.log(error)
    res.status(400).json({msg:'Error, please try again'})
  })

}