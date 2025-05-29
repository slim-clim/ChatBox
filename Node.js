const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8090 });

server.on('connection', (ws) => {
  console.log('New client connected!');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    const response = generateResponse(message);
    ws.send(response);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

function generateResponse(message) {
  // Simple chatbot logic
  if (message.toLowerCase().includes('hello')) {
    return 'Hello! How can I assist you today?';
  } else if (message.toLowerCase().includes('how are you')) {
    return 'I\'m doing well, thank you for asking!';
  } else {
    return 'I didn\'t quite understand that. Can you please rephrase?';
  }
}
