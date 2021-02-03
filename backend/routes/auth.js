const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const { body, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("entered email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 characters long"),
  ],
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors = errors.array();
      errors = errors.map((err) => err.msg);
      return res.status(400).json({ errors: errors });
    }
    next();
  },
  authController.signup
);

router.post("/signin", authController.signin);

router.get("/signout", authController.signout);

// any route containing :userId, our app will execute the userById method first.
router.param("userId", userController.userById);

module.exports = router;
