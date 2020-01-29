class MemPool {
  constructor () {
    this.pool = []
  }

  // add transactions in mempool
  add (transaction) {
    return this.pool.push(transaction)
  }

  size () {
    return this.pool.length
  }

  remove (ids) {
    this.pool = this.pool.filter((record) => {
      return ids.indexOf(record.id) === -1
    })
  }

  list () {
    return this.pool
  }
}

module.exports = new MemPool()
