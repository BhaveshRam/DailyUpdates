const express= require('express')
const router = require('./Router/UserRouter');
const blogRouter = require('./Router/BlogRouter')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieparser())
// app.use(express.urlencoded({extended:false}))
// app.use(express.json())
app.use(router)
app.use(blogRouter)

mongoose.connect(
    "mongodb://localhost:27017/Project"
).then(
    app.listen(3000, ()=>{
        console.log("Server is listening on port 3000")
    })
).catch(err =>{
    console.log(err)
})