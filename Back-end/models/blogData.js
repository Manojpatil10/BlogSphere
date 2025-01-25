const mongoose = require('mongoose');

const blog = new mongoose.Schema({
  Title: {
    type: String,
    require: true
  },
  Author: {
    type: String,
    require: true
  },
  Description: {
    type: String,
    require: true
  },
  Date: {
    type: String,
    require: true
  },
  Category: {
    type: String,
    require: true
  },
  BlogImg: {
    type: String,
    require: true
  },
  refId: {
    type: String,
    require: true
  }
})

const blogPost = mongoose.model('blogData', blog);
module.exports = blogPost;
