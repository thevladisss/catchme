export const connectWebSocketServer = (): WebSocket => {
  //TODO: Check typing of process.env
  const ws = new WebSocket("ws://localhost:7071");

  return ws;
};
