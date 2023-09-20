const http = require('http')
const todos = require('./data/todos')
const PORT = process.env.PORT || 5000
const getRequestData = require('./utils')

const server = http.createServer(async (request, response) => {
    if (request.url === '/api/todos' && request.method === 'GET') {
        response.writeHead(200, {
            'content-type': 'application/json'
        })
        response.end(JSON.stringify(todos))
    } else if (request.url === "/api/todos" && request.method === "POST") {
        const body = await getRequestData(request)
        const task = JSON.parse(body)
        todos.push(task)
        response.writeHead(201, {
            "Content-Type": "application/json"
        })
        response.end(JSON.stringify(todos))
        return;
    }
})

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})

server.on('error', (error) => {
    if (error.code = 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use`)
    }
})
