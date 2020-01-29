const uuidv4 = require('uuid/v4')

class Order {
  constructor (clientId, priceUsd, amountBtc) {
    this.id = uuidv4()
    this.client_id = clientId
    this.price_usd = priceUsd
    this.amount_btc = amountBtc
    this.timestamp = Math.floor(Date.now() / 1000)
  }
}

module.exports = { Order }
