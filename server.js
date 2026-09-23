const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 80;
const startTime = Date.now();

const server = http.createServer((req, res) => {
    // API status endpoint
    if (req.url === '/api/status') {
        const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'online',
            service: 'Web Coding Competition 2026 - Peserta 1',
            timestamp: new Date().toISOString(),
            uptime: `${uptimeSeconds} seconds`,
            platform: `${os.type()} ${os.release()} (${os.arch()})`,
            memoryUsage: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
            allocatedSpecs: {
                cpu: '1 vCPU',
                ram: '2048 MB (2 GB)'
            }
        }, null, 2));
        return;
    }

    // Serve static files
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.svg': 'image/svg+xml'
    };

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
            res.end(content);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Competition Demo Server running on port ${PORT}`);
});
