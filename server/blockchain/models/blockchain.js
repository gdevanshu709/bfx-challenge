const { Block } = require('./blocks')
const config = require('../../config/app')

class BlockChain {
  constructor() {
    this.chain = []
  }

  /**
   * Utility function to create a block containing all the transaction
   *
   * @date 2020-01-29
   * @param {Array} data: array of transaction
   */
  commitTransactions(data) {
    let index = this.chain.length
    let prevHash =
      this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0
    let block = new Block(index, data, prevHash, config.get('app.name'))
    this.chain.push(block)
    return block
  }

  /**
   * Utility function to add/clone block in the blockchain
   *
   * @date 2020-01-29
   * @param {Block} block
   */
  addBlock(block) {
    this.chain.push(block)
    return block
  }

  /**
   * Returns length of current blockchain
   *
   * @date 2020-01-29
   * @returns {number} length of blockchain
   */
  blockLengths() {
    return this.chain.length
  }

  /**
   * Returns last block that exists in the blockchain
   *
   * @date 2020-01-29
   * @returns {Block} lastBlock
   */
  lastBLock() {
    return this.chain[this.chain.length - 1]
  }
}

module.exports = new BlockChain()
