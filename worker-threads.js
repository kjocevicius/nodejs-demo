const express = require('express');
const fs = require('fs');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

console.log("Starting");

if (isMainThread) {
    console.log("Spawn http server");

    const app = express();

    app.get('/hello', (req, res) => {
        res.json({
            message: 'Hello world!'
        })
    });

    app.get('/compute', (req, res) => {

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
    let json = {};
    for (let i = 0; i < 100; i++) {
        json = JSON.parse(fs.readFileSync('./big-file.json', 'utf8'));
    }

    json.data.sort((a, b) => a.index - b.index);

    parentPort.postMessage({});
}