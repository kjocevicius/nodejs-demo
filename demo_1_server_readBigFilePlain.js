// Example without worker threads

const express = require('express');
const fs = require('fs');

console.log(`${process.pid} : Starting`);

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
    console.log(`${process.pid} : Compute!`);
    console.log(`${process.pid} : I'm computing!`);
    let json = {};
    for (let i = 0; i < 100; i++) {
        // Blocking operation - reads file synchronously!
        json = JSON.parse(fs.readFileSync('./big-file.json', 'utf8'));
    }

    json.sort((a, b) => a.index - b.index);
    console.log(`${process.pid} : I've computed!`)
    res.json({
        message: 'done'
    });
});

app.listen(8000);