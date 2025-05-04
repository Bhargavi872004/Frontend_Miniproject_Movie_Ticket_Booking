const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  if (!path.extname(filePath)) filePath += '.html';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': path.extname(filePath) === '.html' ? 'text/html' : 'image/jpeg' });
      res.end(content);
    }
  });
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));