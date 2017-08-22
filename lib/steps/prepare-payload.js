'use strict'
const logger = require('../logger')

module.exports = data => {
  return new Promise((resolve, reject) => {
    logger('info', ['prepare-payload', data._id])
    const job = {
      errors: [],
      retry: false
    }
    resolve(job)
  })
}
