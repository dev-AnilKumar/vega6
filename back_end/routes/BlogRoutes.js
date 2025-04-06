const express = require("express");
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require("../controllers/blogCtrl");
const authmiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authmiddleware, createBlog);
router.get("/get", authmiddleware, getAllBlogs);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

module.exports = router;