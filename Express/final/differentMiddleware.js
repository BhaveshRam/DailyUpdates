const express = require('express')
const app = express()
const morgan = require('morgan')
const {logger} = require('./MiddleWare')
const {authorize} = require('./MiddleWare')

/* Three types of middlewares (used like app.use())
    1. our own written like logger and authorize 
    2. express in built like express.static() etc..
    3. third party like morgan */

// app.use(express.static('./public'))
// app.use([logger, authorize])
// app.use('/api', logger) here the middleware is applied for all the get methods that are having /api/..
app.use (morgan('tiny'))

app.get('/', (req, res)=>{
    res.send("hello world")
})

app.get('/auth', (req,res) =>{
    res.send("authorization")
})

app.get('/api/items', [logger, authorize], (req,res)=>{
    //Using both middlewares at the same time
    res.send("items")
})

app.all('*', (req,res)=>{
    res.status(404).send("Resource not found..!")
})

app.listen(3000, ()=>{
    console.log('Server is listening on port 3000...');
})
