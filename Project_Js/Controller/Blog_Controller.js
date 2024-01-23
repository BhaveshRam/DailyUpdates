const { ObjectId } = require("mongodb");
const { Blog } = require("../model/Blog");
const { User } = require("../model/User");
const { default: mongoose } = require("mongoose");

const getAllBlogs = async (req, res, next) => {
  let Blogs;
  try {
    Blogs = await Blog.find();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Error during retrieval" });
  }
  if (!Blogs) {
    return res.status(401).json({ msg: "No blogs found" });
  }
  res.status(200).json({ Blogs: Blogs });
};


const addBlog = async (req, res, next) => {
  const { title, description, author } = req.body;
  let existingUser 
  try{
    existingUser = await User.findById(author)
  }
  catch(err){
    console.log(err)
    return res.status(400).json({msg:"Can't find the user"})
  }
  if(!existingUser){
    return res.status(404).json({msg: "Unable to find the user with the ID"})
  }
  const blg = new Blog({
    title,
    description,
    author,
  });

  try {
    await blg.save()
    existingUser.blogs.push(blg)
    await existingUser.save()

  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: "Error while adding blog" });
  }

  res.status(200).json({msg: "Created Successfully!"});
};

const deleteBlog = async (req, res, next) => {
  let delNode;
  if (ObjectId.isValid(req.params.id)) {
    try {
      delNode = await Blog.findById(req.params.id).populate('author')
      await delNode.author.blogs.pull(delNode)
      await delNode.author.save()
      delNode = await Blog.findByIdAndDelete(req.params.id)
    } catch (err) {
      console.log(err);
      return res.status(403).json({ msg: "Can't delete the blog" });
    }
    res.status(200).json({msg: "Deleted Successfully!"})
  }else{
    res.status(404).json({msg:"Invalid ID"})
  }
};
const UpdateBlog = async (req,res,next) =>{
    let id = req.params.id
    let update= req.body
    if (ObjectId.isValid(id)) {
        try {
          updateNode = await Blog.findByIdAndUpdate(id,update);
        } catch (err) {
          console.log(err);
          return res.status(403).json({ msg: "Can't delete the blog" });
        }
        res.status(200).json({msg: "Updated Successfully!"})
      }else{
        res.status(404).json({msg:"Invalid ID"})
      }
}
module.exports = {
  getAllBlogs,
  addBlog,
  deleteBlog,
  UpdateBlog,
};
