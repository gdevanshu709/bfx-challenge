class OrdersList {
  constructor() {
    this.orders = []
  }

  add(order) {
    this.orders.push(order)
  }

  list() {
    return this.orders
  }
}

module.exports = new OrdersList()
