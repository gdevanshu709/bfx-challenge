const crypto = require('crypto')

class Block {
  /**
   * constructor function to initialize `Block`
   *
   * @date 2020-01-29
   * @param {number} index of the block in blockchain
   * @param {Transaction} data list of transactions in block
   * @param {String} prevHash hash of previous block in the blockchain
   * @param {String} miner unique id of miner (in this case worker) that mined this block
   * @returns {Block} instance of the `Block` class
   */
  constructor (index, data, prevHash, miner) {
    this.index = index
    this.timestamp = Math.floor(Date.now() / 1000)
    this.data = data
    this.prevHash = prevHash
    this.hash = this.getHash()
    this.miner = miner
  }

  /**
   * Utility function to generate hash of `Block`
   *
   * @date 2020-01-29
   * @returns {String} hash of the current block
   */
  getHash () {
    const encript = JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp
    const hash = crypto.createHmac('sha256', 'secret')
      .update(encript)
      .digest('hex')
    return hash
  }
}

module.exports = { Block }
