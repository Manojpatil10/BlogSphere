const blogData = require('../../models/blogData');

exports.updatePost=(req,res,next)=>{
  const {author,title,description,category,date,id} = req.body;

  const image = req.files['blogImg'][0].path.replace('\\','/');
  // console.log(author,title,description,category,id)
  // console.log(image)

  const blogUrl = `http://localhost:8080/${image}`

  blogData.updateOne({_id:id},{$set:{
    Title:title,
    Author:author,
    Date:date,
    Category:category,
    Description:description,
    BlogImg:blogUrl
  }}).then((success)=>{
    res.status(200).json({msg:'Post updated!'})
  }).catch((error)=>{
    res.status(400).json({msg:'Error, please try again!'})
  })
  
}