'use strict'
const logger = require('../logger')

module.exports = data => {
  return new Promise((resolve, reject) => {
    logger('info', ['prepare-payload', data._id])
    const job = {
      _id: data._id,
      errors: [],
      retry: false,
      content: data
    }
    resolve(job)
  })
}
