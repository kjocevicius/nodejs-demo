const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const axios = require('axios').default;

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

    axios.get('http://localhost:8000/notification')
        .then(resp => {
            resp.status

            if (resp.status === 502) {
                // Connection timeout - lets resubscribe!
                subscribe();
            } else if (resp.status !== 200) {
                console.error(`${resp.status}: ${resp.statusMessage}`);
                setTimeout(() => subscribe(), 1000);
            } else {
                console.log(`${process.pid}: Got message: ${resp.data}`);
                subscribe();
            }
        }).catch(e => {
            console.error(e.code);
            setTimeout(() => subscribe(), 1000);
        });
    console.log(`${process.pid}: subscribed!`);

}