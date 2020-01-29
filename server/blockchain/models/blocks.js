const crypto = require('crypto')

class Block {
  constructor (index, data, prevHash, miner) {
    this.index = index
    this.timestamp = Math.floor(Date.now() / 1000)
    this.data = data
    this.prevHash = prevHash
    this.hash = this.getHash()
    this.miner = miner
  }

  getHash () {
    const encript = JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp
    const hash = crypto.createHmac('sha256', 'secret')
      .update(encript)
      .digest('hex')
    return hash
  }
}

module.exports = { Block }
