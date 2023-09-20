const getRequestData = (request) => {
    return new Promise((resolve, reject) => {
        try {
            let body = []
            request.on('data', (chunk) => {
                body.push(chunk)
            }).on('end', () => {
                body = Buffer.concat(body).toString()
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = getRequestData
