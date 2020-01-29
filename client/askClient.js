const { PeerRPCClient } = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const config = require('./config/app')

const link = new Link({
  grape: config.get('grape_address')
})

link.start()

const client = new PeerRPCClient(link, {})
client.init()

/**
 * Main function of Ask client.
 * Creates and sends infinite offers to blockchain component.
 * Creates a seperate offer in every 5 seconds
 * @date 2020-01-29
 * @returns {any}
 */
async function start() {
  // infinitely add new orders with a delay of 5 seconds
  while (true) {
    const order = {
      client_id: config.get('app.name'),
      price_usd: randomNumber(),
      amount_btc: randomNumber()
    }

    try {
      const response = await sendOrder(order)
      console.log('Order has been sent to worker', response.order_id)
    } catch (error) {
      console.error('Error in sending order to worker', error)
    }

    await sleep(5000) // wait for 5 seconds before sending other request
  }
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

/**
 * Utility function to sleep for specified duration
 * @date 2020-01-29
 * @param {number} duration
 * @returns {promise} promise
 */
async function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

/**
 * Returns a random number ranging between 1 to 10
 * @date 2020-01-29
 * @returns {number} randomNumber
 */
function randomNumber() {
  // formula: Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
}

// start client
start()
