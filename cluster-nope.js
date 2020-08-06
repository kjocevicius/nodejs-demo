const cluster = require('cluster');
const http = require('http');
let requestsCount = 0;


http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
    requestsCount++;
}).listen(8000);

setInterval(() => {
    console.log(`${new Date().toISOString()} : Worker ${process.pid} handled ${requestsCount} requests...`)
}, 5000)

console.log(`Worker ${process.pid} started`);