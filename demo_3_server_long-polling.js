const express = require('express');
const bodyParser = require('body-parser').json();

const app = express();
app.use(bodyParser);

const subscribers = [];

// POST http://localhost:8000/notification
app.post('/notification', (req, res) => {
    const message = req.body.message;
    console.log(`Sending notification:`, message);
    subscribers
        .filter(sub => !(sub.res.headersSent))
        .forEach(sub => sub.res.type('text').send(message));
    subscribers.length = 0;
    res.sendStatus(200);
});

// GET http://localhost:8000/notification
app.get('/notification', (req, res) => {
    subscribers.push({ req, res });
    console.log(`Subscribers: ${subscribers.length}`);
});

app.listen(8000);