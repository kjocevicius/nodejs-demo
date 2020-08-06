const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
let requestsCount = 0;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server on http://localhost:8000/
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
        requestsCount++;
    }).listen(8000);

    setInterval(() => {
        console.log(`${new Date().toISOString()} : Worker ${process.pid} handled ${requestsCount} requests...`)
    }, 5000)

    console.log(`Worker ${process.pid} started`);
}