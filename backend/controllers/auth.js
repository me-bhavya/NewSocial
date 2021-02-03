const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const expressjwt = require("express-jwt");
dotenv.config();

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(403).json({
      error: "email already exists",
    });
  }

  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Signup Successful" });
};

exports.signin = (req, res, next) => {
  // find the user based on the email

  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      // if no user
      if (!user) {
        return res.status(401).json({
          error: "email does not exist. Please Sign Up",
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "email and passwords do not match",
        });
      }
      // generate a token using the user id and secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      // persist the cookie as 't' in the cookie with expiry date
      res.cookie("t", token, { expire: new Date() + 9999 });
      // return response with the user and token to the frontend client
      return res.status(200).json({
        token: token,
        user: { _id: user._id, email: user.email, name: user.name },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.signout = (req, res, next) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Signout Successful" });
};

exports.requireSignin = expressjwt({
  // if the token is valid, express jwt appends the verified user's id
  // in an auth key to the request object
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
