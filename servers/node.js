import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello Node.js!');
});

server.listen(3000, () => console.log('http://localhost:3000'));

// Launch with: node node.js
