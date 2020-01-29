const Pool = require('../blockchain/models/mempool')
const { SUPPORTED_STATES, shareState } = require('./state')
const { processPendingOrders } = require('./block')
const { Order } = require('../blockchain/models/order')
const OrdersList = require('../blockchain/models/ordersList')

async function add(handler, payload) {
  const order = new Order(payload.client_id, payload.price_usd, payload.amount_btc)

  // add order in MemPool which contains the list of Pending transactions
  Pool.add(order)
  OrdersList.add(order)

  // share state with other worker
  await shareState(SUPPORTED_STATES.ADD_TO_POOL, order)

  await processPendingOrders()

  return handler.reply(null, {
    message: 'Your order has been added successfully in pool',
    order_id: order.id
  })
}

async function list(handler) {
  return handler.reply(null, OrdersList.list())
}

module.exports = { add, list }
