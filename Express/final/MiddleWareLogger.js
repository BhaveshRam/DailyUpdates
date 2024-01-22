const express = require('express')
const app = express()

const logger = (req, res, next) =>{
    const url = req.url
    const method = req.method
    const time = new Date().getFullYear()
    console.log(url,method,time);
    next()
}

app.get('/', logger, (req, res)=>{
    res.send("hello world")
})

app.all('*', (req,res)=>{
    res.status(404).send("Resource not found..!")
})

app.listen(3000, ()=>{
    console.log('Server is listening on port 3000...');
})
