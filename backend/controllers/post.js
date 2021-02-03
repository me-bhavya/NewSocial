const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require('lodash');

exports.getPosts = (req, res, next) => {
  Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
    .then((posts) => {
      return res.status(200).json({
        posts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createPost = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let post = new Post(fields);
    req.profile.hashedPassword = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(file.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post
      .save()
      .then((result) => {
        return res.status(200).json({
          post: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postsByUser = (req, res, next) => {
  Post.find({
      postedBy: req.profile._id,
    })
    .populate("postedBy", "_id name")
    .sort("_created")
    .then((posts) => {
      return res.status(200).json({
        posts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .then((post) => {
      req.post = post;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.isPoster = (req, res, next) => {
  let isposter = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!isposter) {
    return res.status(403).json({
      error: "Unauthorized Action",
    });
  }
  next();
};

exports.deletePost = (req, res, next) => {
  let post = req.post;
  Post.deleteOne({
      _id: post._id,
    })
    .then((result) => {
      return res.status(200).json({
        message: "post deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updatePost = (req, res, next) => {
  let post = req.post;
  post = _.extend(post, req.body);

  // _ is the instance of lodash. It is used to automatically update the post using the req.body
  // not neccessary ! can be done manually as well
  
  post.updated = Date.now();
  post.save()
    .then(updatedpost => {
      return res.status(200).json({
        post: updatedpost
      });
    })
    .catch(err => {
      console.log(err);
    });
};