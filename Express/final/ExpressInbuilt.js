// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen


const express = require('express')
const app = express()

app.get('/', (req, res) => {
  console.log('user opened resource')
  res.status(200).send('Home Page')
})

app.get('/about', (req, res) => {
  res.status(200).send('About Page')
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})

