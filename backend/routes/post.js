const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const {
  body,
  validationResult
} = require("express-validator");

router.get("/posts", postController.getPosts);

router.post(
  "/post/new/:userId",
  authController.requireSignin,
  postController.createPost,
  // [
  //   body("title")
  //   .trim()
  //   .isLength({
  //     min: 4,
  //     max: 150
  //   })
  //   .withMessage("title must be 4 to 150 characters long"),
  //   body("body")
  //   .trim()
  //   .isLength({
  //     min: 10,
  //     max: 2000
  //   })
  //   .withMessage("content must be 10 to 2000 characters long"),
  // ],
  // (req, res, next) => {
  //   let errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     errors = errors.array();
  //     errors = errors.map((err) => err.msg);
  //     return res.status(400).json({
  //       errors: errors
  //     });
  //   }
  //   next();
  // }
);

router.delete(
  "/post/:postId",
  authController.requireSignin,
  postController.isPoster,
  postController.deletePost
);

router.put(
  "/post/:postId",
  authController.requireSignin,
  postController.isPoster,
  postController.updatePost
);

router.get(
  "/posts/by/:userId",
  authController.requireSignin,
  postController.postsByUser
);

// any route containing :userId, our app will execute the userById method first.
router.param("userId", userController.userById);

// any route containing :postId, our app will execute the postById method first.
router.param("postId", postController.postById);

module.exports = router;