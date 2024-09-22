import { useRef } from "react";
import { connectWebSocketServer } from "../service/websocket";

export const useSockets = () => {
  const ws = useRef<WebSocket>(connectWebSocketServer());

  const closeConnection = () => {
    if (ws.current) ws.current.close();
  };

  return { ws, closeConnection };
};
