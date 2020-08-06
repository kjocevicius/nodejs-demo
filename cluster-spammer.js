
const http = require('http');

const requests = 10000;
let requestsCompleted = 0;


for (let i = 0; i < requests; i++) {
    http.get('http://localhost:8000/', (resp) => {
        requestsCompleted++;
        if (requestsCompleted === requests) {
            console.log(`Completed ${requestsCompleted} requests!`)
        }
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

console.log(`Started ${requests} requests!`)
