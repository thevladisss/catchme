export const connectWebSocketServer = (): WebSocket => {
  //TODO: Check typing of process.env
  const ws = new WebSocket("ws://10.0.0.38:7071");

  return ws;
};
