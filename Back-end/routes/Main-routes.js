const express=require('express');
const router=express.Router();

const verifyuser=require('../middleware/auth-middelware');
const profileLoader=require('../controllers/profileLoader').profilLoader;
const profileDataSave=require('../controllers/profileDataSave').profileDataSave;
const blogDataSave = require('../controllers/blogPost').blogDataSave;
const getMyPost = require('../controllers/getMyPost').getMyPost;
const getUpdatePostData = require('../controllers/updatePost/getUpdatePostData').getUpdatePostData;
const updatePost = require('../controllers/updatePost/updatePost').updatePost;
const deletePost = require('../controllers/deletePost/delete').deletePost;
const navProfile = require('../controllers/navProfile').navProfile;
const homePosts = require('../controllers/homePosts').homePosts;
// const addblog=require('../controllers/blogController').addblog;
// const getblogs=require('../controllers/blogController').getblogs;
// const myblogs=require('../controllers/blogController').myblogs;
// const getBlogDetail=require('../controllers/blogController').getBlogDetail;


router.post('/profileLoader',verifyuser,profileLoader);
router.post('/profileDataSave',profileDataSave);
router.post('/blogDataSave',verifyuser, blogDataSave);
router.post('/getMyPost',verifyuser,getMyPost);
router.get('/getUpdatePostData/:id',getUpdatePostData);
router.post('/updatePost', updatePost);
router.delete('/deletePost/:id',deletePost);
router.post('/navProfile',verifyuser,navProfile);
router.get('/homePosts',homePosts);

// router.post('/addblog',verifyuser,addblog);

// router.get('/myblogs/:id',verifyuser, myblogs);
// router.get('/getDetails/:id',getBlogDetail)
// router.get('/',getblogs)
module.exports=router;
