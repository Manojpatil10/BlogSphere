const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const mytoken = req.body.ID;
  // const { id } = req.params;
  // let mytoken;
  // if (id) {
  //   mytoken = id;
  // } else {
  //   const { token } = req.body;
  //   mytoken = token;
  // }
  const secret = process.env.SECRETE_KEY;
  const user = jwt.verify(mytoken, secret);
  // console.log('user',user)
  req.userId = user.id; 
  next();
};

module.exports = verifyToken;
