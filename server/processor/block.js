const _ = require('lodash')
const Pool = require("../blockchain/models/mempool")
const Blockchain = require("../blockchain/models/blockchain")
const { Transaction } = require("../blockchain/models/transactions")
const config = require('../config/app')
const { SUPPORTED_STATES, shareState } = require('./state')

const RESPONSIBILITY_TYPE = {
  even: 0,
  odd: 1
}

const MY_RESPONSIBILITY = config.get('app.blockCreatingResponsibility')

/**
 * Processor to process all the `Orders` that are currently in the pending state
 * Create and commits block in Blockchain only if the turn is of the current worker
 *
 * @date 2020-01-29
 */
async function processPendingOrders() {
  if (!checkTurn()) return

  const orders = Pool.list()
  const transactions = []

  // Create transactions of orders
  orders.forEach(order => {
    const transaction = new Transaction(order)
    transactions.push(transaction)
  })

  if (transactions.length === 0) return
  // Add block on blockchain
  const block = Blockchain.commitTransactions(transactions)

  const orderIds = _.map(orders, 'id')
  Pool.remove(orderIds)

  await shareState(SUPPORTED_STATES.SYNC_BLOCK, block)
}

/**
 * Utility function to sync block
 *
 * @date 2020-01-29
 * @param {Handler} handler
 * @param {Block} block that needs to be added into the blockchain
 * @returns {Response}
 */
async function syncBlock(handler, block) {
  const orderIds = _.map(block.data, 'data.id')

  // Add block on blockchain
  Blockchain.addBlock(block)
  Pool.remove(orderIds)

  return handler.reply(null, 'block has been saved successfully')
}

/**
 * Utility function to check worker's turn of adding/commiting block
 *
 * @date 2020-01-29
 * @returns {Boolean} if true then current worker has the turn to commit the block in blockchain
 */
function checkTurn() {
  const blockLengths = Blockchain.blockLengths()
  return blockLengths % 2 === RESPONSIBILITY_TYPE[MY_RESPONSIBILITY]
}

module.exports = { processPendingOrders, syncBlock }
