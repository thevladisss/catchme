var http = require('http');
const connectionEvents = require('../src/enums/event_type')

//create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080

const {WebSocketServer} = require('ws');
const {uniqueId} = require("lodash/util");

const wss = new WebSocketServer({ port: 7071 })

/**
 *
 * @type {Map<WebSocket, { id: string; color: string }>}
 */
const clients = new Map();

const getActiveUsersId = () => {
  return [...clients.values()].map(({id}) => id)
}

wss.on("connection", (ws) => {
  const id = uniqueId()
  const color = Math.floor(Math.random() * 360);
  const metadata = { id, color };


  clients.set(ws, metadata);

  ws.on('message', (event) => {
    console.log("Message was sent: ", JSON.parse(event))
  })


  clients.forEach((client, connection) => {

    if (connection.readyState === WebSocket.OPEN) {

      connection.send(JSON.stringify({
        connectionId: 1,
        type: connectionEvents.EVENT_USER_CONNECTED,
        id: client.id,
        color: client.color,
        playersCount: clients.size,
        playersOnline: getActiveUsersId()
      }))
    }
  })

  ws.on('close', () => {

    clients.forEach((client, ws ) => {
      clients.delete(ws)

      ws.send(JSON.stringify({
        connectionId: 1,
        type: connectionEvents.EVENT_USER_DISCONNECTED,
        id: client.id,
        color: client.color,
        playersCount: clients.size,
        playersOnline: getActiveUsersId()
      }))
    })
  })
})


