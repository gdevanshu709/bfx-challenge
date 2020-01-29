class MemPool {
  /**
   * constructor function to initialize MemoryPool with an empty list
   *
   * @date 2020-01-29
   * @returns {MemPool} instance of MemPool class
   */
  constructor () {
    this.pool = []
  }

  /**
   * function to a order in the `pool`
   *
   * @date 2020-01-29
   * @param {order} order instance of `Order` class
   */
  add (order) {
    return this.pool.push(order)
  }

  /**
   * Length of the pool
   *
   * @date 2020-01-29
   * @returns {Number} length of the `MemPool`
   */
  size () {
    return this.pool.length
  }

  /**
   * Utility function to remove orders from `pool` by using `ids`
   *
   * @date 2020-01-29
   * @param {Array<String>} ids
   */
  remove (ids) {
    this.pool = this.pool.filter((record) => {
      return ids.indexOf(record.id) === -1
    })
  }

  /**
   * Returns list of orders stored in `pool`
   *
   * @date 2020-01-29
   * @returns {Array<Orders>} return array of orders stored in the `pool`
   */
  list () {
    return this.pool
  }
}

module.exports = new MemPool()
