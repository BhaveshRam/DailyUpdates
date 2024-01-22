const http = require('http')

const server = http.createServer()
//here it uses event emitter api to respond and take request
server.on('request', (req, res) =>{
    res.end("ram")
})
server.listen(3000)