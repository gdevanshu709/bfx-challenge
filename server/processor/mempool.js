const Pool = require('../blockchain/models/mempool')
const { processPendingOrders } = require('./block')
const OrdersList = require('../blockchain/models/ordersList')

/**
 * Utility function to list elements present in `MemPool`
 *
 * @date 2020-01-29
 * @param {Handler} handler
 * @returns {Response}
 */
async function list (handler) {
  return handler.reply(null, Pool.list())
}

/**
 * Utility function to add `Order` in the `MemPool`
 *
 * @date 2020-01-29
 * @param {Handler} handler
 * @param {Order} payload instance of `Order` class
 * @returns {Response}
 */
async function add (handler, payload) {
  Pool.add(payload)
  OrdersList.add(payload)

  await processPendingOrders()
  return handler.reply(null, 'state has been added to Mempool')
}

module.exports = { list, add }
