const Link = require('grenache-nodejs-link')
const config = require('../config/app')

const link = new Link({
  grape: config.get('grape_address')
})

link.start()

module.exports = link
