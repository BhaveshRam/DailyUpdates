const express = require('express')
const router = express.Router()
const {getAllBlogs, addBlog, deleteBlog, UpdateBlog} = require('../Controller/Blog_Controller')

router.get("/allblogs", getAllBlogs)
router.post('/addblog', addBlog)
router.delete('/blogd/:id', deleteBlog )
router.patch('/blogu/:id', UpdateBlog)

module.exports = router