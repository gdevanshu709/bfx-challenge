const uuidv4 = require('uuid/v4')

class Order {
  /**
   * constructor function to store details of the Orders
   *
   * @date 2020-01-29
   * @param {String} clientId id of client that has submitted this order
   * @param {Number} priceUsd USD price for the BTC that needs to be sold
   * @param {Number} amountBtc amount of BTC that needs to be sold against USD
   * @returns {Order} instance of `Order` class
   */
  constructor (clientId, priceUsd, amountBtc) {
    this.id = uuidv4()
    this.client_id = clientId
    this.price_usd = priceUsd
    this.amount_btc = amountBtc
    this.timestamp = Math.floor(Date.now() / 1000)
  }
}

module.exports = { Order }
