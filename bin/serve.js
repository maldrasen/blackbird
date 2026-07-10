// This script starts a static webserver for running the client in a plain browser instead of Electron. It serves the
// project root at http://localhost:8300/views/browser.html

const http = require('node:http');
const path = require('node:path');
const localFs = require('node:fs');

const ROOT = path.normalize(`${__dirname}/..`);
const PORT = 8300;

require('./compile-manifest.js');

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, `http://localhost:${PORT}`).pathname);

  if (urlPath === '/') {
    response.writeHead(302, { Location: '/views/browser.html' });
    return response.end();
  }

  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (filePath.startsWith(ROOT) === false) {
    response.writeHead(403, { 'Content-Type': 'text/plain' });
    return response.end('Forbidden');
  }

  localFs.readFile(filePath, (error, contents) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      return response.end(`Not found: ${urlPath}`);
    }

    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': type });
    response.end(contents);
  });
});

server.listen(PORT, () => {
  console.log(`=== Blackbird dev server: http://localhost:${PORT} ===`);
});
