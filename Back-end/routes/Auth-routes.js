const express=require('express');
const router=express.Router();
const login=require('../controllers/login').login;
const register=require('../controllers/register').register;

router.post("/login",login);
router.post('/register',register); 


module.exports=router;