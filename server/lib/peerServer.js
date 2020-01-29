const { PeerRPCServer } = require('grenache-nodejs-http')
const config = require('../config/app')
const link = require('./link')

// initialize Grape Server
const server = new PeerRPCServer(link, {
  timeout: config.get('peer.timeout')
})
server.init()

module.exports = server
