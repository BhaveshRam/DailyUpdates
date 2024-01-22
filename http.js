const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write("Hello world")
        res.end()
    }
    if (req.url === '/about'){
        res.write("Its  about my Practice -- Ram ;)")
        res.end()
    }
})

server.listen(3000, () =>{
    console.log("Server listening on port 3000....")
})