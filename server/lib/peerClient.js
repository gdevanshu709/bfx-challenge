const { PeerRPCClient } = require('grenache-nodejs-http')
const link = require('./link')

// initialize Grape Client instance
const client = new PeerRPCClient(link, {})
client.init()

module.exports = client
