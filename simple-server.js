const http = require('http')
const port=3032
const server = http.createServer(function (request,response) {
    if (request.url === '/') {
        response.end('welcome to nodejs')
    } else if (request.url === '/about') {
        response.end('about page')
    } else if (request.url === '/users') {
        const users = [
            { id: '1', name: 'raj' },
            {id:'2',name:'ram'}
        ]
        response.end(JSON.stringify(users))
    } else if (request.url === '/sys_time') {
        const date = new Date()
        response.end(JSON.stringify({value:date}))
    } else {
        response.end('page not found')
    }
})
server.listen(port, function () {
    console.log('server is runing at', port)
})