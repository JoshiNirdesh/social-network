const express = require("express");
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { verifyToken } = require("../middleware/auth");
const Post = require("../models/Post"); // Import Post model for search

const router = express.Router();

// Create a post (protected)
router.post("/", verifyToken, createPost);

// Get all posts
router.get("/", getAllPosts);

// Search posts by keyword (case insensitive)
router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q || "";
    const results = await Post.find({
      content: { $regex: keyword, $options: "i" },
    }).populate("author", "username");

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
});

// Get a single post by ID
router.get("/:id", getPost);

// Update a post by ID (protected)
router.put("/:id", verifyToken, updatePost);

// Delete a post by ID (protected)
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
