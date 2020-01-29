const Pool = require('../blockchain/models/mempool')
const { processPendingOrders } = require('./block')
const OrdersList = require('../blockchain/models/ordersList')

// [TODO] support for pagination
async function list (handler) {
  return handler.reply(null, Pool.list())
}

async function add (handler, payload) {
  Pool.add(payload)
  OrdersList.add(payload)

  await processPendingOrders()
  return handler.reply(null, 'state has been added to Mempool')
}

module.exports = { list, add }
