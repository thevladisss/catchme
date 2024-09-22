var http = require("http");
const SERVER_EVENTS = require("./enums/server_events");
const CLIENT_EVENTS = require("../src/enums/client_events");
const Connection = require("./service/connection");
const Player = require("./service/players");

//create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080

const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 7071 });

wss.on("connection", (ws) => {
  const connectionMetaData = Connection.storeConnection(ws);

  const clients = Connection.getAllConnections();

  ws.send(
    JSON.stringify({
      type: SERVER_EVENTS.EVENT_CONNECTION_ESTABLISHED,
      connectionId: connectionMetaData.id,
      createdAt: connectionMetaData.createdAt
    })
  )

  //Notifying client on connection
  clients.forEach((client, connection) => {
    if (client.id !== connectionMetaData.id && connection.readyState === WebSocket.OPEN) {
      connection.send(
        JSON.stringify({
          type: SERVER_EVENTS.EVENT_USER_CONNECTED,
          connectionId: connectionMetaData.id,
          createdAt: connectionMetaData.createdAt
        }),
      );
    }
  });

  ws.on("message", (event) => {
    const data = JSON.parse(event);

    if (data.event === CLIENT_EVENTS.EVENT_JOIN_GAME) {
      const player = Player.initializePlayer(ws,{
        nickname: data.nickname,
        color: data.color
      });

      const clients = Connection.getAllConnections();

      // Sending join notification to the user that just connected
      ws.send(
        JSON.stringify({
          event: SERVER_EVENTS.EVENT_USER_JOINED_GAME,
          playerId: player.playerId,
          nickname: player.nickname,
          left: player.left,
          top: player.top,
          color: player.color,
        }),
      );

      const players = Player.getAllPlayers();

      clients.forEach((client, connection) => {
        connection.send(
          JSON.stringify({
          event: SERVER_EVENTS.EVENT_USER_JOINED_GAME,
          playerId: player.playerId,
          players: [...players.values()],
        }));
      });
    }
    if (data.event === CLIENT_EVENTS.EVENT_LEFT_GAME) {
      const player = Player.getPlayer(ws);

      if (player) {
        Player.removePlayer(ws);

        const players = Player.getAllPlayers();

        players.forEach((client, connection) => {
          connection.send(
            JSON.stringify({
              event: SERVER_EVENTS.EVENT_USER_DISCONNECTED,
              playerId: player.playerId,
            }),
          );
        });
      }
    }

    if (data.event === CLIENT_EVENTS.EVENT_USER_MOVED) {
      const player = Player.getPlayer(ws);

      if (player) {
        Player.updatePlayerPosition(ws, data.left, data.top);

        const players = Player.getAllPlayers();

        const positions = Player.getPlayersPositions();

        players.forEach((client, connection) => {
          ws.send(
            JSON.stringify({
              event: SERVER_EVENTS.EVENT_USER_MOVED,
              playerId: player.playerId,
              positions,
            }),
          );
        });
      }
    }
  });

  ws.on("close", () => {
    Connection.removeConnection(ws);

    const player = Player.getPlayer(ws);

    if (player) {
      Player.removePlayer(ws);

      const players = Player.getAllPlayers();

      players.forEach((client, connection) => {
        connection.send(
          JSON.stringify({
            event: SERVER_EVENTS.EVENT_USER_DISCONNECTED,
            playerId: player.playerId,
          }),
        );
      });
    }
  });
});
