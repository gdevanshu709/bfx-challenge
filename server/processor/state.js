const config = require('../config/app')
const client = require('../lib/peerClient')
const logger = require('../lib/logger')

const SUPPORTED_STATES = {
  ADD_ORDER: 'ADD_ORDER',
  LIST_PENDING_ORDERS: 'LIST_PENDING_ORDERS',
  ADD_TO_POOL: 'ADD_TO_POOL',
  SYNC_BLOCK: 'SYNC_BLOCK'
}

async function shareState (type, state) {
  return new Promise((resolve, reject) => {
    client.request(config.get('neighbor.name'), { type, state }, { timeout: 10000 }, (err, data) => {
      if (err) {
        logger.error('Error in sharing state with other worker mempool', err)
        return reject(err)
      }

      logger.info('Shared state with worker', { worker: config.get('neighbor.name'), state })
      return resolve(data)
    })
  })
}

module.exports = { SUPPORTED_STATES, shareState }
