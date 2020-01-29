class OrdersList {
  /**
   * constructor function to initialize `OrdersList` with an empty list of orders
   *
   * @date 2020-01-29
   * @returns  {OrdersList} instance of OrdersList class
   */
  constructor() {
    this.orders = []
  }

  /**
   * Utility function to add `Order` in orders list
   *
   * @date 2020-01-29
   * @param {Order} order instance of `Order` class
   */
  add(order) {
    this.orders.push(order)
  }

  /**
   * Returns list of orders stored in the list
   *
   * @date 2020-01-29
   * @returns {Array<Orders>} return array of orders stored in the list
   */
  list() {
    return this.orders
  }
}

module.exports = new OrdersList()
