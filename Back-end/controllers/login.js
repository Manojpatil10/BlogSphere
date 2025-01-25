const Signup = require('../models/SignupModel');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const generateToken = (user) => {
  const payload = { id: user._id, email: user.email };
  const secret = process.env.SECRETE_KEY;
  const options = { expiresIn: '10h' };

  return jwt.sign(payload, secret, options);
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // console.log(email, password)

  Signup.findOne({ email: email }).then((user) => {
    // console.log(user);
    if (user) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        // console.log(isMatch)
        if (!isMatch) {
          res.status(400).json({ msg: 'Wrong Password' });
        }
        const token = generateToken(user);
        res.status(200).json({ token: token, msg: "Logged in successfully" });
      })
    }
  }).catch((error) => {
    res.status(400).json({ msg: 'User not found' });
  })
}