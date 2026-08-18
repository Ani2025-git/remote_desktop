import { createServer } from 'http';

const PORT = process.env.PORT || 8080;
const sessions = new Map();

console.log(`[NovaDesktop Signal Server] Starting server on port ${PORT}...`);

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'ONLINE',
    service: 'NovaDesktop WebRTC Signaling Server',
    activeSessions: sessions.size,
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`[NovaDesktop Signal Server] Online at http://localhost:${PORT}`);
});
