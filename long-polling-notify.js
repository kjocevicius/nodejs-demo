const http = require('http');
const axios = require('axios').default;

const message = process.argv[2];
console.log(`Will send notification: ${message}`);

axios.post(
    'http://localhost:8000/notification',
    { message },
).then(() => console.log('sent!'));
