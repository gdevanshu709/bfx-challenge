const { Block } = require('./blocks')
const config = require('../../config/app')

class BlockChain {
  constructor () {
    this.chain = []
  }

  commitTransactions(data) {
    let index = this.chain.length
    let prevHash =
      this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0
    let block = new Block(index, data, prevHash, config.get('app.name'))
    this.chain.push(block)
    return block
  }

  addBlock(block) {
    this.chain.push(block)
    return block
  }

  blockLengths () {
    return this.chain.length
  }

  lastBLock () {
    return this.chain[this.chain.length - 1]
  }

  chainIsValid () {
    for (let i = 0; i < this.chain.length; i++) {
      if (this.chain[i].hash !== this.chain[i].getHash()) return false
      if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash) { return false }
    }
    return true
  }
}

module.exports = new BlockChain()
