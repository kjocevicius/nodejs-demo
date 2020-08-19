const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');

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
    subscribe();
    console.log(`Worker ${process.pid} started`);
}

function subscribe() {

    http.get('http://localhost:8000/notification', (resp) => {
        console.log(`${process.pid}: subscribed!`);

        if (resp.statusCode === 502) {
            // Connection timeout - lets resubscribe!
            subscribe();
        } else if (resp.statusCode !== 200) {
            console.error(`${resp.statusCode}: ${resp.statusMessage}`);
            setTimeout(() => subscribe(), 1000);
        } else {
            resp.on('data', (chunk) => console.log(`${process.pid}: Got message: ${chunk}`));
            subscribe();
        }

    }).on('error', (e) => {
        console.error(`${process.pid}: Error`);
        setTimeout(() => subscribe(), 1000);
    });

}