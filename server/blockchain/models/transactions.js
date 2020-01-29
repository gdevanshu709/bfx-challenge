const crypto = require('crypto')

class Transaction {
  constructor (data) {
    this.timestamp = Math.floor(Date.now() / 1000)
    this.data = data
    this.hash = this.getHash()
  }

  getHash () {
    const encript = JSON.stringify(this.data) + this.timestamp
    const hash = crypto.createHmac('sha256', 'secret')
      .update(encript)
      .digest('hex')
    return hash
  }
}

module.exports = { Transaction }
