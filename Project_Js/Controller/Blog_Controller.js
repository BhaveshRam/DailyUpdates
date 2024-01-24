const { ObjectId } = require("mongodb");
const { Blog } = require("../model/Blog");
const { User } = require("../model/User");
const { default: mongoose } = require("mongoose");
const { compareSync } = require("bcryptjs");

const getAllBlogs = async (req, res, next) => {
  let Blogs;
  try {
    const existingUser = await User.findById(req.user.id).populate('blogs')
    Blogs = existingUser.blogs
  } catch (err) {
    console.log(err);
    return res.status(402).json({ msg: "Invalid request" });
  }
  if (!Blogs) {
    return res.status(400).json({ msg: "No Blogs present" });
  }
  res.status(200).json({ blogs: Blogs, msg: "Successfull" });
};

const getImage = async (req, res, next)=>{
  let existingUser
  let image
  try{
    existingUser = await User.findById(req.user.id)
  }
  catch(err){
    console.log(err);
    return res.status(400).json({msg: "Invalid user"})
  }
  if (ObjectId.isValid(req.params.id)){
    try{
      image = await Blog.findById(req.params.id)
      if (image.author.ObjectId !== existingUser._id.ObjectId){
        return res.status(404).json({msg: "Invavlid Blog"})
      }
      banner = image.banner
      if(!banner){
        return res.json({msg: "There is no image "})
      }
      return res.status(200).json({image: "uploads//"+banner})
      
    }
    catch (err){
      console.log(err);
      return res.status(400).json({msg: "Can't find the blog"})
    }
  }else{
    return res.status(400).json("Invalid Blog ID")
  }
}

const addBlog = async (req, res, next) => {

  const {title, description } = req.body;
  const blog = new Blog({
    title,
    description,
    author: req.user.id,
  })
  if(req.file){
    blog.banner = req.file.filename 
  }
  try{
    await blog.save()
    const existingUser = await User.findById(req.user.id)
    existingUser.blogs.push(blog)
    await existingUser.save()
  }
  catch(err) {
    console.log(err)
    return res.status(404).json({msg: "Error creating the blog"})
  }
  res.status(200).json({msg: "Created Successfully!"})
};

// const addBlog = async (req, res, next) => {
//   const { title, description, author } = req.body;
//   let existingUser
//   try{
//     existingUser = await User.findById(author)
//   }
//   catch(err){
//     console.log(err)
//     return res.status(400).json({msg:"Can't find the user"})
//   }
//   if(!existingUser){
//     return res.status(404).json({msg: "Unable to find the user with the ID"})
//   }
//   const blg = new Blog({
//     title,
//     description,
//     author,
//   });

//   try {
//     await blg.save()
//     existingUser.blogs.push(blg)
//     await existingUser.save()

//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({ msg: "Error while adding blog" });
//   }

//   res.status(200).json({msg: "Created Successfully!"});
// };

const deleteBlog = async (req,res,next) =>{
  let delNode;
  let existingUser
  try{
    existingUser = await User.findById(req.user.id)
  }
  catch(err){
    console.log(err);
    return res.status(400).json({msg: "Invalid user"})
  }
  if (ObjectId.isValid(req.params.id)){
    try{
      delNode = await Blog.findById(req.params.id)
      if (delNode.author.ObjectId !== existingUser._id.ObjectId){
        console.log(delNode, "--------", existingUser);
        return res.status(404).json({msg: "Invavlid Blog"})
      }
      existingUser.blogs.pull(delNode._id)
      await existingUser.save()
      await Blog.findByIdAndDelete(delNode._id)
    }
    catch (err){
      console.log(err);
      return res.status(400).json({msg: "Can't delete the blof"})
    }
  }else{
    return res.status(400).json("Invalid Blog ID")
  }
  res.status(200).json({msg: "Successfully deleted"})
}

// const deleteBlog = async (req, res, next) => {
//   let delNode;
//   if (ObjectId.isValid(req.params.id)) {
//     try {
//       delNode = await Blog.findById(req.params.id).populate("author");
//       await delNode.author.blogs.pull(delNode);
//       await delNode.author.save();
//       delNode = await Blog.findByIdAndDelete(req.params.id)``;
//     } catch (err) {
//       console.log(err);
//       return res.status(403).json({ msg: "Can't delete the blog" });
//     }
//     res.status(200).json({ msg: "Deleted Successfully!" });
//   } else {
//     res.status(404).json({ msg: "Invalid ID" });
//   }
// };

const UpdateBlog = async (req, res, next) => {
  let id = req.params.id;
  let update = req.body;
  let existingUser
  let updateNode
  try{
    existingUser = await User.findById(req.user.id)
  }catch(err){
    console.log(err);
    res.status(400).json({msg: "Invalid user"})
  }
  if (ObjectId.isValid(id)) {
    try {
      updateNode = await Blog.findById(req.params.id)
      if (updateNode.author.ObjectId !== existingUser._id.ObjectId){
        return res.status(404).json({msg: "Invavlid Blog"})
      }
      console.log(req.body)
      if (req.file){
        updateNode.banner = req.file.filename
        await updateNode.save()
      }
      updateNode = await Blog.findByIdAndUpdate(id, update);
    } catch (err) {
      console.log(err);
      return res.status(403).json({ msg: "Can't Update the blog" });
    }
    res.status(200).json({ msg: "Updated Successfully!" });
  } else {
    res.status(404).json({ msg: "Invalid ID" });
  }
};

// const UpdateBlog = async (req, res, next) => {
//   let id = req.params.id;
//   let update = req.body;
//   if (ObjectId.isValid(id)) {
//     try {
//       updateNode = await Blog.findByIdAndUpdate(id, update);
//     } catch (err) {
//       console.log(err);
//       return res.status(403).json({ msg: "Can't delete the blog" });
//     }
//     res.status(200).json({ msg: "Updated Successfully!" });
//   } else {
//     res.status(404).json({ msg: "Invalid ID" });
//   }
// };

const blogPosts = async (req, res, next) =>{
  let blogs
  let populatedOnes
  console.log(req.query)
  try{
    blogs = await Blog.find()
  }
  catch(err){
    console.log(err);
    return res.status(400).json({msg: "Unable to fetch data"})
  }
  if ('author' === req.query.include){
    populatedOnes = await Promise.all(blogs.map(async (post) => {
      const x = await post.populate({
        path:'author',
        select: '-password'
      })
      console.log(x)
      return x
    }))
    // await blogs.populate('author')
    return res.status(200).json({posts: populatedOnes})
  }
  res.status(200).json({posts: blogs})
}

const findBlog = async (req, res, next)=>{
  let id = req.params.id
  console.log(id);
  try{
    const blog = await Blog.aggregate([
      {
        $match : {
          _id : new mongoose.Types.ObjectId(id)
        }
      }
    ])
    res.status(200).json(blog)
  }catch(err){
    console.log(err);
    return res.status(400).json({msg: "unable to find the blog"})
  }
}

const findUser = async (req, res, next) => {
  let id = req.params.id
  try{
    const blog = await User.aggregate([
      {
        $match : {
          _id : new mongoose.Types.ObjectId(id)
        }
      },
      {
        $project : {
          _id : 1,
          name : 1,
          email : 1,
          blogs : 1
        }
      }
    ])
    res.status(200).json(blog)
  }catch(err){
    console.log(err);
    return res.status(400).json({msg: "unable to find the blog"})
  }
}

module.exports = {
  getAllBlogs,
  addBlog,
  deleteBlog,
  UpdateBlog,
  getImage,
  blogPosts,
  findBlog,
  findUser,
};
