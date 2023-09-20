const http = require('http')
const pets = require('./data/pets')
const PORT = process.env.PORT || 5000
const getRequestData = require('./utils')

const server = http.createServer(async (request, response) => {
    // GET methods
    if (request.url === '/pets' && request.method === 'GET') {
        response.writeHead(200, {
            'content-type': 'application/json'
        })
        response.end(JSON.stringify(pets))
        return;
    }
    if (request.url.match(/\/pets\/([0-9]+)/) && request.method ===
        'GET') {
        const id = request.url.split('/')[3]
        const pet = pets.find(t => t.id === parseInt(id))
        if (!pet) {
            response.writeHead(404, {
                'content-type': 'application/json'
            })
            response.end('No pet with the specified id is available')
            return;
        }
        response.writeHead(200, {
            'content-type': 'application/json'
        })
        response.end(JSON.stringify(pet))
        return;
    }
    // POST methods
    if (request.url === "/pets" && request.method === "POST") {
        const body = await getRequestData(request)
        const pet = JSON.parse(body)
        pets.push(pet)
        response.writeHead(201, {
            "Content-Type": "application/json"
        })
        response.end(JSON.stringify(pet))
        return;
    }
    // PUT methods
    if (request.url.match(/\/pets\/([0-9]+)/) && request.method ===
        'PUT') {
        const id = request.url.split('/')[3];
        const pet = pets.find((t) => t.id === parseInt(id));
        if (!pet) {
            response.writeHead(404, {
                'content-type': 'application/json'
            });
            response.end('No pet with the specified id is available');
            return;
        }
        let req_body = await getRequestData(request);
        let updatedPet = JSON.parse(req_body);
        const index = pets.indexOf(pet);
        pets[index] = updatedPet;
        response.writeHead(200, {
            'content-type': 'application/json'
        });
        response.end(JSON.stringify(updatedPet));
        return;
    }
    // DELETE methods
    if (request.url.match(/\/pets\/([0-9]+)/) && request.method ===
        'DELETE') {
        const id = request.url.split("/")[3]
        const pet = pets.find(t => t.id === parseInt(id))
        if (!pet) {
            response.writeHead(404, {
                'content-type': 'application/json'
            })
            response.end('No pet with the specified id is available')
            return;
        }
        const index = pets.indexOf(pet)
        pets.splice(index, 1)
        response.writeHead(200, {
            'content-type': 'application/json'
        })
        response.end('Delete the specified pet')
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
