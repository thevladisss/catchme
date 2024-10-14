const {bootWebsocketServer} = require("./ws-server.js")
const {bootHttpServer} = require("./http-server")

bootHttpServer()
bootWebsocketServer()
