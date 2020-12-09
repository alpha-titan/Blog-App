const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const Post = require("../models/Post.model");
const { postValidation } = require("../validation");

// ? get all posts

router.get("/", verifyToken, async (req, res) => {
  try {
    const getPosts = await Post.find().populate("postedBy", "_id username");
    res.json(getPosts);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

// ? add post

router.post("/", verifyToken, async (req, res) => {
  //validation
  const { error } = postValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  req.user.password = undefined;

  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    postedBy: req.user,
  });
  try {
    await newPost.save();
    console.log(req.user);
    res.json({ message: "Added Successfully !!!" });
  } catch (err) {
    res.json({
      message: err,
    });
  }

  // console.log(req.body);
});

// ! get specific post BUG

// router.get("/:postId", verifyToken, async (req, res) => {
//   try {
//     const specificpost = await Post.findById(req.params.postId);
//     res.json(specificpost);
//   } catch (err) {
//     res.json({
//       message: err,
//     });
//   }
// });

//patch post by id

router.patch("/:postId", verifyToken, async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: { title: req.body.title, description: req.body.description },
      }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

// ? Delete post build

router.delete("/:postId", verifyToken, async (req, res) => {
  try {
    await Post.remove({ _id: req.params.postId });
    res.status(200).json({message:"deleted successfully !!"});
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

// ? only post of the current user

router.route("/mypost").get(verifyToken, async (req, res) => {
  try {
    const getPosts = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id username"
    );
    res.json(getPosts);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
