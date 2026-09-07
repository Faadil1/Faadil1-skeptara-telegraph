import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const port = Number(process.env.PORT || 4173);

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const requested = url.pathname === '/' ? '/index.html' : url.pathname;
  const resolved = path.resolve(root, `.${requested}`);
  if (!resolved.startsWith(root)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(resolved, (error, data) => {
    if (error) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
    const ext = path.extname(resolved);
    const type = ext === '.html' ? 'text/html; charset=utf-8' : ext === '.json' ? 'application/json; charset=utf-8' : 'application/octet-stream';
    res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
    res.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`[Skeptara demo] judge surface: http://127.0.0.1:${port}`);
  console.log('[Skeptara demo] static captured-live evidence only; no wallet or GitHub write credential required.');
});
