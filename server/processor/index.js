const orders = require('./order')
const mempool = require('./mempool')
const logger = require('../lib/logger')
const { SUPPORTED_STATES } = require('./state')
const blocks = require('./block')

/**
 * Generic handler to handle all kinds of requests received by Worker
 *
 * @date 2020-01-29
 * @param {any} rid
 * @param {any} key
 * @param {Object} payload
 * @param {Handler} handler
 * @returns {Response}
 */
async function processRequest(rid, key, payload, handler) {
  logger.info('Received request', payload)

  switch (payload.type) {
    case SUPPORTED_STATES.ADD_ORDER:
      return orders.add(handler, payload.order)
    case SUPPORTED_STATES.LIST_PENDING_ORDERS:
      return orders.list(handler)
    case SUPPORTED_STATES.ADD_TO_POOL:
      return mempool.add(handler, payload.state)
    case SUPPORTED_STATES.SYNC_BLOCK:
      return blocks.syncBlock(handler, payload.state)
  }

  handler.reply(null, 'Invalid request')
}

module.exports = { processRequest }
