const http = require('http')
const users = require('../manager/users')
const books = require('../manager/books')

const parseQuery = (req) => {
    let pairs = {}
    let lists = req.url.split('?')[1].split('&')
    lists.forEach(pair => {
        let tmp = pair.split('=')
        pairs[tmp[0]] = tmp[1]
    });
    return pairs
}

const parseMethod = (req) => {
    switch (req.method) {
        case 'POST':
            return parseQuery(req)
    
        default:
            return
    }
}

const parseRoute = (req, res) => {
    let routes = req.url.split('/')
    switch (routes[1]) {
        case 'users':
            return users(res, routes[2], parseMethod(req))
            break;
        case 'books':
            return books(res, routes[2], parseMethod(req))
            break;
        default:
            break;
    }
}


const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json')
    console.log(req.url.split('/')[1])

    res.end('server is running')
    parseRoute(req, res)
})
const host = 'localhost'
const port = process.env.PORT || 8000

server.listen(port, host, (err)=> {
    if (err) {
        return console.log(`Server is not running`)
    }
    console.log(`Server is running on ${host}:${port}`)
})