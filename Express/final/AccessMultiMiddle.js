const express = require('express')
const app = express()

const {logger} = require('./MiddleWare')
const {authorize} = require('./MiddleWare')

app.use([logger, authorize])
// app.use('/api', logger) here the middleware is applied for all the get methods that are having /api/..
app.get('/', (req, res)=>{
    res.send("hello world")
})

app.get('/auth', (req,res) =>{
    res.send("authorization")
})

app.all('*', (req,res)=>{
    res.status(404).send("Resource not found..!")
})

app.listen(3000, ()=>{
    console.log('Server is listening on port 3000...');
})
