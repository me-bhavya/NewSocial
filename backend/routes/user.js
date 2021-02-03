const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/auth");

router.get("/users", userController.allUsers);

router.get(
  "/user/:userId",
  authController.requireSignin,
  userController.getUser
);

router.put(
  "/user/:userId",
  authController.requireSignin,
  userController.updateUser
);

router.delete(
  "/user/:userId",
  authController.requireSignin,
  userController.deleteUser
);

// any route containing :userId, our app will execute the userById method first.
router.param("userId", userController.userById);

module.exports = router;
