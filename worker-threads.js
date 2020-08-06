const express = require('express');
const fs = require('fs');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

console.log(`${process.pid} : Starting`);

if (isMainThread) {
    console.log('Spawn http server');

    const app = express();

    // http://localhost:8000/hello
    app.get('/hello', (req, res) => {
        console.log(`${process.pid} : Hi!`);
        res.json({
            message: 'Hello world!'
        })
    });

    // http://localhost:8000/compute
    app.get('/compute', (req, res) => {
        console.log(`${process.pid} : Compute!`)
        const worker = new Worker(__filename, { workerData: null });
        worker.on('message', (msg) => {
            res.json({
                message: 'done'
            });
        })
        worker.on('error', console.error);
        worker.on('exit', (code) => {
            if (code != 0)
                console.error(new Error(`Worker stopped with exit code ${code}`))
        });
    });

    app.listen(8000);
} else {
    console.log(`${process.pid} : I'm computing!`)
    let json = {};
    for (let i = 0; i < 100; i++) {
        // Blocking operation - reads file synchronously!
        json = JSON.parse(fs.readFileSync('./big-file.json', 'utf8'));
    }

    json.sort((a, b) => a.index - b.index);
    console.log(`${process.pid} : I've computed!`)

    parentPort.postMessage({});
}