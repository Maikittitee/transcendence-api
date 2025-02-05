const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 80;
const HOST = "0.0.0.0";

const options = {
    key: fs.readFileSync('/etc/nginx/ssl/nginx.key'), // Ensure this file exists
    cert: fs.readFileSync('/etc/nginx/ssl/nginx.crt'), // Ensure this file exists
};

const server = https.createServer(options, (req, res) => {
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

server.listen(PORT, HOST, () => {
    console.log(`Server running at https://0.0.0.0:${PORT}/`);
});
