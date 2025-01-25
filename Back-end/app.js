const express = require('express');
const app = express();
const path=require('path')
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const multer=require('multer');
require('dotenv').config();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*');
  res.setHeader("Access-Control-Allow-Methods",'GET,POST,PUT,PATCH,DELETE'); 
  res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
  next();
})

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(bodyParser.json())
app.use('/Uploads',express.static(path.join(__dirname,"Uploads")));

const authRouter=require('./routes/Auth-routes');
const mainRouter=require('./routes/Main-routes');



const fileStorage=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'./uploads')
  },
  filename:(req,file,cb)=>{
      const timeStamp=Date.now();
      cb(null,timeStamp+"-"+file.originalname);
  }
});

const imgArray = [
  {
    name:'profileImg',
    maxCount:1
  },
  {
    name:'blogImg',
    maxCount:1
  }
]

app.use(multer({storage:fileStorage}).fields(imgArray))

app.use(authRouter);
app.use(mainRouter);

mongoose.connect(MONGO_URL).then((success)=>{
    console.log("code connected to database successfully");
}).catch((error)=>{})

app.listen(PORT, ()=>{
  console.log('server is running')
})