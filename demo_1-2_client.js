
const http = require('http');

console.time("requestCompute");
console.time("requestHello");

console.log('Compute!');
http.get('http://localhost:8000/compute', (resp) => {
    console.timeEnd("requestCompute");
}).on("error", (err) => {
    console.log("Error: " + err.message);
});

setTimeout(() => {
    console.log('Hello!');
    http.get('http://localhost:8000/hello', (resp) => {
        console.timeEnd("requestHello");
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}, 500)
