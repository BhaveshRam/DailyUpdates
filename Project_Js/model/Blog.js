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
    },
    banner: {
        data: Buffer,
        type: String
    }
})

const Blog = mongoose.model("Blog", newSchema)

module.exports = {Blog}