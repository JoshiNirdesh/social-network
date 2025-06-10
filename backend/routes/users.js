const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser);

module.exports = router;
