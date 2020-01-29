const _ = require('lodash')
const { PeerRPCClient } = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const config = require('./config/app')

const link = new Link({
  grape: config.get('link.grape.aph.address')
})

link.start()

const client = new PeerRPCClient(link, {})
client.init()

/**
 * Main function of bid client.
 * Queries all orders with pending state
 * Creates a bid for each pending order
 *
 * @date 2020-01-29
 * @returns {any}
 */
async function start() {
  // ids of order for which bid has been already placed
  const orderIds = []

  // infinitely add new orders with a delay of 5 seconds
  while (true) {
    try {
      const orders = await getPendingOrders()

      for (let order of orders) {
        if (_.indexOf(orderIds, order.id) === -1) {
          const bid = {
            client_id: config.get('app.name'),
            price_usd: order.price_usd,
            amount_btc: order.amount_btc
          }

          const response = await sendOrder(bid)
          console.log('Order has been sent to worker', response.order_id)
          orderIds.push(order.id)
        }
      }
    } catch (error) {
      console.error('Error in sending order to worker', error)
    }

    await sleep(5000) // wait for 5 seconds before sending other request
  }
}

/**
 * Utility function to sleep for specified duration
 * @date 2020-01-29
 * @param {number} duration
 * @returns {promise} promise
 */
async function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

async function getPendingOrders() {
  return new Promise((resolve, reject) => {
    client.request(config.get('worker.name'), { type: config.get('offer.list.type') }, { timeout: 10000 }, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

/**
 * Utility function to send order to blockchain component
 * @date 2020-01-29
 * @param {object} order: object representing an order contents
 * @returns {promise} promise
 */
async function sendOrder(order) {
  return new Promise((resolve, reject) => {
    client.request(config.get('worker.name'), { type: config.get('offer.add.type'), order }, { timeout: 10000 }, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

// start client
start()
