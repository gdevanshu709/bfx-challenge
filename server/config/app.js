const convict = require('convict')
const logger = require('../lib/logger')

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'P2P_WORKER',
      env: 'APP_NAME'
    },
    blockCreatingResponsibility: {
      doc: 'Block creating responsibility.',
      format: String,
      default: 'even',
      env: 'BLOCK_CREATING_RESPONSIBILITY'
    }
  },

  grape_address: {
    doc: 'Link Grape Address',
    format: String,
    default: 'http://127.0.0.1:30001',
    env: 'GRAPE_ADDRESS'
  },

  peer: {
    transport: {
      type: {
        doc: 'Peer Transport Type',
        format: String,
        default: 'server',
        env: 'PEER_TRANSPORT_TYPE'
      }
    },
    timeout: {
      doc: 'Server-side socket timeout',
      format: Number,
      default: 300000,
      env: 'PEER_SOCKET_TIMEOUT'
    }
  },
  neighbor: {
    // information of other blockchain instance
    name: {
      doc: 'Name of other workers',
      format: String,
      default: 'P2P_WORKER',
      env: 'OTHER_WORKER_NAME'
    }
  }
})

logger.info('Starting service with', config.toString())

config.validate({ allowed: 'strict' })

module.exports = config
