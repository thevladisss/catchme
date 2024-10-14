const {createServer} = require("http")
const {promisify} =  require("node:util")
const readFile = promisify(require("fs").readFile);
const path = require("path")

const PORT = process.env.PORT ?? 8081;

const bootHttpServer = () => {
  const server = createServer(async function (req, res) {

    const html = await readFile(path.join(__dirname, "../build/index.html"))
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200)
    res.end(html); //end the response
  });

  server.listen(PORT, () => {
    console.log(`Server listens on ${PORT}`)
  }); //the serv

  return () => {
    server.close()
  }
}

module.exports = {
  bootHttpServer
}
