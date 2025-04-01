import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static('public'));

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.send('Hello from server (TS)!');

  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(`Server time: ${new Date().toLocaleTimeString()}`);
    }
  }, 3000);

  ws.on('message', (data: WebSocket.RawData) => {
    console.log(`Received from client: ${data.toString()}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server running at http://localhost:${PORT}`);
});
