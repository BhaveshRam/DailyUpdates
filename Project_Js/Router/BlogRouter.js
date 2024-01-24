const express = require('express')
const router = express.Router()
const {getAllBlogs, addBlog, deleteBlog, UpdateBlog, getImage, blogPosts, findBlog, findUser} = require('../Controller/Blog_Controller')
const { requireAuth } = require('../middleware/authentication')
const { upload } = require('../middleware/upload')

router.get("/allblogs", requireAuth, getAllBlogs)
router.post('/addblog',[requireAuth, upload.single('banner')], addBlog)
router.delete('/blogd/:id', requireAuth,deleteBlog )
router.patch('/blogu/:id',[requireAuth, upload.single('banner')], UpdateBlog)
router.get('/getImage/:id', requireAuth, getImage)
router.get('/blogs/posts', blogPosts)
router.get('/user/:id', findUser)
router.get('/blog/:id', findBlog)

module.exports = router