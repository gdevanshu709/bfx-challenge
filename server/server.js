const { processRequest } = require('./processor')
const server = require('./lib/peerServer')
const config = require('./config/app')
const link = require('./lib/link')
const logger = require('./lib/logger')

const service = server.transport(config.get('peer.transport.type'))

const port = 1024 + Math.floor(Math.random() * 1000)
service.listen(port)

setInterval(() => {
  link.announce(config.get('app.name'), service.port, {})
}, 1000)

service.on('request', processRequest)

logger.info(`Server has been started on ${port} port`)
