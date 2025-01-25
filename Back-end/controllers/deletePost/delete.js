const blogPost = require('../../models/blogData')

exports.deletePost = (req, res, next) => {
  const { id } = req.params;

  console.log(id);

  blogPost.deleteOne({_id:id}).then((success)=>{
    // console.log(success);
    res.status(200).json({msg:'data deleted'})
  }).catch((error)=>{
    console.log(error);
  })
}