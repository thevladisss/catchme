const SERVER_EVENTS = require("./enums/server_events");
const CLIENT_EVENTS = require("../src/enums/client_events");
const Connection = require("./service/connection");
const Player = require("./service/players");
const Point = require("./service/Point");

const { WebSocketServer, WebSocket } = require("ws");
const {random} = require("lodash/number");
const {range} = require("lodash/util");

const PORT = process.env.WS_PORT ?? 7071;
const bootWebsocketServer = () => {
  const wss = new WebSocketServer({ port: PORT });

  wss.on("connection", (ws) => {

    const connectionMetaData = Connection.storeConnection(ws);


    const clients = Connection.getAllConnections();

    ws.send(
      JSON.stringify({
        event: SERVER_EVENTS.CONNECT_SUCCESS,
        connectionId: connectionMetaData.id,
        createdAt: connectionMetaData.createdAt
      })
    )

    //Notifying client on connection
    clients.forEach((client, connection) => {
      if (client.id !== connectionMetaData.id && connection.readyState === WebSocket.OPEN) {
        connection.send(
          JSON.stringify({
            event: SERVER_EVENTS.NEW_USER_CONNECT,
            connectionId: connectionMetaData.id,
            createdAt: connectionMetaData.createdAt
          }),
        );
      }
    });

    ws.on("message", (event) => {
      const data = JSON.parse(event);

      if (data.event === CLIENT_EVENTS.PLAYER_JOIN) {
        const player = Player.initializePlayer(ws);

        const clients = Connection.getAllConnections();

        const players = Player.getAllPlayers();

        // Sending join notification to the user that just connected
        ws.send(
          JSON.stringify({
            event: SERVER_EVENTS.JOIN_GAME_SUCCESS,
            playerId: player.playerId,
            nickname: player.nickname,
            left: player.left,
            top: player.top,
            color: player.color,
          }),
        );

        const points = Point.getAllPoints();

        ws.send(
          JSON.stringify({
            points,
            event: "points_appear"
          })
        )

        //Notifying all clients about new player
        clients.forEach((client, connection) => {
          connection.send(
            JSON.stringify({
              event: SERVER_EVENTS.PLAYER_CONNECT,
              playerId: player.playerId,
              players: [...players.values()],
            }));
        });
      }
      if (data.event === CLIENT_EVENTS.PLAYER_LEAVE) {
        const player = Player.getPlayer(ws);

        if (player) {
          Player.removePlayer(ws);

          ws.send(
            JSON.stringify({
              event: SERVER_EVENTS.QUIT_GAME_SUCCESS,
              playerId: player.playerId
            })
          )

          const players = Player.getAllPlayers();

          players.forEach((client, connection) => {
            connection.send(
              JSON.stringify({
                event: SERVER_EVENTS.PLAYER_LEFT,
                playerId: player.playerId,
              }),
            );
          });
        }
      }

      if (data.event === CLIENT_EVENTS.PLAYER_MOVE) {
        const player = Player.getPlayer(ws);

        if (player) {
          const newPosition = Player.updatePlayerPosition(ws, data.left, data.top);

          let hasTakenPoint = Point.deletePointByPosition(newPosition);

          ws.send(
            JSON.stringify({
              playerId: player.playerId,
              event: SERVER_EVENTS.MOVE_SUCCESS
            })
          )

          const players = Player.getAllPlayers();

          const positions = Player.getPlayersPositions();

          if (hasTakenPoint) {

            const { score } = Player.updateScoreByOnePoint(ws)
            //Implement scoring logic

            const points = Point.getAllPoints();

            ws.send(
              JSON.stringify({
                event: SERVER_EVENTS.POINT_PICK,
                score
              })
            )

            players.forEach((client, connection) => {
              connection.send(
                JSON.stringify({
                  points,
                  event: SERVER_EVENTS.POINTS_APPEAR
                })
              )

              connection.send(
                JSON.stringify({
                  event: SERVER_EVENTS.LOG_MESSAGE,
                  message: `Player  ${player.nickname} has taken a point`
                })
              )
            })
          }

          players.forEach((client, connection) => {
            connection.send(
              JSON.stringify({
                event: SERVER_EVENTS.PLAYERS_POSITIONS_UPDATE,
                playerId: player.playerId,
                players: [...players.values()],
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
              event: SERVER_EVENTS.USER_DISCONNECT,
              playerId: player.playerId,
            }),
          );
        });
      }
    });
  });

  wss.on("listening", (f) => {
    console.log(`Websocket server listening on port: ${PORT}`)

    // random(10, 20)
    /*
      1. Get all players and create random amount of points at places that do not
      match places players and within distance of 5 px from them
      2. Create logic that tracks if user's position matches position of point
      3. If it matches the position of the player - delete the point and add it to player
      4. If there are less points then specific amount - spawn new points
     */

    setInterval(() => {

      const players = Player.getAllPlayers();

      let points = Point.getAllPoints();


      //TODO: Creare util function that gets random position
      const getRandomPosition = () => {
        return {
          left: random(0, 500),
          top: random(0,500)
        }
      }

      if (points.length < 30) {

        const amountToCreate = range(10, 40);

        points = Point.bulkCreatePoints(amountToCreate.map(() => {

          const position = getRandomPosition();

          return {
            ...position,
            value: 1,
          }
        }))

        players.forEach((client, connection) => {
          connection.send(
            JSON.stringify({
              points,
              event: "points_appear"
            })
          )
        })
      }
    }, 1000)
  })


  return () => {
    wss.close()
  }
}

module.exports = {
  bootWebsocketServer
}
