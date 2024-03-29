const express = require('express')
const app = express()
const {people} = require('./data')


app.use(express.static('./methods-public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/api/people', (req,res)=>{
    res.status(200).json({success: true, data: people})
})

app.post('/api/people', (req,res)=>{
    const { name } = req.body
    if (!name){
        return res.status(401).json({success:false,msg:'Please provide name'})
    }
    res.status(201).json({success:true, person:name})
})

app.post('/login', (req,res)=>{
    const {name} = req.body
    console.log(req.body);
    if (name){
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(404).send('Please provide credentials!')
})

app.all('*', (req,res)=>{
    res.status(404).send("Resource not found..!")
})

app.listen(3000, ()=>{
    console.log('Server is listening on port 3000');
})
