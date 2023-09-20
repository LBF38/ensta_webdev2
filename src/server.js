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
        return;
    }
    if (request.url === "/api/todos" && request.method === "POST") {
        const body = await getRequestData(request)
        const task = JSON.parse(body)
        todos.push(task)
        response.writeHead(201, {
            "Content-Type": "application/json"
        })
        response.end(JSON.stringify(task))
        return;
    }
    if (request.url.match(/\/api\/todos\/([0-9]+)/) && request.method ===
        'PUT') {
        const id = request.url.split('/')[3];
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            response.writeHead(404, {
                'content-type': 'application/json'
            });
            response.end('No todo with the specified id is available');
            return;
        }
        let req_body = await getRequestData(request);
        let updatedTask = JSON.parse(req_body);
        const index = todos.indexOf(todo);
        todos[index] = updatedTask;
        response.writeHead(200, {
            'content-type': 'application/json'
        });
        response.end(JSON.stringify(updatedTask));
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
