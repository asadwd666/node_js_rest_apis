const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt=require('jsonwebtoken')
/////regestring users
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_PASS
    ).toString(),
  });
  /////for hashing password will use cryptojs and in thsi we will use AES
  try {
    const saveuser = await newUser.save();
    res.status(201).json(saveuser);
  } catch (err) {
    res.status(500).json(err);
  }
});
/////////////////////////////////////////////////////////////////////////////////////

/////////loggin in user///////////////////
router.post("/login", async (req, res) => {
   
    
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json('Wrong credntial')
    const hashedpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC_PASS
    );
    const orignalpassword = hashedpassword.toString(CryptoJS.enc.Utf8);
    orignalpassword != req.body.password && res.status(401).json("wrong credantial");
    const { password , ...others}= user._doc;
    //////jason web token
    const accessToken=jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin,
    
    },process.env.JWT_KEY,{
        expiresIn:"3d"
    })
    /////////////////////

    res.status(200).json({...others,accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
