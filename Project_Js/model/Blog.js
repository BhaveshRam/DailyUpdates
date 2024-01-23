const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    }
})

const Blog = mongoose.model("Blog", newSchema)

module.exports = {Blog}