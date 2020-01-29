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

async function syncBlock(handler, block) {
  const orderIds = _.map(block.data, 'data.id')

  // Add block on blockchain
  Blockchain.addBlock(block)
  Pool.remove(orderIds)

  return handler.reply(null, 'block has been saved successfully')
}

function checkTurn() {
  const blockLengths = Blockchain.blockLengths()
  return blockLengths % 2 === RESPONSIBILITY_TYPE[MY_RESPONSIBILITY]
}

module.exports = { processPendingOrders, syncBlock }
