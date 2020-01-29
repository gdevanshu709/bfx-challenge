const crypto = require('crypto')

class Transaction {
  /**
   * constructor function to initialize `Transaction`
   *
   * @date 2020-01-29
   * @param {Order} order that needs to be stored in the transaction
   * @returns {Transaction} instance of the `Transaction` class
   */
  constructor (data) {
    this.timestamp = Math.floor(Date.now() / 1000)
    this.data = data
    this.hash = this.getHash()
  }

  /**
   * Utility function to generate hash of `Transaction`
   *
   * @date 2020-01-29
   * @returns {String} hash of the current transaction
   */
  getHash () {
    const encript = JSON.stringify(this.data) + this.timestamp
    const hash = crypto.createHmac('sha256', 'secret')
      .update(encript)
      .digest('hex')
    return hash
  }
}

module.exports = { Transaction }
