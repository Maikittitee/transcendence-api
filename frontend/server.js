/* this file is only for quick test for frontend */

const http = require('http');
// const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 80;
const HOST = "0.0.0.0";

const options = {
    // key: fs.readFileSync('/nginx/ssl_certs/server.key'), // replace it with your key path
    // cert: fs.readFileSync('/nginx/ssl_certs/server.crt'), // replace it with your certificate path
    key: fs.readFileSync('/Users/maikittitee/Focusing/transcendence-api/nginx/ssl/nginx.key'), // replace it with your key path
    cert: fs.readFileSync('/Users/maikittitee/Focusing/transcendence-api/nginx/ssl/nginx.crt'), // replace it with your certificate path
}

const server = http.createServer((req, res) => {
    // Log incoming requests
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    const mimeTypes = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
    };

    contentType = mimeTypes[extname] || contentType;

    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.error(`Error loading ${filePath}:`, error.code);
            res.writeHead(error.code === 'ENOENT' ? 404 : 500);
            res.end(`${error.code === 'ENOENT' ? '404 Not Found' : '500 Internal Server Error'}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
