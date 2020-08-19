const express = require('express');

const app = express();

const subscribers = [];

// POST http://localhost:8000/notification
app.post('/notification', (req, res) => {
    console.log(`Sending notification: ${req.body}`);
    subscribers
        .filter(sub => !(sub.res.headersSent))
        .forEach(sub => sub.res.sendStatus(200).send(req.body));
    subscribers.length = 0;
    res.sendStatus(200);
});

// GET http://localhost:8000/notification
app.get('/notification', (req, res) => {
    subscribers.push({ req, res });
    console.log(`Subscribers: ${subscribers.length}`);
});

app.listen(8000);