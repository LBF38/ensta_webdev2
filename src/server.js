const http = require('http')
const todos = require('./data/todos')
const PORT = process.env.PORT || 5000

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    })
    response.end("Hello World")
})

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})

server.on('error', (error) => {
    if (error.code = 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use`)
    }
})
