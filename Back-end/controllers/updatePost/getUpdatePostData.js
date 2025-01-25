const blogData = require('../../models/blogData');

exports.getUpdatePostData=(req,res,next)=>{
  const {id} = req.params;
  
  // console.log(id);

  blogData.findOne({_id:id}).then((success)=>{
    console.log(success)
    res.status(200).json(success)
  }).catch((error)=>{
    console.log(error);
    res.status(400).json({msg:'please try again'})
  })

  
}