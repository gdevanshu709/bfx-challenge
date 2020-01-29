const convict = require('convict')
const logger = require('../lib/logger')

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'P2P_CLIENT',
      env: 'APP_NAME'
    },
  },

  grape_address: {
    doc: 'Link Grape Address',
    format: String,
    default: 'http://127.0.0.1:30001',
    env: 'GRAPE_ADDRESS'
  },

  offer: {
    add: {
      type: {
        doc: 'Add Offer Type',
        format: String,
        default: 'ADD_ORDER',
        env: 'ADD_ORDER_TYPE'
      }
    },
    list: {
      type: {
        doc: 'List pending offers type',
        format: String,
        default: 'LIST_PENDING_ORDERS',
        env: 'LIST_PENDING_ORDERS_TYPE'
      }
    }
  },

  worker: {
    // information of other blockchain instance
    name: {
      doc: 'Name of worker',
      format: String,
      default: 'P2P_WORKER',
      env: 'WORKER_NAME'
    },
  }
})

logger.info('Starting client with', config.toString())

config.validate({ allowed: 'strict' })

module.exports = config
