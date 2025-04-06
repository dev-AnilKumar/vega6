const fs = require("fs");
const BlogModel = require("../models/BlogModel");
const userModel = require("../models/userModel");

const createBlog = async (req, res) => {
    const file = req.files.blogImage;
    try {
        const imageBuffer = fs.readFileSync(file.tempFilePath);
        const imageBase64 = imageBuffer.toString('base64');

        await BlogModel.create({ ...req.body, author: req.user._id, blogImage: imageBase64 });
        res.status(201).json({ msg: "Blog Created Successfully", success: true });
    } catch (error) {
        console.log("Create Blog Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    } finally {
        fs.unlink((file.tempFilePath), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("deleted file")
            }
        });
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate("author", "name");
        res.status(200).json(blogs);
    } catch (error) {
        console.log("Get All Blogs Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogModel.findByIdAndUpdate({ _id: id }, {
            title: req.body.title,
            description: req.body.description,
        });
        res.status(200).json({ msg: "Blog Updated Successfully", success: true });
    } catch (error) {
        console.log("blog update Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Blog Deleted Successfully", success: true });
    } catch (error) {
        console.log("blog delete Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    }
}


module.exports = { createBlog, updateBlog, getAllBlogs, deleteBlog };